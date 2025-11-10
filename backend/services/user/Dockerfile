# =========================
# 1. Build stage
# =========================
FROM golang:1.25.3-alpine AS builder

# Install build tools
RUN apk add --no-cache git bash

WORKDIR /app

# Copy Go modules and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and pre-generated proto files
COPY proto/ ./proto/
COPY cmd/ ./cmd/
COPY internal/ ./internal/

# Build the binary
RUN go build -ldflags="-s -w" -o user-server cmd/server/main.go

# =========================
# 2. Minimal production image
# =========================
FROM scratch

WORKDIR /app

# Copy CA certificates for TLS support
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the compiled binary
COPY --from=builder /app/user-server .

# Expose gRPC port
EXPOSE 50052

# Environment variables
ENV USER_DB_URI="mongodb://mongo:27017"
ENV USER_DB_NAME="users"

# Run server
CMD ["./user-server"]
