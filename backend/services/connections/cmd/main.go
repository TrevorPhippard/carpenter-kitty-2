package main

import (
	"connections/internal/config"
	"connections/internal/consul"
	"connections/internal/server"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/hashicorp/consul/api"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	uri := os.Getenv("NEO4J_URI")
	username := os.Getenv("NEO4J_USER")
	password := os.Getenv("NEO4J_PASSWORD")

	if uri == "" || username == "" || password == "" {
		log.Fatal("Missing Neo4j environment variables")
	}

	addr := os.Getenv("CONSUL_HTTP_ADDR")
	agent := consul.NewAgent(&api.Config{Address: addr})

	serviceCfg := consul.Config{
		ServiceID:   "connection-service-1",
		ServiceName: "connection-service",
		Address:     "connection-service",
		Port:        50053,
		Tags:        []string{"connection"},
		TTL:         8 * time.Second,
		CheckID:     "check_health",
	}

	agent.RegisterService(serviceCfg)
	http.Handle("/metrics", promhttp.Handler())

	config.ConnectNeo4j(uri, username, password)
	server.Run()
}
