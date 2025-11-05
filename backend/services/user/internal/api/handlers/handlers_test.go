package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
	"user/internal/models"
	"user/internal/repository"
	"user/internal/service"

	"github.com/stretchr/testify/assert"
)

// TestCreateUserEndpoint tests POST /users endpoint
func TestCreateUserEndpoint(t *testing.T) {
	mockRepo := repository.NewMockRepo()
	svc := service.NewService(mockRepo)
	h := NewHandler(svc)

	mux := http.NewServeMux()
	mux.HandleFunc("/users", h.UsersHandler) // POST to correct handler

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
	body, _ := json.Marshal(usr)

	req := httptest.NewRequest(http.MethodPost, "/users", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()

	mux.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusCreated, rec.Code)

	var respUser models.User
	err := json.Unmarshal(rec.Body.Bytes(), &respUser)
	assert.NoError(t, err)
	assert.Equal(t, "bob@example.com", respUser.Email)
}
