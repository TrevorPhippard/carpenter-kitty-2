# 🚀 Carpenter Kitty Microservices Backend

This repository contains a **microservices-based backend** for a modern social media application, built using **Go**, **NestJS**, and **Docker Compose**.

Each service is independently deployable, communicates through **HTTP**, **gRPC**, or **TCP**, and connects through a unified **API Gateway**.

---

## 🧩 Architecture Overview

| Layer | Technology | Description |
|--------|-------------|--------------|
| **API Gateway** | Go | Routes frontend requests to microservices (GraphQL + TCP). |
| **Connections Service** |  (gRPC) | Handles social graph (follows, connections, etc.). |
| **User Service** | Go + Postgres | Authentication and user management. |
| **Post Service** | Go + MongoDB | User posts, comments, and related content. |
| **Profile Service** | Go + Postgres | User bios, avatars, and profile management. |
| **GraphQL Gateway (optional)** | Apollo | Aggregates data for advanced query needs. |

All services are containerized and orchestrated via **Docker Compose**.

---

## 📂 Repository Structure

```
backend/
├── gateway/ # Go API Gateway
├── services/
│ ├── connections/ # Go microservice
│ ├── user/ # Go microservice (Postgres)
│ ├── post/ # Go microservice (Mongo)
│ └── profile/ # Go microservice (Postgres)
├── docs/ # Project documentation
│ ├── endpoints.md # Endpoint and response specification
│ ├── setup.md # Environment and setup guide
│ ├── testing.md # Unit & integration test coverage
│ └── architecture.md # Deep-dive architecture notes
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🧠 Documentation

| Topic | Description |
|--------|-------------|
| [**Endpoints & Responses**](./docs/endpoints.md) | REST & TCP endpoint definitions for all services |
| [**Setup Guide**](./docs/setup.md) | Local and container setup instructions |
| [**Testing Guide**](./docs/testing.md) | How to run all tests and interpret coverage |
| [**Architecture Deep Dive**](./docs/architecture.md) | Microservice communication, data flow, and event handling |
| [**User Service README**](./services/user/README.md) | basic setup & info
| [**Post Service README**](./services/post/README.md) | basic setup & info |
| [**Profile Service README**](./services/profile/README.md) | basic setup & info |

---

## 🧰 Local Development

### Prerequisites

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- Node.js 20+ (for Gateway & Connections)
- Go 1.23+ (for Go microservices)
- PostgreSQL and MongoDB running in containers (handled by `docker-compose.yml`)

### Run All Services

```bash
docker compose up --build

| Service             | Port   | Description           |
| ------------------- | ------ | --------------------- |
| API Gateway         | `8080` | Main entry point      |
| User Service        | `8081` | REST API for users    |
| Post Service        | `8082` | REST API for posts    |
| Profile Service     | `8083` | REST API for profiles |
| Connections Service | `9090` | TCP microservice      |


Access the app at:
👉 http://localhost:8080

🧪 Testing

Each service includes full unit and integration test coverage.

To run all tests:

```bash
make test
```

To test an individual service:

```bash
cd services/user && go test ./... -cover
# or
cd gateway && npm run test

```

See Testing Guide
 for detailed examples and expected coverage thresholds.

## 🧱 Service Communication

***Gateway ↔ Services:*** gRPC messages

***Connections ↔ Others:*** TCP microservice pattern

***Internal Messaging:*** (Future) Kafka or RabbitMQ events for feed/notification pipelines

***Database Layer:***
PostgreSQL (User, Profile)
MongoDB (Post)
Neo4J (Connections)

## Extending the System

| Feature           | How to Add                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------- |
| New microservice  | Create `/services/{name}` with the same structure (`internal/{handlers,service,repository}`) |
| New endpoint      | Add route to Gateway and service; update `endpoints.md`                                      |
| GraphQL layer     | Introduce Apollo Federation or Mercurius Gateway                                             |
| Event-driven flow | Add Kafka or RabbitMQ to `docker-compose.yml`                                                |

## 🧾 License

MIT © 2025 — Open for educational and professional use.
