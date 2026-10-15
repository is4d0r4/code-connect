# Página de Login — code-connect (web)

## Context
Implementar a página de login conforme o layout anexado (card escuro centralizado, banner à esquerda, formulário à direita, login social GitHub/Gmail, link para cadastro, ícones decorativos de "elos" no fundo). A página de cadastro virá depois com **o mesmo layout base**, banner diferente e outros campos — então layout, cabeçalho do formulário, login social e link de rodapé precisam ser reutilizáveis.

Achados da exploração que afetam o plano:
- `tailwindcss@4.3.3` está instalado, mas a config é estilo v3 (`tailwind.config.js`, `postcss.config.js` com plugin `tailwindcss`, `@tailwind base;` no CSS) → **Tailwind não funciona hoje**. Precisa migrar para v4.
- `src/index.css` e `App.jsx`/`App.css` ainda são o boilerplate do Vite (`#root { width: 1126px; border-inline… }`), que quebra o layout.
- Só existe o atom `Button` ([Button.jsx](apps/web/src/components/atoms/Button.jsx)), com cores azul/cinza genéricas; testes em `Button.test.jsx`.
- Não há router. Assets em `apps/web/public/`: `Github.png`, `Google.png`, `IMG_1 - Desktop.png` (407×636, já contém o logo code connect).

## 1. Corrigir setup do Tailwind v4
- `pnpm --filter web add -D @tailwindcss/vite`; remover `autoprefixer` (v4 já faz prefixos).
- [vite.config.js](apps/web/vite.config.js): adicionar `tailwindcss()` de `@tailwindcss/vite`.
- Apagar `tailwind.config.js` e `postcss.config.js`.
- Reescrever [src/index.css](apps/web/src/index.css):
  ```css
  @import "tailwindcss";
  @theme {
    --font-sans: "Prompt", sans-serif;
    --color-page: #01080E;      /* fundo da página */
    --color-surface: #171D1F;   /* card */
    --color-accent: #81FE88;    /* verde (botão, links) */
    --color-field: #888888;     /* fundo dos inputs */
    --color-offwhite: #E1E1E1;  /* textos */
    --color-muted: #BCBCBC;     /* textos secundários */
  }
  body { @apply bg-page text-offwhite font-sans antialiased; }
  ```
- [index.html](apps/web/index.html): `lang="pt-BR"`, título "Code Connect", `<link>` Google Fonts **Prompt** (400/500/600).
- Remover `App.css` e `src/assets/{hero.png,react.svg,vite.svg}` (boilerplate).

## 2. Componentes (Atomic Design)
Cada um: named export, JSDoc das props, classes Tailwind via `clsx`, `X.test.jsx` ao lado, e `index.js` barrel por nível (padrão já existente em `atoms/index.js`).

**atoms/**
- `Button` — **atualizar**: `primary` = `bg-accent text-surface font-semibold`, adicionar `fullWidth`; aceita children com ícone (`inline-flex gap-2`). Atualizar testes para as novas classes.
- `Input` — `bg-field text-surface placeholder:text-surface/70 rounded px-4 h-10`, repassa `...props` (type, id, name, autoComplete).
- `Label` — `<label htmlFor>` texto `offwhite`.
- `Checkbox` — input checkbox estilizado (`accent-accent`, borda verde) + label inline ("Lembrar-me").
- `TextLink` — `<a>` com variantes `underline` (Esqueci a senha) e `accent` (Crie seu cadastro!).
- `Icon` — SVG inline por `name`: `arrow-right`, `clipboard`, `chain` (logo de elos usado no fundo). `aria-hidden` por padrão.
- `Heading` / `Text` — opcional; se ficar trivial, usar tags com classes direto nos molecules.

**molecules/**
- `FormField` — `Label` + `Input` com `id` ligado (`useId` como fallback).
- `AuthHeader` — `title` + `subtitle` ("Login" / "Boas-vindas! Faça seu login.").
- `SocialButton` — `<button>` com `img` (src, alt="") + legenda ("Github", "Gmail"); `onClick`.
- `DividerWithText` — linhas laterais + texto ("ou entre com outras contas").
- `AuthRedirect` — pergunta + `TextLink` com ícone ("Ainda não tem conta?" / "Crie seu cadastro!" → `href="/cadastro"`). Props: `question`, `linkText`, `href`, `icon`.

**organisms/**
- `LoginForm` — `<form>` controlado (`useState`): FormField email/usuário, FormField senha (`type="password"`), linha Checkbox "Lembrar-me" + TextLink "Esqueci a senha", Button "Login →". Prop `onSubmit({ login, password, remember })` com `preventDefault`. Campos `required`.
- `SocialLogin` — `DividerWithText` + lista de `SocialButton` a partir de prop `providers` (default: GitHub `/Github.png`, Gmail `/Google.png`); `onSelect(providerId)`. Reutilizável no cadastro.

**templates/**
- `AuthTemplate` — **base para login e cadastro**. Props: `bannerSrc`, `bannerAlt`, `children` (coluna direita). Renderiza: fundo `bg-page` com dois `Icon name="chain"` decorativos (absolute, `text-[#0B1A1F]`-ish, `pointer-events-none`, superior esquerdo / inferior direito), card `bg-surface rounded-[32px]` centralizado com grid 2 colunas (banner `object-cover` + conteúdo). Mobile: coluna única, banner oculto (`hidden md:block`).

**pages/**
- `LoginPage` — compõe `AuthTemplate` (`bannerSrc="/IMG_1%20-%20Desktop.png"`, alt descritivo) com `AuthHeader`, `LoginForm`, `SocialLogin`, `AuthRedirect`. Handlers por enquanto sem integração (API não tem auth) — `onSubmit` recebe os dados; deixar a integração para depois.
  - Futuro `SignupPage` = mesmo `AuthTemplate` + outro banner + `SignupForm` + `SocialLogin` + `AuthRedirect("Já tem conta?", "Faça seu login!")`.

## 3. App
- [App.jsx](apps/web/src/App.jsx): `export default function App() { return <LoginPage /> }` (sem router por ora; adicionar `react-router` quando o cadastro existir).

## Verificação
- `pnpm web:test` — todos os testes (novos + Button atualizado) passam. Testes essenciais: render de textos/labels, `getByLabelText` nos campos, digitação + submit do `LoginForm` chamando `onSubmit` com os valores, clique em `SocialButton` chamando `onSelect('github')`, `AuthTemplate` renderiza banner (`alt`) e children.
- `pnpm web:lint` sem erros.
- `pnpm web:build` compila (confirma Tailwind v4 ok).
- `pnpm web:dev` e comparar visualmente com o layout em 1920px e em largura mobile.
- Commit: `feat(web): add login page with reusable auth layout` (e `chore(web): migrate tailwind config to v4` separado).
