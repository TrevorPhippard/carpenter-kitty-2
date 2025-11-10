package service

import (
	"user/internal/models"
	"user/internal/repository"
)

// UserService handles business logic for users.
type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) CreateUser(name, email string) (*models.User, error) {
	user := &models.User{Username: name, Email: email}
	if err := s.repo.Create(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) GetUser(id uint64) (*models.User, error) {
	return s.repo.GetByID(id)
}

func (s *UserService) ListUsers() ([]models.User, error) {
	return s.repo.List()
}

func (s *UserService) UpdateUser(user *models.User) (*models.User, error) {
	if err := s.repo.Update(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) DeleteUser(id uint64) error {
	return s.repo.Delete(id)
}
