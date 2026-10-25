# AI Change Log - 2026-10-25

## 10. Favicon e ícone iOS
- Criado `public/favicon.svg` com a mesma marca do header:
  - quadrado arredondado `#93B259` (accent Everforest);
  - glifo Lucide `Code2`/`CodeXml` em `#2B3339`;
  - mesmas proporções do logo de `Navbar` (36px, raio 12px, ícone 20px).
- Criado `public/favicon.ico` com camadas 64, 48, 32 e 16 px.
- Criado `public/apple-touch-icon.png` 180×180, opaco e com fundo verde sólido para evitar cantos brancos/preto no iOS.
- `index.html`: referência quebrada `/vite.svg` substituída por:
  - `favicon.ico` (`sizes="any"`);
  - `favicon.svg` (`image/svg+xml`);
  - `apple-touch-icon.png` (`180x180`).
- `src/components/Navbar.tsx` não foi alterado; o header continua igual.
- Verificação:
  - `npm run build` passou.
  - `dist/favicon.ico`, `dist/favicon.svg` e `dist/apple-touch-icon.png` gerados.
  - HTTP 200 para `/`, `/favicon.ico`, `/favicon.svg` e `/apple-touch-icon.png`.
  - `src/data/skills.json` e `src/data/contributions.json` restaurados após o build.
- Motivo: corrigir favicon ausente e alinhar a identidade visual da aba/dispositivo ao logo do header.
