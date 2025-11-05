package unit

import (
	"testing"
	"time"
	"user/internal/api/handlers"
	"user/internal/models"
	"user/internal/repository"
	"user/internal/service"

	"github.com/stretchr/testify/assert"
)

func TestUserServiceCreate(t *testing.T) {
	r := repository.NewMockRepo()
	svc := service.NewService(r)
	h := handlers.NewHandler(svc)

	usr := models.User{
		Email:        "bob@example.com",
		Username:     "bob",
		PasswordHash: "password",
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		IsActive:     true,
		IsVerified:   false,
		Locale:       "en",
	}

	err := h.Service.Create(&usr)
	assert.NoError(t, err)
	assert.Equal(t, "bob@example.com", usr.Email)
}
