package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"post/internal/models"
	"post/internal/repository"
	"post/internal/service"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// TestCreateUserEndpoint tests POST /posts endpoint
func TestCreateUserEndpoint(t *testing.T) {
	mockRepo := repository.NewMockRepo()
	svc := service.NewService(mockRepo)
	h := NewHandler(svc)

	mux := http.NewServeMux()
	mux.HandleFunc("/posts", h.PostsHandler) // POST to correct handler

	post := models.Post{
		AuthorID:   primitive.NewObjectID(),
		Text:       "input.Text",
		Visibility: "PUBLIC",
		Media:      []models.PostMedia{},
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	body, _ := json.Marshal(post)

	req := httptest.NewRequest(http.MethodPost, "/posts", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()

	mux.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusCreated, rec.Code)

	var respUser models.Post
	err := json.Unmarshal(rec.Body.Bytes(), &respUser)
	assert.NoError(t, err)
	assert.Equal(t, "input.Text", respUser.Text)
}
