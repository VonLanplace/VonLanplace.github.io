import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MessageSquare, Globe, ExternalLink, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { fetchUserProfile, fetchUserSocialAccounts } from '../services/github';
import { GitHubUser, GitHubSocialAccount } from '../types';
import personal from '../data/personal.json';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [socials, setSocials] = useState<GitHubSocialAccount[]>([]);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      if (data) setProfile(data);
    });
    fetchUserSocialAccounts().then((data) => {
      if (data) setSocials(data);
    });
  }, []);

  const linkedinSocial = socials.find(s => s.provider.toLowerCase() === 'linkedin');
  const blogUrl = profile?.blog;
  const isLinkedInBlog = blogUrl && blogUrl.toLowerCase().includes('linkedin');
  
  const linkedinUrl = linkedinSocial?.url || (isLinkedInBlog ? (blogUrl!.startsWith('http') ? blogUrl! : `https://${blogUrl}`) : personal.linkedin);
  const websiteUrl = blogUrl && !isLinkedInBlog ? (blogUrl.startsWith('http') ? blogUrl : `https://${blogUrl}`) : null;
  const emailAddress = profile?.email || personal.email;
  const resumeUrl = personal.resume;

  return (
    <section id="contact" className="py-20 bg-[var(--ef-surface)]/40 border-t border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)] mb-4">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--ef-text)] mb-3">{t.contact.title}</h2>
        <p className="text-[var(--ef-muted)] max-w-xl mx-auto mb-10">{t.contact.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] transition-all shadow-sm"
          >
            <GithubIcon className="w-5 h-5 text-[var(--ef-accent)]" />
            <span className="font-medium">{t.contact.github}</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] transition-all shadow-sm"
          >
            <LinkedinIcon className="w-5 h-5 text-[var(--ef-accent)]" />
            <span className="font-medium">{t.contact.linkedin}</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] transition-all shadow-sm"
          >
            <FileText className="w-5 h-5 text-[var(--ef-accent)]" />
            <span className="font-medium">{t.contact.resume}</span>
            <ExternalLink className="w-4 h-4 text-[var(--ef-muted)]" />
          </a>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] transition-all shadow-sm"
            >
              <Globe className="w-5 h-5 text-[var(--ef-accent)]" />
              <span className="font-medium">Website / Blog</span>
              <ExternalLink className="w-4 h-4 text-[var(--ef-muted)]" />
            </a>
          )}

          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] transition-all shadow-sm"
          >
            <Mail className="w-5 h-5 text-[var(--ef-accent)]" />
            <span className="font-medium">{t.contact.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
