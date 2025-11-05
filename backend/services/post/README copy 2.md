# User & Profile Service

## Overview

This service manages user accounts, authentication, and profiles. It handles profile creation, updates, and connections between users.

## Technology Stack

- Language: Go
- Database: PostgreSQL
- Authentication: JWT / OAuth
- Messaging: gRPC

## Primsa Schema Highlights

```prisma

type User  {
  id: ID!
  profile: Profile
  connections: [User]
}
type Profile {
  id: ID!
  firstName: String
  lastName: String
  headline: String
  experience: [Experience]
}
```

## Setup

1. Start the database:

   ```bash
   docker-compose up -d postgres
   ```

2. Run the service:

   ```bash
   go run main.go
   ```

## Environment Variables

- PORT
- USER_DB_HOST
- USER_DB_PORT
- USER_DB_USER
- USER_DB_PASSWORD
- USER_DB_NAME

## Example ENDPOINTS

***Base URL:*** /users

| Method | Endpoint          | Description       | Example Response                             |
| ------ | ----------------- | ----------------- | -------------------------------------------- |
| `POST` | `/users/register` | Create new user   | `{ "id": 1, "email": "alice@example.com" }`  |
| `POST` | `/users/login`    | Authenticate user | `{ "token": "JWT_TOKEN" }`                   |
| `GET`  | `/users/:id`      | Get user by ID    | `{ "id": 1, "email": "alice@example.com" }`  |
| `GET`  | `/users`          | List users        | `{ "users": [{ "id": 1, "email": "..." }] }` |
