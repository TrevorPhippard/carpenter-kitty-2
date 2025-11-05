package server

import (
	"connections/internal/graph"
	"connections/internal/repository"
	"fmt"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func Run() {
	personRepo := &repository.PersonRepository{}
	resolver := &graph.Resolver{PersonRepo: personRepo}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	http.Handle("/graphql", srv)
	http.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))

	fmt.Println("Server running at :8080")
	http.ListenAndServe(":8080", nil)
}
