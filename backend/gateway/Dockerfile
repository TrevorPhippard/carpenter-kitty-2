# ----------------------
# Stage 1: Build
# ----------------------
FROM golang:1.25.3-alpine AS builder

# Install git and ca-certificates for modules and HTTPS
RUN apk add --no-cache git ca-certificates

WORKDIR /app

# Copy go.mod and go.sum first to leverage caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o gateway ./cmd

# ----------------------
# Stage 2: Runtime
# ----------------------
FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk add --no-cache ca-certificates

WORKDIR /root/

# Copy the binary from the builder
COPY --from=builder /app/gateway .

# Expose the default GraphQL port
EXPOSE 8080

# Run the binary
CMD ["./gateway"]
