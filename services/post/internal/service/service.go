package service

import (
	"errors"
	"post/internal/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostRepository interface {
	GetAll() ([]models.Post, error)
	Create(post *models.Post) error
	GetByID(id primitive.ObjectID) (*models.Post, error)
	Update(post *models.Post) error
	Delete(post *models.Post) error
}

type Service struct {
	repository PostRepository
}

func NewService(repo PostRepository) *Service {
	return &Service{repository: repo}
}

func (s *Service) GetAll() ([]models.Post, error) {
	return s.repository.GetAll()
}

func (s *Service) Create(post *models.Post) error {
	if post.Text == "" {
		return errors.New("text is required")
	}
	return s.repository.Create(post)
}

func (s *Service) GetByID(id primitive.ObjectID) (*models.Post, error) {
	return s.repository.GetByID(id)
}

func (s *Service) Update(id primitive.ObjectID, input models.Post) (*models.Post, error) {
	post, err := s.repository.GetByID(id)
	if err != nil {
		return nil, err
	}

	post.AuthorID = input.AuthorID     // primitive.ObjectID
	post.Text = input.Text             // string
	post.Visibility = input.Visibility // "PUBLIC" "CONNECTIONS" "PRIVATE"
	post.Media = input.Media           // []PostMedia
	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()

	if err := s.repository.Update(post); err != nil {
		return nil, err
	}
	return post, nil
}

func (s *Service) Delete(id primitive.ObjectID) error {
	post, err := s.repository.GetByID(id)
	if err != nil {
		return err
	}
	return s.repository.Delete(post)
}
