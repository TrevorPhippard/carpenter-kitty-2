package main

import (
	"fmt"
	"log"
	"net/http"
	"user/internal/api/handlers"
	"user/internal/config"
	"user/internal/db"
	"user/internal/repository"
	"user/internal/service"
)

func main() {

	config.ConnectDatabase()

	// Migrate schema safely

	db.RunMigrations()

	db.SeedDatabase()

	// Real repo instance
	repo := repository.NewUserRepo() // whatever connects to DB
	svc := service.NewService(repo)
	h := handlers.NewHandler(svc)

	http.HandleFunc("/users", h.UsersHandler)
	http.HandleFunc("/users/", h.UserHandler)

	fmt.Println("🚀 Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
