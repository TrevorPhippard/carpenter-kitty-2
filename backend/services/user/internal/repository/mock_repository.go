// internal/repository/mock_repo.go
package repository

import (
	"sync"
	"user/internal/models"

	"github.com/google/uuid"
)

type MockRepo struct {
	Users map[uuid.UUID]*models.User
	mu    sync.Mutex // mutal exclusion
}

// GetAll implements service.UserRepository.
func (m *MockRepo) GetAll() ([]models.User, error) {
	panic("unimplemented")
}

func NewMockRepo() *MockRepo {
	return &MockRepo{
		Users: make(map[uuid.UUID]*models.User),
	}
}

func (m *MockRepo) GetAllUsers() ([]models.User, error) {
	var users []models.User
	m.mu.Lock()
	defer m.mu.Unlock()
	for _, u := range m.Users {
		users = append(users, *u)
	}
	return users, nil
}

func (m *MockRepo) Create(user *models.User) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.Users[user.ID] = user
	return nil
}

func (m *MockRepo) GetByID(id uuid.UUID) (*models.User, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if user, ok := m.Users[id]; ok {
		return user, nil
	}
	return nil, nil
}

func (m *MockRepo) Update(user *models.User) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.Users[user.ID] = user
	return nil
}

func (m *MockRepo) Delete(user *models.User) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.Users, user.ID)
	return nil
}
