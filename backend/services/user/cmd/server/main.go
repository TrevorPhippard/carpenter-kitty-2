package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"user/internal/config"
	"user/internal/consul"
	"user/internal/db"
	"user/internal/handler"
	"user/internal/repository"
	"user/internal/service"
	"user/internal/user/proto"

	"github.com/hashicorp/consul/api"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

func main() {

	addr := os.Getenv("CONSUL_HTTP_ADDR")
	agent := consul.NewAgent(&api.Config{Address: addr})

	serviceCfg := consul.Config{
		ServiceID:   "user-service-1",
		ServiceName: "user-service",
		Address:     "user-service",
		Port:        50051,
		Tags:        []string{"user"},
		TTL:         30 * time.Second,
		CheckID:     "check_health",
	}

	agent.RegisterService(serviceCfg)
	http.Handle("/metrics", promhttp.Handler())

	userdb := config.ConnectDatabase()

	// fill db
	db.RunMigrations()
	db.SeedDatabase()

	// Initialize repository, service, and handler
	userRepo := repository.NewUserRepository(userdb)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	// Start gRPC server
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	proto.RegisterUserServiceServer(grpcServer, userHandler)

	// Graceful shutdown
	go func() {
		fmt.Println("gRPC server running on :50051")
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()

	go func() {
		fmt.Println("Metrics server running on :9090")
		if err := http.ListenAndServe(":9090", nil); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Metrics server failed: %v", err)
		}
	}()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch
	fmt.Println("Stopping gRPC server...")
	grpcServer.GracefulStop()
	fmt.Println("Server stopped.")
}
