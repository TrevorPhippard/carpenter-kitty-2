package handler

import (
	"context"
	"user/internal/service"
	"user/internal/user/proto"
)

type UserHandler struct {
	proto.UnimplementedUserServiceServer
	service *service.UserService
}

func NewUserHandler(service *service.UserService) *UserHandler {
	return &UserHandler{service: service}
}

func (h *UserHandler) CreateUser(ctx context.Context, req *proto.CreateUserRequest) (*proto.UserResponse, error) {
	user, err := h.service.CreateUser(req.Name, req.Email)
	if err != nil {
		return nil, err
	}
	return &proto.UserResponse{
		User: &proto.User{
			Id:    uint64(user.ID.ID()),
			Name:  user.Username,
			Email: user.Email,
		},
	}, nil
}

func (h *UserHandler) GetUser(ctx context.Context, req *proto.GetUserRequest) (*proto.UserResponse, error) {
	user, err := h.service.GetUser(req.Id)
	if err != nil {
		return nil, err
	}
	return &proto.UserResponse{
		User: &proto.User{
			Id:    uint64(user.ID.ID()),
			Name:  user.Username,
			Email: user.Email,
		},
	}, nil
}

func (h *UserHandler) ListUsers(ctx context.Context, req *proto.Empty) (*proto.ListUsersResponse, error) {
	users, err := h.service.ListUsers()
	if err != nil {
		return nil, err
	}
	var protoUsers []*proto.User
	for _, u := range users {
		protoUsers = append(protoUsers, &proto.User{
			Id:    uint64(u.ID.ID()),
			Name:  u.Username,
			Email: u.Email,
		})
	}
	return &proto.ListUsersResponse{Users: protoUsers}, nil
}

func (h *UserHandler) UpdateUser(ctx context.Context, req *proto.UpdateUserRequest) (*proto.UserResponse, error) {
	user, err := h.service.GetUser(req.Id)
	if err != nil {
		return nil, err
	}
	user.Username = req.Name
	user.Email = req.Email
	updated, err := h.service.UpdateUser(user)
	if err != nil {
		return nil, err
	}
	return &proto.UserResponse{
		User: &proto.User{
			Id:    uint64(updated.ID.ID()),
			Name:  updated.Username,
			Email: updated.Email,
		},
	}, nil
}

func (h *UserHandler) DeleteUser(ctx context.Context, req *proto.DeleteUserRequest) (*proto.Empty, error) {
	if err := h.service.DeleteUser(req.Id); err != nil {
		return nil, err
	}
	return &proto.Empty{}, nil
}
