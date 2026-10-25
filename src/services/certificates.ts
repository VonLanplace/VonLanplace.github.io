import type { CertificateFile } from '../types';
import toeicPreview from '../assets/certificates/toeic-2025.webp';

const REPO_OWNER = 'VonLanplace';
const REPO_NAME = 'courses-and-certificates';
const REPO_BRANCH = 'main';
const API_TREE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=1`;
const API_COMMITS_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=100`;
const API_COMMIT_URL = (sha: string) =>
  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${sha}`;
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

const CACHE_KEY = 'vonlanplace_certificates_v2';
const CACHE_TIME_KEY = 'vonlanplace_certificates_time_v2';
const CACHE_DURATION = 1000 * 60 * 30;
const MAX_COMMIT_DETAILS = 20;

const CERTIFICATE_EXTENSIONS = new Set(['pdf', 'png', 'jpg', 'jpeg', 'webp']);

const LOCAL_IMAGE_PREVIEWS: Record<string, string> = {
  'toeic/Certificado TOEIC - 2025.png': toeicPreview,
};

interface GitHubTreeEntry {
  path: string;
  type: string;
}

interface GitHubTreeResponse {
  tree: GitHubTreeEntry[];
}

interface GitHubCommitInfo {
  author?: { date?: string } | null;
  committer?: { date?: string } | null;
}

interface GitHubCommitSummary {
  sha: string;
  commit: GitHubCommitInfo;
}

interface GitHubCommitDetails extends GitHubCommitSummary {
  files?: Array<{
    filename: string;
    previous_filename?: string;
    status: string;
  }>;
}

function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}

function toTimestamp(date?: string): number {
  if (!date) return 0;
  const timestamp = Date.parse(date);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function getCommitDate(commit: GitHubCommitInfo): string | undefined {
  return commit.committer?.date ?? commit.author?.date;
}

function sortCertificates(certificates: CertificateFile[]): CertificateFile[] {
  return [...certificates].sort((a, b) => {
    const dateDiff = toTimestamp(b.committedAt) - toTimestamp(a.committedAt);
    if (dateDiff !== 0) return dateDiff;

    return a.path.localeCompare(b.path, 'pt-BR', { numeric: true });
  });
}

function toCertificate(entry: GitHubTreeEntry): CertificateFile | null {
  const extension = entry.path.split('.').pop()?.toLowerCase() ?? '';
  if (!CERTIFICATE_EXTENSIONS.has(extension)) return null;

  const name = entry.path.split('/').pop() ?? entry.path;
  const encodedPath = encodePath(entry.path);

  return {
    id: entry.path,
    name,
    title: name.replace(/\.[^.]+$/, ''),
    path: entry.path,
    extension,
    kind: extension === 'pdf' ? 'pdf' : 'image',
    rawUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${encodedPath}`,
    sourceUrl: `${REPO_URL}/blob/${REPO_BRANCH}/${encodedPath}`,
    previewUrl: LOCAL_IMAGE_PREVIEWS[entry.path],
  };
}

function hydrateCertificate(certificate: CertificateFile): CertificateFile {
  const encodedPath = encodePath(certificate.path);
  return {
    ...certificate,
    rawUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${encodedPath}`,
    sourceUrl: `${REPO_URL}/blob/${REPO_BRANCH}/${encodedPath}`,
    previewUrl: LOCAL_IMAGE_PREVIEWS[certificate.path],
  };
}

async function fetchCommitList(): Promise<GitHubCommitSummary[]> {
  const response = await fetch(API_COMMITS_URL);

  if (!response.ok) {
    throw new Error(`GitHub commits API error: ${response.statusText}`);
  }

  const commits: GitHubCommitSummary[] = await response.json();
  if (!Array.isArray(commits)) {
    throw new Error('Invalid GitHub commits response.');
  }

  return commits;
}

async function resolveCommitDates(
  commits: GitHubCommitSummary[],
  paths: Set<string>
): Promise<Map<string, string>> {
  const dates = new Map<string, string>();
  if (paths.size === 0) return dates;

  const newestFirst = [...commits].sort(
    (a, b) => toTimestamp(getCommitDate(b.commit)) - toTimestamp(getCommitDate(a.commit))
  );

  let detailsFetched = 0;

  for (const commit of newestFirst) {
    if (dates.size === paths.size || detailsFetched >= MAX_COMMIT_DETAILS) break;

    detailsFetched += 1;
    const response = await fetch(API_COMMIT_URL(commit.sha));

    if (response.status === 403) {
      console.warn('GitHub API rate limit reached while resolving certificate dates.');
      break;
    }

    if (!response.ok) continue;

    const details: GitHubCommitDetails = await response.json();
    const date = getCommitDate(details.commit) ?? getCommitDate(commit.commit);
    if (!date) continue;

    for (const file of details.files ?? []) {
      if (paths.has(file.filename) && !dates.has(file.filename)) {
        dates.set(file.filename, date);
      }
    }
  }

  return dates;
}

export function getCertificatesRepositoryUrl(): string {
  return REPO_URL;
}

export async function fetchCertificates(): Promise<CertificateFile[]> {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedData && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION) {
        return sortCertificates(
          (JSON.parse(cachedData) as CertificateFile[]).map(hydrateCertificate)
        );
      }
    }

    const [treeResult, commitsResult] = await Promise.allSettled([
      fetch(API_TREE_URL),
      fetchCommitList(),
    ]);

    if (treeResult.status === 'rejected') {
      throw treeResult.reason;
    }

    const response = treeResult.value;

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: GitHubTreeResponse = await response.json();
    const certificates = data.tree
      .filter((entry) => entry.type === 'blob')
      .map(toCertificate)
      .filter((certificate): certificate is CertificateFile => certificate !== null);

    if (commitsResult.status === 'fulfilled') {
      try {
        const dates = await resolveCommitDates(
          commitsResult.value,
          new Set(certificates.map((certificate) => certificate.path))
        );

        for (const certificate of certificates) {
          certificate.committedAt = dates.get(certificate.path);
        }

        if (dates.size < certificates.length) {
          console.warn(
            `Could not resolve commit dates for ${certificates.length - dates.size} certificate(s).`
          );
        }
      } catch (error) {
        console.warn('Could not resolve certificate commit dates:', error);
      }
    } else {
      console.warn('Could not fetch certificate commit history:', commitsResult.reason);
    }

    const sortedCertificates = sortCertificates(certificates);

    localStorage.setItem(CACHE_KEY, JSON.stringify(sortedCertificates));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return sortedCertificates;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return sortCertificates(
        (JSON.parse(cachedData) as CertificateFile[]).map(hydrateCertificate)
      );
    }
    throw error;
  }
}
