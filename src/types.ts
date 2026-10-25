export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface GitHubUser {
  name: string | null;
  bio: string | null;
  blog: string | null;
  avatar_url: string;
  html_url: string;
  twitter_username: string | null;
  email: string | null;
}

export interface GitHubSocialAccount {
  provider: string;
  url: string;
}

export type CertificateKind = 'pdf' | 'image';

export interface CertificateFile {
  id: string;
  name: string;
  title: string;
  path: string;
  extension: string;
  kind: CertificateKind;
  rawUrl: string;
  sourceUrl: string;
  previewUrl?: string;
  committedAt?: string;
}

export type Language = 'pt' | 'en';
