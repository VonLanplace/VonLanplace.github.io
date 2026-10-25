# AI Change Log - 2026-10-25

## 08. Release 1.1.0, acessibilidade e build resiliente
- Versão elevada para `1.1.0` em `package.json` e `package-lock.json`.
- Acessibilidade (WCAG AA):
  - novo token `--ef-accent-text-rgb` / classe `text-ef-accent-text`, separado do accent de fundo para manter contraste sem quebrar botões primários;
  - tema claro: muted `#59685a` e accent text `#50662e`;
  - tema escuro: muted `#b3bdb4` e accent text `#bad39a`;
  - todas as ocorrências de `text-ef-accent` em texto/ícones passaram a usar `text-ef-accent-text`;
  - botões de idioma agora incluem `PT`/`EN` no `aria-label`, corrigindo `label-content-name-mismatch`;
  - cards de certificado usam link overlay vazio sobre a prévia, evitando conflito entre texto visível e nome acessível;
  - texto de erro de prévia PDF usa cor fixa `#50662e` sobre fundo branco.
- Build:
  - `scripts/extract-skills.js` e `scripts/extract-contributions.js` enviam `Accept`, `User-Agent` e `Authorization` quando `GITHUB_TOKEN` existe;
  - falha/rate limit da API GitHub agora preserva os JSONs commitados e não derruba o build;
  - `.github/workflows/deploy.yml` injeta `GITHUB_TOKEN` no passo de build.
- Verificações executadas:
  - `npm ci`: OK;
  - `npm audit --audit-level=low`: 0 vulnerabilidades;
  - OSV: 147 pacotes, 0 findings;
  - `npm audit signatures`: 96 verificadas, 59 attestations;
  - `npm run typecheck`: OK;
  - `npm run build`: OK com fallback local (API GitHub retornou 403 por rate limit);
  - Playwright desktop/mobile: 8 seções, 9 certificados na ordem por commit, 3 páginas, projetos filtrados, dialog, PT/EN, tema, cache e fallback OK;
  - axe-core claro e escuro: 0 violações;
  - console errors, page errors e failed requests: nenhum.
- Publicação: commit de release e tag local `v1.1.0`; sem push/deploy por falta de permissão SSH.
- Próximo passo do usuário: enviar `dev`, abrir/mergear PR para `main` e publicar a tag se desejado.
