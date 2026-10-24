# AI Commit Record: Separate Contributed Projects Carousel & Automated Extractor

- Date: 2026-10-24
- Action: Created dedicated `Contributions.tsx` carousel component with Everforest styling, flanking arrows, touch swipe, and expandable descriptions, backed by automated extraction (`scripts/extract-contributions.js` and GitHub Actions workflow) filtering out personal repos to prevent duplication.
- Files Modified: `src/data/i18n/pt.json`, `src/data/i18n/en.json`, `src/components/Contributions.tsx`, `src/App.tsx`, `scripts/extract-contributions.js`, `package.json`, `.github/workflows/extract-contributions.yml`
