package service

import (
	"errors"
	"user/internal/models"

	"github.com/google/uuid"
)

type UserRepository interface {
	GetAll() ([]models.User, error)
	Create(user *models.User) error
	GetByID(id uuid.UUID) (*models.User, error)
	Update(user *models.User) error
	Delete(user *models.User) error
}

type Service struct {
	repository UserRepository
}

func NewService(repo UserRepository) *Service {
	return &Service{repository: repo}
}

func (s *Service) GetAll() ([]models.User, error) {
	return s.repository.GetAll()
}

func (s *Service) Create(user *models.User) error {
	if user.Email == "" || user.Username == "" {
		return errors.New("email and username are required")
	}
	return s.repository.Create(user)
}

func (s *Service) GetByID(id uuid.UUID) (*models.User, error) {
	return s.repository.GetByID(id)
}

func (s *Service) Update(id uuid.UUID, input models.User) (*models.User, error) {
	user, err := s.repository.GetByID(id)
	if err != nil {
		return nil, err
	}

	user.Email = input.Email
	user.Username = input.Username
	user.PasswordHash = input.PasswordHash
	user.IsActive = input.IsActive
	user.IsVerified = input.IsVerified
	user.Locale = input.Locale

	if err := s.repository.Update(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *Service) Delete(id uuid.UUID) error {
	user, err := s.repository.GetByID(id)
	if err != nil {
		return err
	}
	return s.repository.Delete(user)
}
