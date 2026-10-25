# AI Change Log - 2026-10-25

## 00. Rollback da tentativa parcial
- Restaurados `src/`, `package.json` e `package-lock.json` para o HEAD.
- Removidos `src/components/ui/` e `src/lib/` da tentativa anterior.
- Logs de `2026-10-24/` mantidos como histórico da tentativa superada.
- `node_modules/` removido do índice Git (`git rm -r --cached node_modules`); working tree preservado.
- Motivo: implementação anterior interrompida com build quebrado e classes Tailwind inválidas.
