# Code Connect Workspace

Workspace monorepo com pnpm contendo:
- **web**: Aplicação React + Vite
- **api**: Aplicação NestJS

## 📦 Estrutura

```
code-connect/
├── apps/
│   ├── web/          # React + Vite
│   └── api/          # NestJS
├── package.json      # Configuração do workspace
└── pnpm-workspace.yaml
```

## 🚀 Primeiros Passos

### Instalação
```bash
pnpm install
```

### Desenvolver

Executar **ambas** as aplicações em paralelo:
```bash
pnpm dev
```

Ou executar cada uma individualmente:

**Frontend (React/Vite + Tailwind):**
```bash
pnpm web:dev         # Inicia dev server
pnpm web:build       # Build de produção
pnpm web:preview     # Preview do build
pnpm web:lint        # Lint do código
pnpm web:test        # Roda testes (uma vez)
pnpm web:test:watch  # Roda testes em watch mode
pnpm web:test:ui     # Dashboard interativo de testes
```

**Backend (NestJS):**
```bash
pnpm api:dev      # Inicia servidor em modo watch
pnpm api:build    # Build de produção
pnpm api:start    # Inicia servidor
pnpm api:test     # Roda testes unitários
pnpm api:test:e2e # Roda testes e2e
```

### Build

Build de ambas as aplicações:
```bash
pnpm build
```

### Testes

Roda testes em todos os apps:
```bash
pnpm test
```

Testes e2e apenas do backend:
```bash
pnpm test:e2e
```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia ambas apps em modo desenvolvimento |
| `pnpm build` | Build de produção de ambas apps |
| `pnpm web:dev` | Inicia frontend em dev mode |
| `pnpm web:build` | Build do frontend |
| `pnpm web:preview` | Preview do build do frontend |
| `pnpm api:dev` | Inicia backend em dev mode |
| `pnpm api:build` | Build do backend |
| `pnpm api:start` | Inicia backend em produção |
| `pnpm api:test` | Roda testes do backend |
| `pnpm api:test:e2e` | Roda testes e2e do backend |

## 📚 Documentação

- [React + Vite](./apps/web/README.md)
- [NestJS](./apps/api/README.md)

## 🔧 Configuração pnpm

O workspace está configurado em `pnpm-workspace.yaml`. Todos os pacotes em `apps/*` são reconhecidos como parte do workspace.

**Usar `--filter` para rodar comandos em apps específicos:**
```bash
pnpm --filter web install
pnpm --filter api lint
pnpm --filter api test
```

**Usar `-r` (recursive) para rodar em todos:**
```bash
pnpm -r install
pnpm -r build
```

**Usar `--parallel` para paralelizar:**
```bash
pnpm -r --parallel dev
```
