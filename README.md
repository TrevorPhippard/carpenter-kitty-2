![Xigadee](/docs/ck-logo-type.png)

# Carpenter Kitty

## 🚀 Overview

**Carpenter Kitty** is a professional networking platform tailored for blue-collar and trades professionals, providing a LinkedIn-like experience for a hands-on workforce. The platform enables users to:

- Create and manage detailed profiles
- Connect with peers, freelancers, and contractors
- Engage with potential clients
- Share updates, projects, and articles
- Search and apply for jobs
- Chat in real-time
- Receive notifications instantly
- Leave and read reviews

The project is **modular, scalable, and designed with a microservices architecture in mind**, serving as a demonstration of production-ready engineering practices.

---

## 🎨 Dashboard Preview

> Live demo not available yet, but here’s a visual preview:

**Feed Page**
![Feed GIF](https://)

**Profile Page**
![Profile GIF](https://)

**Messaging**
![Messaging GIF](https:/)

---

## ✨ Features

### User Features

- ✅ Sign up / log in with JWT authentication
- ✅ Edit profile, add experience, education, and skills
- ✅ Connect with others, follow companies, endorse skills
- ✅ Post updates, like, comment, and share content
- ✅ Search, save, and apply for jobs
- ✅ Receive activity notifications

### Admin Features (eventually)

- ⚡ Manage users (suspend, ban)
- ⚡ Moderate content (flag posts and comments
- ⚡ Analytics dashboard for engagement

---

## 🛠 Tech Stack

### Frontend

- **Framework:** React + Tanstack
- **State Management:** Tanstack Store
- **Testing:** Vitest / Jest

### Backend / API

- **Language:** Go (Golang) 1.25+
- **Architecture:** Micro-services with HTTP/gRPC communication via an API gateway
- **Datastores:** PostgreSQL / MongoDB / Neo4j (per-service)

### Real-time & Messaging

- WebSockets / gRPC-Web (WIP)

### Search & Queue

- Elasticsearch & Kafka (planned)

### DevOps

- Docker & Docker Compose
- Kubernetes-ready (MiniKube or Kind for local testing)

---

## ⚡ Getting Started

##### Prerequisites

- Go 1.25+
- Node.js 20+
- Docker & Docker Compose
- Make (optional but recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/TrevorPhippard/Carpenter-Kitty-Microservice.git

cd Carpenter-Kitty-Microservice

# Install dependencies in both /frontend & /backend
npm install

# Start backend and services
docker-compose up -d

# Start frontend
cd frontend
npm run dev
```

#### Services will be available at

Gateway: <http://localhost:8080>
Frontend: <http://localhost:5173>

---

## 🗂 Project Structure

```
Carpenter-Kitty-Microservice/
│
├── backend/
│   ├── gateway/ # Go-based API Gateway (HTTP entrypoint)
│   ├── services/ # Independent Go microservices
│   │   ├── auth/
│   │   ├── user/
│   │   ├── post/
│   │   └── …
│
├── frontend/
|   └── src
│       ├── components/
│       |     └── [page specific components]/
│       |     ├── storybook/
│       |     └── ui/
│       ├── hooks/
│       |     └── [page specific hooks]/
│       ├── lib/
│       ├── routes/
│       |     └── (auth-pages)
│       |     └── (authorized)
│       ├── types/
│       ├── data/
│       ├── utils/
│       └── integrations/
│
├── .env (you'll add this)
├── docker-compose.yml
└── README.md
```

## 🏗 Architecture

**Description:**
Test driven, observability first, well-defined contracts.

#### Backend

- **Pattern:** Loosely coupled microservices
- **Communication:** HTTP / gRPC via API Gateway
- **Orchestration:** Docker Compose (local), Kubernetes ready
- **Configuration:** Environment variables per service

### Frontend

- **Framework:** React + Tanstack
- **Communication:** REST / gRPC-Web via API Gateway
- **State Management:** Tanstack Store
- **Testing:** Vitest / Jest

## 🧪 Testing Strategy

Testing is designed to be modular, automated, and CI-ready.

### Backend (Go)

- **Unit Tests:** Table-driven tests using Go’s testing package
- **Integration Tests:** Spin up dependencies with Docker Compose
- **Contract Tests:** Verify API / gRPC interfaces
- **Mocking:** To be determined (likely using Go test doubles)

### Frontend

- **Unit & Component Tests:** Jest / Vitest
- **End-to-End Tests:** Playwright

Run all tests locally or in CI:

```
make test
# or
docker-compose run --rm backend make test
```

## 📦 Deployment

- **Docker Compose (Local):** Each service containerized and defined in `backend/docker-compose.yml`

- **Kubernetes (Production-ready):** Helm charts or manifests under `/deploy/k8s/`

- **CI/CD:** GitHub Actions can build, test, and push containers to a registry

## 📈 Observability

- **Logging:** Structured JSON logs

- **Metrics:** Prometheus endpoints (`/metrics`)

- **Tracing:** OpenTelemetry integration

- **Dashboards:** Grafana (planned)

## 🔐 Security

- JWT-based authentication (temporary implementation)
- Rate limiting and CORS rules
- Secrets managed via environment variables
- Principle of least privilege applied per container

## 🚀 CI/CD Pipeline

**workflow:** GitHub Actions

Example pipeline steps:

```
- name: Build backend
  run: go build ./...
- name: Run tests
  run: go test ./... -v
```

- Build and test on every PR
- Deploy containers on merge to main

## 🧰 Developer Notes

 Future improvements and feature expansions documented here

---

## 🤝 Contributing

1. Contributions are currently not accepted

---

## 📄 License

MIT License – See [LICENSE](LICENSE)
