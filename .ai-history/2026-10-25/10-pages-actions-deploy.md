# AI Change Log - 2026-10-25

## 10. Fix Pages MIME error (raw source deploy)
- Sintoma: `https://vonlanplace.github.io/src/main.tsx` servido como `application/octet-stream`; site carregava `index.html` cru.
- Causa: GitHub Pages publicava a branch `main` (legacy `pages build and deployment`) em vez do artefato do workflow `Deploy to GitHub Pages`.
- Ação do owner: Settings → Pages → Source alterado para **GitHub Actions**.
- `index.html`: ícones passaram de caminhos absolutos (`/favicon.*`) para relativos (`./favicon.*`), coerentes com `base: './'`.
- `public/404.html`: fallback SPA que redireciona rotas desconhecidas para `/` preservando query e hash.
- `.github/workflows/deploy.yml`: etapa `Verify build output` falha o deploy se `dist/index.html` ainda apontar para `/src/main.tsx`, se não houver script `type="module"` ou se faltarem `dist/404.html` e `dist/.nojekyll`.
- Verificação local: `npm ci`, `npm run typecheck` e `npm run build` com sucesso; `dist/index.html` referencia `./assets/index-*.js`.
