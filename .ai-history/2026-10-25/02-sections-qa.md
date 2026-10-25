# AI Change Log - 2026-10-25

## 05. Seções e carrosséis
- `Navbar`: navegação desktop/mobile, ciclo de tema (auto/dark/light), troca de idioma e menu mobile animado.
- `Hero`: terminal com Tabs (terminal/stack/status), CTAs de projetos/currículo/contato e links sociais.
- `About`, `Experience`, `Skills`, `Projects`, `Contributions`, `Contact`, `Footer`: redesign com `Card`, `Badge`, `SectionHeader` e tokens `ef`.
- `Skills`: categorias em Tabs Radix, scroll horizontal com fade no mobile.
- `Projects`: fetch de repositórios, estados de loading/erro/vazio, refresh, carrossel responsivo e dialog de detalhes.
- `Contributions`: dados estáticos de `contributions.json`, carrossel e dialog compartilhado.
- `CarouselPagination`: janela de até 7 dots, contador e barra de progresso para listas grandes.
- `useCarousel`: swipe touch, drag com mouse, wrap-around e proteção para controles interativos.
- `Contact`: grid de 2 colunas no mobile, links GitHub/LinkedIn/currículo/site/e-mail.
- `src/data/i18n/pt.json` e `en.json`: textos completos PT/EN para todas as seções.
- Motivo: unificar UI, manter paleta Everforest e suportar desktop/mobile sem dependências pesadas.

## 06. QA visual e ajustes
- Screenshots headless (Firefox) em desktop/mobile, PT/EN e light/dark.
- Corrigido grid do contato (1 coluna para 2 no mobile), fade das tabs de Skills, paginação com 81 páginas e espaçamento dos carrosséis.
- Menu mobile validado aberto em viewport 390x900.
- `text-ef-accent-ink` adicionado para contraste de texto sobre `bg-ef-accent` no tema claro (botões, logo e footer).
- `src/index.css` e `tailwind.config.js` atualizados com o novo token.

## 07. Segurança e build
- `npm audit --omit=dev`: 0 vulnerabilidades.
- Checagem web: `tailwindcss-animate@1.0.7` sem CVEs conhecidas; `@radix-ui/react-{dialog,tabs,tooltip}` sem advisories diretos.
- Atenção: existem pacotes typosquat maliciosos (`tailwind-anime`, `tailwind-animate-v4`); o projeto usa somente `tailwindcss-animate`.
- `npm run typecheck` e `npm run build` executados com sucesso.
- `dist/index.html` é artefato gerado e está rastreado apesar de `dist/` no `.gitignore`; avaliar remoção do índice em commit futuro.

## 08. Cleanup
- `dist/index.html`: removido do índice Git (`git rm --cached`); arquivo local preservado. `dist/` já está no `.gitignore` e o deploy é feito pelo workflow que reconstrói o artefato.
- `src/data/skills.json` e `src/data/contributions.json`: restaurados após o build para evitar alteração de `updatedAt` no diff.
