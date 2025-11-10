package service

import (
	"context"
	"post/internal/models"
	"post/internal/repository"
)

type PostService struct {
	repo *repository.PostRepository
}

func NewPostService(repo *repository.PostRepository) *PostService {
	return &PostService{repo: repo}
}

// CreatePost wraps repository create
func (s *PostService) CreatePost(ctx context.Context, post *models.Post) (*models.Post, error) {
	return s.repo.Create(ctx, post)
}

// GetPost wraps repository get
func (s *PostService) GetPost(ctx context.Context, id string) (*models.Post, error) {
	return s.repo.Get(ctx, id)
}

// UpdatePost wraps repository update
func (s *PostService) UpdatePost(ctx context.Context, post *models.Post) (*models.Post, error) {
	return s.repo.Update(ctx, post)
}

// DeletePost wraps repository delete
func (s *PostService) DeletePost(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

// ListPosts wraps repository list
func (s *PostService) ListPosts(ctx context.Context) ([]*models.Post, error) {
	return s.repo.List(ctx)
}
