package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB is the initialized MongoDB database instance
var DB *mongo.Database

// Init connects to MongoDB and initializes the DB instance
func Init() *mongo.Database {
	mongoURI := os.Getenv("POST_DB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	dbName := os.Getenv("POST_DB_NAME")
	if dbName == "" {
		dbName = "posts"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOpts := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Verify connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	DB = client.Database(dbName)
	log.Printf("MongoDB initialized successfully: %s", dbName)

	return DB
}
