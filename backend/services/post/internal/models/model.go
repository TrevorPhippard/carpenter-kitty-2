package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	AuthorID     primitive.ObjectID `bson:"author_id" json:"author_id"`
	Text         string             `bson:"text" json:"text"`
	Visibility   string             `bson:"visibility" json:"visibility"` // PUBLIC, CONNECTIONS, PRIVATE
	Media        []PostMedia        `bson:"media,omitempty" json:"media,omitempty"`
	CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt    time.Time          `bson:"updated_at" json:"updated_at"`
	CommentCount int                `bson:"comment_count" json:"comment_count"`
	LikeCount    int                `bson:"like_count" json:"like_count"`
	ShareCount   int                `bson:"share_count" json:"share_count"`
}

type PostMedia struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	MediaURL string             `bson:"media_url" json:"media_url"`
	MimeType string             `bson:"mime_type" json:"mime_type"`
	Order    int                `bson:"order" json:"order"`
}

type Comment struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	PostID    primitive.ObjectID  `bson:"post_id" json:"post_id"`
	AuthorID  primitive.ObjectID  `bson:"author_id" json:"author_id"`
	ParentID  *primitive.ObjectID `bson:"parent_id,omitempty" json:"parent_id,omitempty"`
	Text      string              `bson:"text" json:"text"`
	CreatedAt time.Time           `bson:"created_at" json:"created_at"`
}

type Reaction struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	TargetID   primitive.ObjectID `bson:"target_id" json:"target_id"`     // post or comment
	TargetType string             `bson:"target_type" json:"target_type"` // "POST", "COMMENT"
	UserID     primitive.ObjectID `bson:"user_id" json:"user_id"`
	Type       string             `bson:"type" json:"type"` // "LIKE", "SUPPORT", etc.
	CreatedAt  time.Time          `bson:"created_at" json:"created_at"`
}

type Share struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	PostID    primitive.ObjectID `bson:"post_id" json:"post_id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

type SavedPost struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	PostID    primitive.ObjectID `bson:"post_id" json:"post_id"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}
