// internal/repository/mock_repo.go
package repository

import (
	"post/internal/models"
	"sync"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MockRepo struct {
	Posts map[primitive.ObjectID]*models.Post
	mu    sync.Mutex // mutal exclusion
}

// GetAll implements service.PostRepository.
func (m *MockRepo) GetAll() ([]models.Post, error) {
	panic("unimplemented")
}

func NewMockRepo() *MockRepo {
	return &MockRepo{
		Posts: make(map[primitive.ObjectID]*models.Post),
	}
}

func (m *MockRepo) GetAllPosts() ([]models.Post, error) {
	var posts []models.Post
	m.mu.Lock()
	defer m.mu.Unlock()
	for _, u := range m.Posts {
		posts = append(posts, *u)
	}
	return posts, nil
}

func (m *MockRepo) Create(post *models.Post) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.Posts[post.ID] = post
	return nil
}

func (m *MockRepo) GetByID(id primitive.ObjectID) (*models.Post, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if post, ok := m.Posts[id]; ok {
		return post, nil
	}
	return nil, nil
}

func (m *MockRepo) Update(post *models.Post) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.Posts[post.ID] = post
	return nil
}

func (m *MockRepo) Delete(post *models.Post) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.Posts, post.ID)
	return nil
}
