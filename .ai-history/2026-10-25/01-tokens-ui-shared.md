# AI Change Log - 2026-10-25

## 01. Tokens Everforest e Tailwind
- `src/index.css`: adicionadas triplas RGB (`--ef-*-rgb`) para todos os tokens e variáveis derivadas; mantida compatibilidade com `var(--ef-*)`.
- `src/index.css`: adicionado utilitário `.no-scrollbar` e `::selection` com a paleta.
- `tailwind.config.js`: paleta plana `ef` com suporte a alpha (`rgb(var(--ef-*-rgb) / <alpha-value>)`).
- `tailwind.config.js`: plugin `tailwindcss-animate` registrado.
- Motivo: corrigir classes `bg-ef-*/xx` que antes não geravam CSS.

## 02. UI kit
- `src/lib/utils.ts`: `cn()` com `clsx` + `tailwind-merge`.
- `src/components/ui/button.tsx`: variantes e `buttonVariants`, sem `asChild`.
- `src/components/ui/card.tsx`: card glass com tokens `ef`.
- `src/components/ui/badge.tsx`: variantes `default | outline | tech | muted`.
- `src/components/ui/tabs.tsx`: Radix Tabs com estilos `ef`.
- `src/components/ui/dialog.tsx`: Radix Dialog com animações e scroll mobile.
- `src/components/ui/tooltip.tsx`: Radix Tooltip encapsulado com Provider.

## 03. Compartilhados
- `src/components/shared/SectionHeader.tsx`: cabeçalho padrão das seções.
- `src/components/shared/RepoCard.tsx`: card de repositório reutilizável.
- `src/hooks/useCarousel.ts`: carrossel com swipe/drag e guarda para elementos interativos.

## 04. i18n
- `src/data/i18n/pt.json` e `en.json`: novas chaves de hero/terminal, seções, projetos, contribuições e contato.
