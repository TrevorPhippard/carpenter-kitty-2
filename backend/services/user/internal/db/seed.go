package db

import (
	"fmt"
	"user/internal/config"
	"user/internal/models"
)

func SeedDatabase() {
	var count int64
	config.DB.Model(&models.User{}).Count(&count)
	if count == 0 {
		users := []models.User{
			{Username: "alice", Email: "alice@example.com", PasswordHash: "password1", IsActive: true, IsVerified: true},
			{Username: "bob", Email: "bob@example.com", PasswordHash: "password2", IsActive: true, IsVerified: true},
			{Username: "charlie", Email: "charlie@example.com", PasswordHash: "password3", IsActive: true, IsVerified: true},
		}
		for _, u := range users {
			config.DB.Create(&u)
		}
		fmt.Println("Seeded database with sample users.")
	} else {
		fmt.Println("Database already has users, skipping seeding.")
	}
}
