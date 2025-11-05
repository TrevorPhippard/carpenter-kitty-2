package db

import (
	"fmt"
	"log"
	"user/internal/config"
	"user/internal/models"
)

// RunMigrations migrates all database tables for the service.
func RunMigrations() {
	err := config.DB.AutoMigrate(
		&models.User{},
	)
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}
	fmt.Println("✅ Database migrations complete")
}
