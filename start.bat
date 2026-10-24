@echo off
TITLE Start Site Curriculo (Windows)
echo Starting Site Curriculo...
if not exist node_modules (
  echo Installing dependencies...
  npm install
)
npm run dev
pause
