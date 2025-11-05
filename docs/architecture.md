## Repo layout

```bash
/
├─ proto/
│  ├─ social.proto
│  └─ user.proto
├─ services/
│  ├─ user/               # go module
│  │  ├─ cmd/
│  │  │  └─ user/main.go
│  │  ├─ internal/
│  │  │  ├─ handlers/
│  │  │  ├─ repository/
│  │  │  ├─ service/
│  │  │  └─ models/
│  │  └─ tests/
│  ├─ posts/
│  ├─ notifications/
│  └─ social-graph/       # nestjs/graphql service (typescript)
├─ gateway/               # nestjs API gateway (typescript)
├─ infra/
│  ├─ docker-compose.yml
│  └─ dev.env
├─ scripts/
│  └─ generate_protos.sh
├─ Makefile
└─ README.md
```
