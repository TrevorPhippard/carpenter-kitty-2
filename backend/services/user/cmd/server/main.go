package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"user/internal/config"
	"user/internal/db"
	"user/internal/handler"
	"user/internal/repository"
	"user/internal/service"
	"user/internal/user/proto"

	"google.golang.org/grpc"
)

func main() {
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

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	<-ch
	fmt.Println("Stopping gRPC server...")
	grpcServer.GracefulStop()
	fmt.Println("Server stopped.")
}
