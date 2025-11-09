BINARY_NAME=gateway

gql:
	go run github.com/99designs/gqlgen generate

proto:
	protoc --go_out=. --go_opt=paths=source_relative \
				--go-grpc_out=. --go-grpc_opt=paths=source_relative \
				./service/schema.proto

dep:
	go mod tidy && go mod vendor && go fmt

build:
	GOARCH=amd64 GOOS=linux go build -o $(BINARY_NAME)_Linux_amd64 server. go

run:
	go run ./server.go

clean:
	go clean
	rm $(BINARY_NAME)_Linux_amd64