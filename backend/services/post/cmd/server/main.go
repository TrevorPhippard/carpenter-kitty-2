package main

import (
	"log"
	"net"
	"net/http"
	"os"
	"post/internal/config"
	"post/internal/consul"
	"post/internal/handler"
	"post/internal/repository"
	"post/internal/service"
	pb "post/proto"
	"time"

	"github.com/hashicorp/consul/api"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

func main() {

	addr := os.Getenv("CONSUL_HTTP_ADDR")
	agent := consul.NewAgent(&api.Config{Address: addr})

	serviceCfg := consul.Config{
		ServiceID:   "post-service-1",
		ServiceName: "post-service",
		Address:     "post-service",
		Port:        50052,
		Tags:        []string{"post"},
		TTL:         8 * time.Second,
		CheckID:     "check_health",
	}

	agent.RegisterService(serviceCfg)
	http.Handle("/metrics", promhttp.Handler())

	// Initialize MongoDB and get the database instance
	db := config.Init()

	// Use the db instance to initialize the repository
	postRepo := repository.NewPostRepository(db.Collection("posts"))
	postService := service.NewPostService(postRepo)
	postHandler := handler.NewPostHandler(postService)

	// Start gRPC server
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatal(err)
	}

	server := grpc.NewServer()
	pb.RegisterPostServiceServer(server, postHandler)

	log.Println("gRPC server running on :50052")
	if err := server.Serve(lis); err != nil {
		log.Fatal(err)
	}
}
