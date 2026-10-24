import { GitHubRepo, GitHubUser, GitHubSocialAccount } from '../types';

const CACHE_KEY = 'vonlanplace_github_repos';
const CACHE_TIME_KEY = 'vonlanplace_github_repos_time';
const USER_CACHE_KEY = 'vonlanplace_github_user';
const USER_CACHE_TIME_KEY = 'vonlanplace_github_user_time';
const SOCIAL_CACHE_KEY = 'vonlanplace_github_socials';
const SOCIAL_CACHE_TIME_KEY = 'vonlanplace_github_socials_time';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cachedData && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION) {
        const parsed: GitHubRepo[] = JSON.parse(cachedData);
        // Ensure strict deduplication by ID
        return Array.from(new Map(parsed.map(r => [r.id, r])).values());
      }
    }

    const response = await fetch('https://api.github.com/users/VonLanplace/repos?sort=updated&per_page=100');
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const rawRepos: GitHubRepo[] = await response.json();
    
    // Strict deduplication by repo ID to prevent multiplication
    const uniqueReposMap = new Map<number, GitHubRepo>();
    rawRepos.forEach(repo => {
      uniqueReposMap.set(repo.id, repo);
    });
    const repos = Array.from(uniqueReposMap.values());
    
    // Sort strictly: repos with non-empty description first, repos without description at the end
    repos.sort((a, b) => {
      const hasDescA = Boolean(a.description && a.description.trim() !== '');
      const hasDescB = Boolean(b.description && b.description.trim() !== '');
      if (hasDescA && !hasDescB) return -1;
      if (!hasDescA && hasDescB) return 1;
      return 0;
    });
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed: GitHubRepo[] = JSON.parse(cachedData);
      return Array.from(new Map(parsed.map(r => [r.id, r])).values());
    }
    throw error;
  }
}

export async function fetchUserProfile(): Promise<GitHubUser | null> {
  try {
    const cachedData = localStorage.getItem(USER_CACHE_KEY);
    const cachedTime = localStorage.getItem(USER_CACHE_TIME_KEY);
    
    if (cachedData && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const response = await fetch('https://api.github.com/users/VonLanplace');
    if (!response.ok) {
      return null;
    }

    const user: GitHubUser = await response.json();
    
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
    localStorage.setItem(USER_CACHE_TIME_KEY, Date.now().toString());

    return user;
  } catch (error) {
    console.error('Error fetching GitHub user profile:', error);
    const cachedData = localStorage.getItem(USER_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  }
}

export async function fetchUserSocialAccounts(): Promise<GitHubSocialAccount[]> {
  try {
    const cachedData = localStorage.getItem(SOCIAL_CACHE_KEY);
    const cachedTime = localStorage.getItem(SOCIAL_CACHE_TIME_KEY);
    
    if (cachedData && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const response = await fetch('https://api.github.com/users/VonLanplace/social_accounts');
    if (!response.ok) {
      return [];
    }

    const socials: GitHubSocialAccount[] = await response.json();
    
    localStorage.setItem(SOCIAL_CACHE_KEY, JSON.stringify(socials));
    localStorage.setItem(SOCIAL_CACHE_TIME_KEY, Date.now().toString());

    return socials;
  } catch (error) {
    console.error('Error fetching GitHub social accounts:', error);
    const cachedData = localStorage.getItem(SOCIAL_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return [];
  }
}
