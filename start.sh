#!/usr/bin/env bash
echo "Starting Site Curriculo (Linux/macOS)..."
if [ ! -d "node_modules" ]; then
  npm install
fi
npm run dev
