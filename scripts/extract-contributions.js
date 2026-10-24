import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractContributions() {
  console.log('Fetching contributions for VonLanplace...');
  try {
    // Fetch public events for VonLanplace to discover participated repos
    const response = await fetch('https://api.github.com/users/VonLanplace/events/public?per_page=100');
    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }
    const events = await response.json();

    const contributedReposMap = new Map();

    events.forEach((event) => {
      if (event.repo && event.repo.name) {
        const repoName = event.repo.name; // e.g. "owner/repo"
        if (!repoName.startsWith('VonLanplace/')) {
          contributedReposMap.set(repoName, {
            id: event.repo.id || Math.abs(repoName.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)),
            name: repoName,
            description: `Contributed via ${event.type} event`,
            html_url: `https://github.com/${repoName}`,
            stargazers_count: 0,
            forks_count: 0,
            language: 'Multiple',
            topics: ['Contribution', event.type.replace('Event', '')],
            updated_at: event.created_at
          });
        }
      }
    });

    const contributionsData = {
      contributions: Array.from(contributedReposMap.values()),
      updatedAt: new Date().toISOString()
    };

    const outputPath = path.join(__dirname, '../src/data/contributions.json');
    fs.writeFileSync(outputPath, JSON.stringify(contributionsData, null, 2), 'utf-8');
    console.log('Successfully updated src/data/contributions.json!');
  } catch (error) {
    console.error('Failed to extract contributions:', error);
    process.exit(1);
  }
}

extractContributions();
