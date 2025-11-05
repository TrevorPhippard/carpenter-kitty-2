package graph

import (
	"connections/internal/models"
	"connections/internal/repository"
	"context"
)

type Resolver struct {
	PersonRepo *repository.PersonRepository
}

// Query resolver
func (r *Resolver) Persons(ctx context.Context) ([]*models.Person, error) {
	persons, err := r.PersonRepo.GetAllPersons(ctx)
	if err != nil {
		return nil, err
	}

	// Convert to []*models.Person for gqlgen
	res := make([]*models.Person, len(persons))
	for i := range persons {
		res[i] = &persons[i]
	}
	return res, nil
}

// Mutation resolvers
func (r *Resolver) CreatePerson(ctx context.Context, name string) (*models.Person, error) {
	if err := r.PersonRepo.CreatePerson(ctx, name); err != nil {
		return nil, err
	}
	return &models.Person{Name: name}, nil
}

func (r *Resolver) UpdatePerson(ctx context.Context, old string, new string) (*models.Person, error) {
	if err := r.PersonRepo.UpdatePerson(ctx, old, new); err != nil {
		return nil, err
	}
	return &models.Person{Name: new}, nil
}

func (r *Resolver) DeletePerson(ctx context.Context, name string) (bool, error) {
	if err := r.PersonRepo.DeletePerson(ctx, name); err != nil {
		return false, err
	}
	return true, nil
}
