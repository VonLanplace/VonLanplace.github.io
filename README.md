# Curriculum & Portfolio Website (`site-curriculo`)

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://VonLanplace.github.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)

An interactive, modular, JSON-driven multi-language portfolio and resume website built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Multi-Language Support**: Seamless localization between English (`en`) and Portuguese (`pt`) via static JSON i18n stores.
- **Dynamic GitHub Integration**: Fetches public repositories and contributions live for `VonLanplace` via the GitHub REST API.
- **Responsive & Touch-Friendly**: Fully optimized for mobile and desktop screens with swipe/touch support for project and contribution carousels.
- **Theme Customization**: Light/dark mode switching and custom aesthetic themes.
- **Modular Component Architecture**: Built with clean, reusable components (`Hero`, `About`, `Experience`, `Skills`, `Projects`, `Contributions`, `Contact`).

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & PostCSS
- **Icons**: Lucide React
- **Hosting**: GitHub Pages ([https://VonLanplace.github.io](https://VonLanplace.github.io))

## 📁 Project Structure

```text
├── src/
│   ├── components/       # UI components (Navbar, Hero, Projects, Skills, etc.)
│   ├── context/          # React context providers (ThemeContext, LanguageContext)
│   ├── data/             # JSON data files (personal profile, skills, i18n localizations)
│   ├── services/         # API services (GitHub integration)
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main application root
│   └── main.tsx          # Application entry point
├── scripts/              # Build and data extraction scripts
├── public/               # Static assets
└── package.json          # Project dependencies and build scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VonLanplace/siteCuriculo.git
   cd siteCuriculo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```

### Building for Production

Build the project (includes data extraction and TypeScript compilation):
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```
