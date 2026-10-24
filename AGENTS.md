# AGENTS.md

## Overview
- Project: Curriculum / Portfolio website (`siteCuriculo`).
- Owner: **VonLanplace** (GitHub: `VonLanplace`).
- Hosting: GitHub Pages ([https://VonLanplace.github.io](https://VonLanplace.github.io)).
- Tech Stack: TypeScript, JSON-driven data storage (resume, profile, and multi-language i18n).

## Architecture & Data
- Resume & i18n Data: Stored in local JSON files supporting multi-language rendering.
- GitHub Integration: Dynamically fetches public repositories for user `VonLanplace` (`https://api.github.com/users/VonLanplace/repos`) into project panels/cards.
- Deployment: Optimized for static hosting on GitHub Pages.

## AI Workflow & Policies
- Commit Record Policy: Maintain a detailed record of every AI-made commit and file change inside a date-based subdirectory within `.ai-history/` (e.g., `.ai-history/YYYY-MM-DD/`) for future AI context and tracking. Every file change must be immediately followed by a commit record in `.ai-history/YYYY-MM-DD/`.
- Package Security Policy: Check the web for CVEs or security warnings related to every external package added to the project.
- Code Quality & Design: Write strict TypeScript, maintain responsive modular UI components, ensure full mobile compatibility with touch-friendly controls, and handle GitHub API errors/rate limits gracefully.
