# AI Change Log - 2026-10-25

## 09. Upgrade de segurança: Vite 8 + Tailwind 4
- Objetivo: zerar as 6 vulnerabilidades de desenvolvimento reportadas pelo `npm audit`, preservando o redesign Everforest.
- Estratégia aprovada: migrar para Vite 8 e Tailwind 4 em vez de apenas aplicar overrides.

### Dependências
- `vite`: `5.x` → `8.3.5`.
- `@vitejs/plugin-react`: `4.3.1` → `6.1.2`.
- `tailwindcss`: `3.4.3` → `4.3.3`.
- Adicionado `@tailwindcss/vite@4.3.3`.
- Adicionado `tw-animate-css@1.4.0` no lugar de `tailwindcss-animate`.
- Removidos `autoprefixer`, `postcss` direto e `tailwindcss-animate`.
- Removido `"main": "postcss.config.js"` do `package.json`.
- Workflows `deploy.yml`, `extract-contributions.yml` e `extract-skills.yml` passaram a usar Node `22`.

### Configuração e CSS
- `vite.config.ts`: plugin `@tailwindcss/vite` adicionado.
- `tailwind.config.js` e `postcss.config.js` deletados.
- `src/index.css` migrado para CSS-first:
  - `@import "tailwindcss";`
  - `@import "tw-animate-css";`
  - `@custom-variant dark (&:where(.dark, .dark *));`
  - `@theme inline` com tokens `ef` apontando para `rgb(var(--ef-*-rgb))`.
- Variáveis `--ef-*` mantidas para usos arbitrários e alpha.
- Classes incompatíveis ajustadas no UI kit:
  - `shadow-sm` → `shadow-xs`
  - `backdrop-blur-sm` → `backdrop-blur-xs`
  - `bg-gradient-to-r` → `bg-linear-to-r`
  - `flex-grow` → `grow`
  - `ring-offset-*` removido (não gera no Tailwind 4).

### Verificação
- `npm audit`: **0 vulnerabilities**.
- `npm audit --omit=dev`: **0 vulnerabilities**.
- `npm run typecheck`: passou.
- `npm run build`: passou com Vite `8.3.5`; 2033 módulos.
- Artefatos: CSS `43.88 kB` (gzip `8.28 kB`), JS `320.30 kB` (gzip `102.88 kB`).
- Alpha dos tokens validado no CSS gerado (`color-mix`): `bg-ef-bg/80`, `bg-ef-surface/80`, `border-ef-accent/20`.
- QA headless (Firefox): desktop/mobile, light/dark, menu mobile aberto e dialog Radix.
- Carrossel de Projects conferido: setas ficam fora dos cards, sem sobreposição.
- Animações do menu e dialog geradas por `tw-animate-css`.
- `src/data/skills.json` e `src/data/contributions.json` restaurados após o build.
- Páginas temporárias `dist/_qa-*.html` removidas pelo build limpo.
- Observação: Tailwind 4 exige Safari 16.4+, Chrome 111+ e Firefox 128+.
- Esta seção substitui as notas de segurança/Tailwind 3 da seção 07 do log `02-sections-qa.md`.
- Nenhum commit criado.
