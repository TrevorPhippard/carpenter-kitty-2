# =========================
# 1. Build stage
# =========================
FROM golang:1.25.3-alpine AS builder

# Install basic build tools
RUN apk add --no-cache git bash

WORKDIR /app

# Copy go.mod/go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and pre-generated proto files
COPY proto/ ./proto/
COPY cmd/ ./cmd/
COPY internal/ ./internal/

# Build the binary (strip debug info)
RUN go build -ldflags="-s -w" -o posts-server cmd/server/main.go

# =========================
# 2. Final minimal image
# =========================
FROM scratch

WORKDIR /app

# Copy CA certificates for TLS support
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the compiled binary
COPY --from=builder /app/posts-server .

# Expose gRPC port
EXPOSE 50051

# Environment variables
ENV POST_DB_URI="mongodb://mongo:27017"
ENV POST_DB_NAME="posts"

# Run server
CMD ["./posts-server"]
