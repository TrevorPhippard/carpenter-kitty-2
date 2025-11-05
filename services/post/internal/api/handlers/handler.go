package handlers

import (
	"encoding/json"
	"net/http"
	"post/internal/models"
	"post/internal/service"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Handler struct {
	Service *service.Service
}

// NewHandler constructs a handler with a service instance.
func NewHandler(s *service.Service) *Handler {
	return &Handler{Service: s}
}

// Handle /posts
func (h *Handler) PostsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		posts, err := h.Service.GetAll()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(posts)

	case http.MethodPost:
		var post models.Post
		if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := h.Service.Create(&post)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(post)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Handle /posts/{id}
func (h *Handler) PostHandler(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/posts/"):]
	postID, err := primitive.ObjectIDFromHex(idStr)

	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		post, err := h.Service.GetByID(postID)
		if err != nil {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		json.NewEncoder(w).Encode(post)

	case http.MethodPut:
		var input models.Post
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		post, err := h.Service.Update(postID, input)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(post)

	case http.MethodDelete:
		if err := h.Service.Delete(postID); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
