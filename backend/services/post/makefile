BINARY_NAME=gateway

proto:
	protoc --go_out=. --go_opt=paths=source_relative \
				--go-grpc_out=. --go-grpc_opt=paths=source_relative \
				./proto/post.proto

dep:
	go mod tidy  && go fmt

build:
	GOARCH=amd64 GOOS=linux go build -o $(BINARY_NAME)_Linux_amd64 server. go

run:
	go run ./cmd/server/main.go

clean:
	go clean
	rm $(BINARY_NAME)_Linux_amd64