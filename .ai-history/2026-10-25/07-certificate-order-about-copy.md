# AI Change Log - 2026-10-25

## 07. Ordenação de certificados e textos do Sobre
- Certificados agora ordenados pela data do último commit, mais recentes primeiro.
- `src/types.ts`: adicionado `committedAt?: string` em `CertificateFile`.
- `src/services/certificates.ts`:
  - árvore e lista de commits (`/commits?per_page=100`) buscadas em paralelo;
  - detalhes dos commits consultados do mais novo ao mais antigo até mapear todos os certificados;
  - data usada: `commit.committer.date`, fallback `commit.author.date`;
  - limite de 20 detalhes de commit por atualização;
  - empate resolvido por caminho do arquivo;
  - falha na API de commits mantém a seção funcional e usa ordem alfabética;
  - cache atualizado para `vonlanplace_certificates_v2` / `vonlanplace_certificates_time_v2`;
  - URLs raw/blob e preview local continuam regenerados ao ler o cache.
- Ordem mapeada no repositório real:
  1. `Lucas ... - ESW.pdf` e `Lucas ... - LP.pdf` — `2026-08-27T18:28:40Z`;
  2. `toeic/Certificado TOEIC - 2025.png` — `2026-01-23T18:58:35Z`;
  3. seis PDFs da DIO — `2026-01-23T18:52:07Z`, ordenados por caminho.
- Textos PT/EN do Sobre:
  - parágrafo principal destaca início de carreira, Java/Rust/SQL, UML e metodologias ágeis;
  - card “Júnior Dev” ampliado para início de carreira e evolução prática;
  - card “Clean Code & OOP” ampliado com modelagem UML e entrega em ciclos ágeis.
- `src/components/About.tsx`: descrições dos cards com `mt-1` e `leading-relaxed`.
- QA:
  - ordem validada com fixture dos commits reais: ESW, LP, TOEIC, DIO;
  - cache v2 recarregou sem novas chamadas à API;
  - fallback com erro 403 na API de commits manteve ordem alfabética;
  - PT e EN revisados em desktop/mobile, sem overflow horizontal;
  - `npm run typecheck` passou;
  - `npm run build` passou;
  - `npm audit`: 0 vulnerabilidades;
  - `src/data/skills.json` e `src/data/contributions.json` restaurados após o build.
