package unit

import (
	"post/internal/api/handlers"
	"post/internal/models"
	"post/internal/repository"
	"post/internal/service"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestUserServiceCreate(t *testing.T) {
	r := repository.NewMockRepo()
	svc := service.NewService(r)
	h := handlers.NewHandler(svc)

	post := models.Post{
		AuthorID:   primitive.NewObjectID(),
		Text:       "input.Text",
		Visibility: "PUBLIC",
		Media:      []models.PostMedia{},
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	err := h.Service.Create(&post)
	assert.NoError(t, err)
	assert.Equal(t, "input.Text", post.Text)
}
