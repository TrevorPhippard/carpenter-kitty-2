// seed.go
package seed

import (
	"context"
	"log"
	"time"

	"post/internal/config"
	"post/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Run() {
	coll := config.DB.Collection("posts")
	ctx := context.Background()

	count, _ := coll.CountDocuments(ctx, bson.M{})
	if count > 0 {
		return // already seeded
	}

	author1 := primitive.NewObjectID()
	author2 := primitive.NewObjectID()
	now := time.Now()

	posts := []models.Post{
		{
			ID:         primitive.NewObjectID(),
			AuthorID:   author1,
			Text:       "Exploring the wonders of Go programming!",
			Visibility: "PUBLIC",
			Media: []models.PostMedia{
				{
					ID:       primitive.NewObjectID(),
					MediaURL: "https://picsum.photos/seed/123/200/300",
					MimeType: "image/jpeg",
					Order:    1,
				},
				{
					ID:       primitive.NewObjectID(),
					MediaURL: "https://picsum.photos/seed/456/200/300",
					MimeType: "image/jpeg",
					Order:    2,
				},
			},
			CreatedAt:    now,
			UpdatedAt:    now,
			CommentCount: 42,
			LikeCount:    527,
			ShareCount:   18,
		},
		{
			ID:         primitive.NewObjectID(),
			AuthorID:   author2,
			Text:       "Diving into the world of Rust programming!",
			Visibility: "PUBLIC",
			Media: []models.PostMedia{
				{
					ID:       primitive.NewObjectID(),
					MediaURL: "https://picsum.photos/seed/789/200/300",
					MimeType: "image/jpeg",
					Order:    1,
				},
				{
					ID:       primitive.NewObjectID(),
					MediaURL: "https://picsum.photos/seed/101/200/300",
					MimeType: "image/jpeg",
					Order:    2,
				},
			},
			CreatedAt:    now,
			UpdatedAt:    now,
			CommentCount: 19,
			LikeCount:    342,
			ShareCount:   7,
		},
	}

	var docs []interface{}
	for _, p := range posts {
		docs = append(docs, p)
	}

	_, err := coll.InsertMany(ctx, docs)
	if err != nil {
		log.Printf("❌ Failed to seed posts: %v", err)
		return
	}

	log.Println("✅ Seeded posts collection successfully")
}
