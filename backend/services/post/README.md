# Feed / Post Service

## Overview

Manages posts, comments, likes, and feed generation.

## Technology Stack

- Language: Go
- Database: MongoDB
- Cache: Redis
- Messaging: gRPC

## Setup

1. Start the database:

   ```bash
   docker-compose up -d mongodb
   ```

2. Run the service:

   ```bash
   go run main.go
   ```

## Environment Variables

- PORT
- POST_DB_URI

## Example ENDPOINTS

***Base URL:*** /posts

| Method   | Endpoint     | Description    | Example Response                                                    |
| -------- | ------------ | -------------- | ------------------------------------------------------------------- |
| `GET`    | `/posts`     | Get all posts  | `{ "posts": [ { "id": "p1", "userId": 1, "content": "Hello!" } ] }` |
| `GET`    | `/posts/:id` | Get post by ID | `{ "id": "p1", "userId": 1, "content": "Hello!" }`                  |
| `POST`   | `/posts`     | Create post    | `{ "id": "p2", "userId": 1, "content": "New post" }`                |
| `DELETE` | `/posts/:id` | Delete post    | `{ "status": "deleted" }`                                           |
