package repository

import (
	"context"
	"log"
	"time"

	"post/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PostRepository struct {
	collection *mongo.Collection
}

func NewPostRepository(collection *mongo.Collection) *PostRepository {
	return &PostRepository{collection: collection}
}

// Create a post
func (r *PostRepository) Create(ctx context.Context, post *models.Post) (*models.Post, error) {
	post.ID = primitive.NewObjectID()
	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()

	_, err := r.collection.InsertOne(ctx, post)
	if err != nil {
		return nil, err
	}
	return post, nil
}

// Get a post by ID
func (r *PostRepository) Get(ctx context.Context, id string) (*models.Post, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var post models.Post
	err = r.collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&post)
	if err != nil {
		return nil, err
	}
	return &post, nil
}

// Update a post
func (r *PostRepository) Update(ctx context.Context, post *models.Post) (*models.Post, error) {
	post.UpdatedAt = time.Now()
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": post.ID}, post)
	if err != nil {
		return nil, err
	}
	return post, nil
}

// Delete a post
func (r *PostRepository) Delete(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

// List all posts
func (r *PostRepository) List(ctx context.Context) ([]*models.Post, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []*models.Post
	for cursor.Next(ctx) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			log.Println("Decode error:", err)
			continue
		}
		posts = append(posts, &post)
	}
	return posts, nil
}
