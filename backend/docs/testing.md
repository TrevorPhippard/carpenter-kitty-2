## TDD Plan — overall rules & tools

- **Red → Green → Refactor**, for every task.
- **Unit tests first** (fast, isolated with mocks).
- **Integration tests second** (use docker containers or testcontainers).
- **Contract tests for gRPC** (ensure proto stability).
- **End-to-end tests last** (docker compose to bring whole stack up).

### Tools

- Go: go test, testing, testify (assertions and mocks), gomock or mockery.
- gRPC: google.golang.org/grpc, bufconn for in-memory tests.
- DB integration: use Docker Compose DBs or testcontainers-go.
- NestJS: Jest, supertest, @nestjs/testing, apollo-server-testing for GraphQL.
- CI: GitHub Actions to run test stages.
- Lint: golangci-lint, eslint for TS.
