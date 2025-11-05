#!/bin/bash

# ================================
# LinkedIn Microservices Readme Generator
# ================================

set -e

BASE_DIR="microservices-readmes"
mkdir -p "$BASE_DIR"



# ------------------------------
# User Service
# ------------------------------
SERVICES["user-service"]="# User & Profile Service

## Overview
This service manages user accounts, authentication, and profiles. It handles profile creation, updates, and connections between users.

## Technology Stack
- Language: Go
- Database: PostgreSQL
- Authentication: JWT / OAuth
- GraphQL: Apollo Federation compatible schema

## GraphQL Schema Highlights
\`\`\`graphql
type User @key(fields: \"id\") {
  id: ID!
  profile: Profile
  connections(first: Int): [User]
}
type Profile {
  id: ID!
  firstName: String
  lastName: String
  headline: String
  experience: [Experience]
}
\`\`\`

## Setup
1. Clone the repository:
   \`\`\`bash
   git clone <repo-url>
   cd user-service
   \`\`\`
2. Create a .env file based on .env.example.
3. Start the database:
   \`\`\`bash
   docker-compose up -d postgres
   \`\`\`
4. Run the service:
   \`\`\`bash
   go run main.go
   \`\`\`

## Environment Variables
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- JWT_SECRET

## Example Queries
\`\`\`graphql
query {
  user(id: \"123\") {
    profile {
      firstName
      headline
    }
    connections(first: 5) {
      profile { firstName }
    }
  }
}
\`\`\`
"

# ------------------------------
# Connections Service
# ------------------------------
SERVICES["connections-service"]="# Connections Service

## Overview
Handles connections between users, including sending/receiving connection requests and endorsements.

## Technology Stack
- Language: Go
- Database: Neo4j or PostgreSQL
- Messaging: Kafka

## GraphQL Schema Highlights
\`\`\`graphql
type Connection @key(fields: \"id\") {
  id: ID!
  user: User
  connectedUser: User
  status: String
}
\`\`\`

## Setup
1. Clone repo
2. Create .env file
3. Run Neo4j:
   \`\`\`bash
   docker-compose up -d neo4j
   \`\`\`
4. Start service:
   \`\`\`bash
   go run main.go
   \`\`\`

## Environment Variables
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- KAFKA_BROKER

## Example Queries
\`\`\`graphql
query {
  connection(id: \"456\") {
    user { id }
    connectedUser { id }
    status
  }
}
\`\`\`
"

# ------------------------------
# Feed / Post Service
# ------------------------------
SERVICES["feed-service"]="# Feed / Post Service

## Overview
Manages posts, comments, likes, and feed generation.

## Technology Stack
- Language: Go
- Database: MongoDB
- Cache: Redis
- Messaging: Kafka

## GraphQL Schema Highlights
\`\`\`graphql
type Post @key(fields: \"id\") {
  id: ID!
  author: User
  content: String
  comments(first: Int): [Comment]
  reactions: [Reaction]
}
\`\`\`

## Setup
\`\`\`bash
docker-compose up -d mongodb redis
go run main.go
\`\`\`

## Environment Variables
- MONGO_URI
- REDIS_HOST
- REDIS_PORT

## Example Queries
\`\`\`graphql
query {
  post(id: \"789\") {
    content
    author { profile { firstName } }
    comments(first: 3) { content }
  }
}
\`\`\`
"

# ------------------------------
# Messaging Service
# ------------------------------
SERVICES["messaging-service"]="# Messaging Service

## Overview
Handles direct messages, conversations, and attachments.

## Technology Stack
- Language: Go
- Database: MongoDB or DynamoDB
- Real-time: WebSocket / gRPC Streaming

## GraphQL Schema Highlights
\`\`\`graphql
type Message @key(fields: \"id\") {
  id: ID!
  conversation: Conversation
  sender: User
  content: String
  createdAt: String
}
\`\`\`

## Setup
\`\`\`bash
docker-compose up -d mongodb
go run main.go
\`\`\`

## Environment Variables
- DB_URI
- WEBSOCKET_PORT
- JWT_SECRET

## Example Queries
\`\`\`graphql
query {
  conversation(id: \"123\") {
    messages(first: 10) {
      content
      sender { id }
    }
  }
}
\`\`\`
"

# ------------------------------
# Search Service
# ------------------------------
SERVICES["search-service"]="# Search & Discovery Service

## Overview
Provides search across users, posts, jobs, and companies.

## Technology Stack
- Language: Go
- Search Engine: Elasticsearch

## GraphQL Schema Highlights
\`\`\`graphql
union SearchResult = User | Post | JobPosting | Company
type Query {
  search(query: String!): [SearchResult]
}
\`\`\`

## Setup
\`\`\`bash
docker-compose up -d elasticsearch
go run main.go
\`\`\`

## Environment Variables
- ELASTICSEARCH_HOST
- ELASTICSEARCH_PORT

## Example Queries
\`\`\`graphql
query {
  search(query: \"Software Engineer\") {
    ... on JobPosting { title }
    ... on User { profile { firstName } }
  }
}
\`\`\`
"

# ------------------------------
# Company Service
# ------------------------------
SERVICES["company-service"]="# Company & Job Service

## Overview
Handles company profiles, job postings, and job applications.

## Technology Stack
- Language: Go
- Database: PostgreSQL or MongoDB

## GraphQL Schema Highlights
\`\`\`graphql
type Company @key(fields: \"id\") {
  id: ID!
  name: String
  followers: [User]
  jobs: [JobPosting]
}

type JobPosting @key(fields: \"id\") {
  id: ID!
  company: Company
  title: String
  applicants: [User]
}
\`\`\`

## Setup
\`\`\`bash
docker-compose up -d postgres
go run main.go
\`\`\`

## Environment Variables
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_PORT

## Example Queries
\`\`\`graphql
query {
  company(id: \"101\") {
    name
    jobs { title }
  }
}
\`\`\`
"

# ------------------------------
# Notification Service
# ------------------------------
SERVICES["notification-service"]="# Notification Service

## Overview
Manages notifications across all services, including email and push notifications.

## Technology Stack
- Language: Go
- Database: PostgreSQL or Redis (for queue)
- Messaging: Kafka

## GraphQL Schema Highlights
\`\`\`graphql
type Notification @key(fields: \"id\") {
  id: ID!
  user: User
  type: String
  message: String
  read: Boolean
}
\`\`\`

## Setup
\`\`\`bash
docker-compose up -d postgres
go run main.go
\`\`\`

## Environment Variables
- DB_HOST
- KAFKA_BROKER
- EMAIL_API_KEY

## Example Queries
\`\`\`graphql
query {
  notifications(userId: \"123\") {
    message
    type
    read
  }
}
\`\`\`
"

# ------------------------------
# Create each service folder and README
# ------------------------------
for service in "${!SERVICES[@]}"; do
  mkdir -p "$BASE_DIR/$service"
  echo "${SERVICES[$service]}" > "$BASE_DIR/$service/README.md"
done

# Zip everything
zip -r microservices-readmes.zip "$BASE_DIR"

echo "✅ All README files generated and zipped as microservices-readmes.zip"
