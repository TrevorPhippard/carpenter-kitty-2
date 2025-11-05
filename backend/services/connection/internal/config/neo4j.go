package config

import (
	"context"
	"log"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

var Driver neo4j.DriverWithContext

func ConnectNeo4j(uri, username, password string) {
	var err error
	Driver, err = neo4j.NewDriverWithContext(uri, neo4j.BasicAuth(username, password, ""))
	if err != nil {
		log.Fatalf("Failed to create Neo4j driver: %v", err)
	}

	// Test connection
	if err := Driver.VerifyConnectivity(context.Background()); err != nil {
		log.Fatalf("Cannot connect to Neo4j: %v", err)
	}
}
