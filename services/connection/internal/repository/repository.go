package repository

import (
	"connections/internal/config"
	"connections/internal/models"
	"context"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type PersonRepository struct{}

func (r *PersonRepository) CreatePerson(ctx context.Context, name string) error {
	session := config.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		return tx.Run(ctx, "CREATE (p:Person {name:$name}) RETURN p", map[string]any{"name": name})
	})
	return err
}

func (r *PersonRepository) GetAllPersons(ctx context.Context) ([]models.Person, error) {
	session := config.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close(ctx)

	result, err := session.ExecuteRead(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		res, err := tx.Run(ctx, "MATCH (p:Person) RETURN p.name", nil)
		if err != nil {
			return nil, err
		}

		var persons []models.Person
		for res.Next(ctx) {
			persons = append(persons, models.Person{Name: res.Record().Values[0].(string)})
		}
		return persons, nil
	})
	if err != nil {
		return nil, err
	}
	return result.([]models.Person), nil
}

func (r *PersonRepository) UpdatePerson(ctx context.Context, oldName, newName string) error {
	session := config.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		return tx.Run(ctx, "MATCH (p:Person {name:$old}) SET p.name=$new RETURN p", map[string]any{"old": oldName, "new": newName})
	})
	return err
}

func (r *PersonRepository) DeletePerson(ctx context.Context, name string) error {
	session := config.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		return tx.Run(ctx, "MATCH (p:Person {name:$name}) DETACH DELETE p", map[string]any{"name": name})
	})
	return err
}
