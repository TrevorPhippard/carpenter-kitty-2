package handler

import (
	"context"
	"time"

	"post/internal/models"
	pb "post/internal/post/proto"
	"post/internal/service"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostHandler struct {
	service *service.PostService
	pb.UnimplementedPostServiceServer
}

func NewPostHandler(service *service.PostService) *PostHandler {
	return &PostHandler{service: service}
}

// Convert pb.Post to models.Post
func pbToModelPost(pbPost *pb.Post) *models.Post {
	authorID, _ := primitive.ObjectIDFromHex(pbPost.AuthorId)

	var media []models.PostMedia
	for _, m := range pbPost.Media {
		mediaID, _ := primitive.ObjectIDFromHex(m.Id)
		media = append(media, models.PostMedia{
			ID:       mediaID,
			MediaURL: m.MediaUrl,
			MimeType: m.MimeType,
			Order:    int(m.Order),
		})
	}

	return &models.Post{
		AuthorID:   authorID,
		Text:       pbPost.Text,
		Visibility: pbPost.Visibility,
		Media:      media,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
}

// Convert models.Post to pb.Post
func modelToPbPost(post *models.Post) *pb.Post {
	var media []*pb.PostMedia
	for _, m := range post.Media {
		media = append(media, &pb.PostMedia{
			Id:       m.ID.Hex(),
			MediaUrl: m.MediaURL,
			MimeType: m.MimeType,
			Order:    int32(m.Order),
		})
	}

	return &pb.Post{
		Id:           post.ID.Hex(),
		AuthorId:     post.AuthorID.Hex(),
		Text:         post.Text,
		Visibility:   post.Visibility,
		Media:        media,
		CreatedAt:    post.CreatedAt.Unix(),
		UpdatedAt:    post.UpdatedAt.Unix(),
		CommentCount: int32(post.CommentCount),
		LikeCount:    int32(post.LikeCount),
		ShareCount:   int32(post.ShareCount),
	}
}

// CreatePost implements gRPC Create
func (h *PostHandler) CreatePost(ctx context.Context, req *pb.Post) (*pb.Post, error) {
	post := pbToModelPost(req)
	created, err := h.service.CreatePost(ctx, post)
	if err != nil {
		return nil, err
	}
	return modelToPbPost(created), nil
}

// GetPost implements gRPC Read
func (h *PostHandler) GetPost(ctx context.Context, req *pb.PostId) (*pb.Post, error) {
	post, err := h.service.GetPost(ctx, req.Id)
	if err != nil {
		return nil, err
	}
	return modelToPbPost(post), nil
}

// UpdatePost implements gRPC Update
func (h *PostHandler) UpdatePost(ctx context.Context, req *pb.Post) (*pb.Post, error) {
	id, err := primitive.ObjectIDFromHex(req.Id)
	if err != nil {
		return nil, err
	}

	post := pbToModelPost(req)
	post.ID = id
	post.UpdatedAt = time.Now()

	updated, err := h.service.UpdatePost(ctx, post)
	if err != nil {
		return nil, err
	}
	return modelToPbPost(updated), nil
}

// DeletePost implements gRPC Delete
func (h *PostHandler) DeletePost(ctx context.Context, req *pb.PostId) (*pb.PostId, error) {
	if err := h.service.DeletePost(ctx, req.Id); err != nil {
		return nil, err
	}
	return &pb.PostId{Id: req.Id}, nil
}

// ListPosts implements gRPC List
func (h *PostHandler) ListPosts(ctx context.Context, req *pb.Empty) (*pb.PostList, error) {
	posts, err := h.service.ListPosts(ctx)
	if err != nil {
		return nil, err
	}

	var pbPosts []*pb.Post
	for _, p := range posts {
		pbPosts = append(pbPosts, modelToPbPost(p))
	}

	return &pb.PostList{Posts: pbPosts}, nil
}
