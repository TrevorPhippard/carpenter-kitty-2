# ----------------------
# Stage 1: Build
# ----------------------
FROM golang:1.25.3-alpine AS builder

# Install git (needed if your modules use git) and ca-certificates
RUN apk add --no-cache git ca-certificates

WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary (assumes main.go is in ./cmd)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd

# ----------------------
# Stage 2: Runtime
# ----------------------
FROM alpine:latest

# Install ca-certificates for HTTPS requests if needed
RUN apk add --no-cache ca-certificates

WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Expose the gRPC port (example)
EXPOSE 50051

# Run the binary
CMD ["./main"]
