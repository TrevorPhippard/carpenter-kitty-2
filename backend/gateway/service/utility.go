package gateway

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func ClientConn(addr string) string {
	conn, err := grpc.Dial(
		addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(), // wait for connection
	)
	if err != nil {
		log.Printf("failed to dial: %v", err)
		return "failed to connect"
	}
	defer conn.Close()

	client := NewUserServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	resp, err := client.Ping(ctx, &PingRequest{})
	if err != nil {
		log.Printf("Ping error: %v\n", err)
		return "ping failed"
	}

	return resp.Message
}
