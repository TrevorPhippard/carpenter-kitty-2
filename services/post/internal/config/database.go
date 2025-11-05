package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func Init() {
	mongoURI := os.Getenv("POST_DB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017/postdb"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Verify connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	dbName := os.Getenv("POST_DB_NAME")
	if dbName == "" {
		dbName = "posts"
	}

	DB = client.Database(dbName)
	log.Println("MongoDB initialized successfully")
}
