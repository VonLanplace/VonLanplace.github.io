# AI Change Log - 2026-10-25

## 05. Hover, textos, Sobre e README
- `About.tsx`, `Experience.tsx`, `Skills.tsx` e `shared/RepoCard.tsx`: removidos `hover:shadow-md`, `hover:shadow-lg` e `hover:shadow-xl` de elementos não clicáveis; mantidos borda/realce de hover.
- `Contact.tsx` não foi alterado; os cards de contato continuam com sombra por serem links clicáveis.
- `src/data/i18n/pt.json` e `en.json`:
  - hero alterado de “Java Júnior Dev”/“Java Junior Dev” para “Júnior Dev”/“Junior Dev”;
  - About reescrito para destacar backend com Java, Rust e SQL, OOP, Clean Code e arquitetura limpa;
  - card “Java Júnior Dev” renomeado para “Júnior Dev” e descrição atualizada para os ecossistemas Java, Rust e SQL;
  - conteúdo Linux & FOSS ampliado: uso de várias distribuições, resolução de problemas/bugs da plataforma e uso extensivo de FOSS.
- `README.md`: removido badge da licença ISC e seção “License”; `package.json` mantém `"license": "ISC"`.
- QA:
  - `npm run typecheck` passou;
  - `npm run build` passou;
  - screenshots desktop/mobile revisados;
  - `src/data/skills.json` e `src/data/contributions.json` restaurados após o build.
- Observação: nenhum arquivo físico `about.md` existe; o texto do Sobre é renderizado a partir dos JSONs de i18n.
