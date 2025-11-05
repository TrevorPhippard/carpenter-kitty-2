package main

import (
	"connections/internal/config"
	"connections/internal/server"
)

func main() {
	config.ConnectNeo4j("neo4j://localhost:7687", "neo4j", "yourStrongPassword")
	server.Run()
}
