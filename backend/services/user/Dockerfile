# ================================
# Build stage
# ================================
FROM golang:1.25.3-alpine AS builder

# Install git for Go modules
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
RUN go build -o user-service ./cmd/server/main.go

# ================================
# Final stage
# ================================
FROM alpine:3.18

# Install CA certificates for gRPC / TLS and curl for healthcheck
RUN apk add --no-cache ca-certificates curl

WORKDIR /app

# Copy the compiled binary from builder
COPY --from=builder /app/user-service .

# Download grpc_health_probe for Docker healthchecks
ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.4.20/grpc_health_probe-linux-amd64 /bin/grpc_health_probe
RUN chmod +x /bin/grpc_health_probe

# Expose the gRPC port
EXPOSE 50051

# Set default environment variable (can be overridden by docker-compose)
ENV PORT=50051

# Run the service
CMD ["./user-service"]
