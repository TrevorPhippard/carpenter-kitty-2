# Stage 1: Build
FROM golang:1.25.3 AS builder

# Set working directory inside container
WORKDIR /app

# Copy Go module files
COPY go.mod go.sum ./
RUN go mod download

# Copy service source code
COPY . .

# Build the Go binary (cmd/main.go is entrypoint)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd

# Stage 2: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Add a non-root user
RUN useradd -m appuser
USER appuser

# Copy built binary from builder stage
COPY --from=builder /app/main .

# Expose port
EXPOSE 8080

# Run the service
CMD ["./main"]
