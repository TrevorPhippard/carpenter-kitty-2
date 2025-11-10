package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is the global database connection (optional, you can still use it)
var DB *gorm.DB

// ConnectDatabase connects to PostgreSQL and returns the DB instance
func ConnectDatabase() *gorm.DB {
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port,
	)

	var err error
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			fmt.Println("✅ Database connected")
			return DB
		}

		fmt.Printf("⏳ Attempt %d: failed to connect: %v\n", i+1, err)
		time.Sleep(3 * time.Second)
	}
	log.Fatal("❌ Failed to connect to database after multiple attempts:", err)
	return nil
}
