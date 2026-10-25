import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'site-curriculo-build',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

const CATEGORY_MAP = {
  backend: ['Java', 'TypeScript', 'JavaScript', 'Python', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby'],
  databases: ['Microsoft SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Oracle'],
  frontend: ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'Tailwind', 'Next.js', 'Bootstrap'],
  devops: ['Linux', 'Docker', 'Git', 'GitHub Actions', 'Kubernetes', 'CI/CD', 'AWS', 'Azure']
};

function classifySkill(skill) {
  const lower = skill.toLowerCase();
  for (const [cat, items] of Object.entries(CATEGORY_MAP)) {
    if (items.some(i => i.toLowerCase() === lower || lower.includes(i.toLowerCase()))) {
      return cat;
    }
  }
  return 'other';
}

async function extractSkills() {
  console.log('Fetching repositories for VonLanplace...');
  try {
    const response = await fetch(
      'https://api.github.com/users/VonLanplace/repos?per_page=100',
      { headers: GITHUB_HEADERS }
    );
    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }
    const repos = await response.json();

    const backend = new Set(['Java', 'TypeScript', 'JavaScript', 'Python']);
    const databases = new Set(['Microsoft SQL Server', 'MySQL']);
    const frontend = new Set(['React', 'Tailwind CSS', 'HTML5', 'CSS3']);
    const devops = new Set(['Linux', 'Docker', 'Git', 'GitHub Actions']);
    const other = new Set();

    repos.forEach((repo) => {
      if (repo.language) {
        const cat = classifySkill(repo.language);
        if (cat === 'backend') backend.add(repo.language);
        else if (cat === 'databases') databases.add(repo.language);
        else if (cat === 'frontend') frontend.add(repo.language);
        else if (cat === 'devops') devops.add(repo.language);
        else other.add(repo.language);
      }
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic) => {
          const formatted = topic.charAt(0).toUpperCase() + topic.slice(1);
          const cat = classifySkill(formatted);
          if (cat === 'backend') backend.add(formatted);
          else if (cat === 'databases') databases.add(formatted);
          else if (cat === 'frontend') frontend.add(formatted);
          else if (cat === 'devops') devops.add(formatted);
          else other.add(formatted);
        });
      }
    });

    const categories = [
      { id: 'backend', name: 'Linguagens & Backend', items: Array.from(backend) },
      { id: 'databases', name: 'Banco de Dados', items: Array.from(databases) },
      { id: 'frontend', name: 'Frontend & Web', items: Array.from(frontend) },
      { id: 'devops', name: 'Infraestrutura & DevOps', items: Array.from(devops) }
    ];

    if (other.size > 0) {
      categories.push({ id: 'other', name: 'Outros Tópicos', items: Array.from(other) });
    }

    const skillsData = {
      categories,
      updatedAt: new Date().toISOString()
    };

    const outputPath = path.join(__dirname, '../src/data/skills.json');
    fs.writeFileSync(outputPath, JSON.stringify(skillsData, null, 2), 'utf-8');
    console.log('Successfully updated src/data/skills.json with categorized skills!');
  } catch (error) {
    console.warn(
      'Failed to extract skills; keeping committed data:',
      error instanceof Error ? error.message : error
    );
  }
}

extractSkills();
