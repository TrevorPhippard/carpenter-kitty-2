package service

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	pb "user/pb"
)

type UserService struct {
	kafkaProducer *kafka.Producer
	// here you can add DB connections, caches, etc.
}

func NewUserServiceWithProducer(producer *kafka.Producer) *UserService {
	return &UserService{
		kafkaProducer: producer,
	}
}

// CreateFriendRequest publishes a "friend request created" event
func (s *UserService) CreateFriendRequest(ctx context.Context, req *pb.CreateFriendRequestRequest) (*pb.CreateFriendRequestResponse, error) {
	// Here, implement any DB logic for storing friend requests

	eventData, err := json.Marshal(req)
	if err != nil {
		log.Printf("[UserService] failed to marshal friend request: %v", err)
		return nil, err
	}

	topic := "friend_requests"
	if err := s.kafkaProducer.Publish(topic, []byte(fmt.Sprintf("%d-%d", req.SenderId, req.ReceiverId)), eventData); err != nil {
		log.Printf("[UserService] failed to publish friend request event: %v", err)
		return nil, err
	}

	return &pb.CreateFriendRequestResponse{
		Status: "request_created",
	}, nil
}

// AcceptFriendRequest publishes a "friend request accepted" event
func (s *UserService) AcceptFriendRequest(ctx context.Context, req *pb.AcceptFriendRequestRequest) (*pb.AcceptFriendRequestResponse, error) {
	// Here, implement any DB logic for accepting friend requests

	eventData, err := json.Marshal(req)
	if err != nil {
		log.Printf("[UserService] failed to marshal accept request: %v", err)
		return nil, err
	}

	topic := "friend_request_accepted"
	if err := s.kafkaProducer.Publish(topic, []byte(fmt.Sprintf("%d-%d", req.ReceiverId, req.SenderId)), eventData); err != nil {
		log.Printf("[UserService] failed to publish accept friend request event: %v", err)
		return nil, err
	}

	return &pb.AcceptFriendRequestResponse{
		Status: "request_accepted",
	}, nil
}
