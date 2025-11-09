# Carpenter Kitty

## 🚀 Overview

**Carpenter Kitty** is a full-featured professional networking platform, designed to be a more blue collared version LinkedIn. It allows professionals to:

- Build and manage profiles
- Connect with other professionals
- Connect freelancers to contractors
- Connect both potential clients
- Post updates and share articles, recent projects, etc
- Search and apply for jobs
- Chat in real-time
- Receive instant notifications
- Leave reviews

The project is **modular, scalable, and eventually microservices-based**, built to demonstrate a production-ready architecture.

---

## 🎨 Dashboard So far

> probably won't have a live link for awhile so here's a peak.

**Feed Page**
![Feed GIF](https://)

**Profile Page**
![Profile GIF](https://)

**Messaging**
![Messaging GIF](https:/)

---

## ✨ Features

### User Features

- ❌ Signup/Login with JWT
- ❌ Edit profile, add experience, education, skills
- ❌ Connect, follow companies, endorse skills
- ❌ Post updates, like, comment, share
- ❌ Job search, save, and apply
- ❌ Activity notifications

### Admin Features (eventually)

- ⚡ Manage users (suspend, ban)
- ⚡ Moderate content (flag posts/comments)
- ⚡ Analytics dashboard for engagement

---

## 🛠 Tech Stack

### Frontend

Tannerverse + React

### Backend / API

Go services that communicate through a shared API gateway, planning for federated graphQL
I'll probably learn swagger at some point

### Realtime & Messaging

WIP

### Search & Queue

Elasticsearch & Kafka would be nice

### DevOps

Docker with plans of local version of mini-kube  or Kind

---

## ⚡ Getting Started

##### Prerequisites
- Go 1.22+
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

#### Services will be available at:

Gateway: http://localhost:8080
Frontend: http://localhost:5173

---

## 🗂 Folder Structure

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

#### Backend
The backend is built using Go (Golang) and structured as loosely coupled microservices. Each service runs independently and communicates over HTTP or gRPC through an API gateway.

##### Key characteristics:
- Language: Go 1.22+
- Frameworks: Standard Go HTTP/gRPC
- Data Stores: PostgreSQL / MongoDB / Neo4j (per-service)
- Orchestration: Docker Compose for local; Kubernetes-ready
- Gateway: Handles routing, request validation, and load balancing
- Configuration: .env per service with environment variable overrides

#### Frontend

Framework: React / TanstackStart
Communication: REST / gRPC-Web via gateway
State Management: Tanstack Store
Testing: Vitest / Jest

## 🧪 Testing Strategy
Testing is designed to be modular, automated, and CI-ready.

#### Backend (Go)

**Unit Tests:** Use Go’s built-in testing package with table-driven tests.
Integration Tests: Use Docker Compose to spin up dependencies (databases, message brokers) and run go test
**Contract Tests:** For API/gRPC interfaces between services.
**Mocking:** not sure, usually use faker.js, will have to find what to use in golang

#### Frontend

**Unit + Component Tests:** Via Jest
**E2E Tests:** Playwright 

All tests can be run locally or in CI with a single command:
make test  or docker compose run --rm backend make test


## 📦 Deployment

The system supports both Docker Compose (local) and Kubernetes (production) deployments.
Docker Compose
Each service is containerized and configured in backend/docker-compose.yml.
Kubernetes (Optional)
Helm charts or manifests can be added per service under /deploy/k8s/.
CI/CD can push to:
GitHub Container Registry

## 📈 Observability

To enable production-grade reliability:

**Logging:** Structured JSON logs (haven't researched too much)
**Metrics:** Prometheus metrics via /metrics endpoints.
**Tracing:** OpenTelemetry integrated across services.
**Dashboards:** Grafana (seems like the go to, haven't researched too much)


## 🔐 Security

- Self rolled JWT-based authentication (meantime, not production), until better-auth provides better documentation. 
- Rate limiting and CORS rules
- Secrets managed via .env or environment variables
- Minimal privileges for each container

## 🚀 CI/CD Pipeline

**workflow:** GitHub Actions
**Build & Test:** Run go test and frontend unit tests on each PR.
**Deploy:** On main merge, push containers and trigger rollout. 

Example pipeline steps:

- name: Build backend
  run: go build ./...
- name: Run tests
  run: go test ./... -v

## 🧰 Developer Notes
 These are just dreams 

---

## 🤝 Contributing

1. don't

---

## 📄 License

MIT License – See [LICENSE](LICENSE)
