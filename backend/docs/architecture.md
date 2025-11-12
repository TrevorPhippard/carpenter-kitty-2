## Repo layout

```bash
/
├─ proto/
│  ├─ social.proto
│  └─ user.proto
├─ services/
│  ├─ user/
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
│  └─ social-graph/
├─ gateway/
├─ infra/
│  ├─ docker-compose.yml
│  └─ dev.env
├─ scripts/
│  └─ generate_protos.sh
├─ Makefile
└─ README.md
```
