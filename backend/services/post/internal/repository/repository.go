// internal/repository/user_repo.go
package repository

import (
	"context"
	"post/internal/config"
	"post/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PostRepo struct {
	db *mongo.Collection
}

func NewPostRepo() *PostRepo {
	return &PostRepo{db: config.DB.Collection("posts")}
}

func (r *PostRepo) GetAll() ([]models.Post, error) {
	ctx := context.Background()
	filter := bson.D{}

	cursor, err := r.db.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	for cursor.Next(ctx) {
		var p models.Post
		if err := cursor.Decode(&p); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return posts, nil
}

func (r *PostRepo) Create(post *models.Post) error {
	_, err := r.db.InsertOne(context.Background(), post)
	return err
}

func (r *PostRepo) GetByID(id primitive.ObjectID) (*models.Post, error) {
	var post models.Post
	err := r.db.FindOne(context.Background(), bson.M{"id": id}).Decode(&post)
	if err != nil {
		return nil, err
	}
	return &post, nil
}

func (r *PostRepo) Update(post *models.Post) error {
	_, err := r.db.ReplaceOne(context.Background(), bson.M{"id": post.ID}, post)
	return err
}

func (r *PostRepo) Delete(post *models.Post) error {
	_, err := r.db.DeleteOne(context.Background(), bson.M{"id": post.ID})
	return err
}
