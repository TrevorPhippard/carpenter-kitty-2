package main

import (
	"fmt"
	"log"
	"net/http"
	"post/internal/api/handlers"
	"post/internal/config"
	"post/internal/repository"
	"post/internal/service"
	// "post/scripts"
)

func main() {

	config.Init()

	// Real repo instance
	repo := repository.NewPostRepo() // whatever connects to DB
	svc := service.NewService(repo)
	h := handlers.NewHandler(svc)

	http.HandleFunc("/posts", h.PostsHandler)
	http.HandleFunc("/posts/", h.PostHandler)

	fmt.Println("🚀 Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
