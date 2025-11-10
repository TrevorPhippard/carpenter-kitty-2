package main

import (
	"log"
	"net"
	"post/internal/config"
	"post/internal/handler"
	pb "post/internal/post/proto"
	"post/internal/repository"
	"post/internal/service"

	"google.golang.org/grpc"
)

func main() {
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
