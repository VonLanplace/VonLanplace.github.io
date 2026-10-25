import React, { useEffect, useState } from 'react';
import { ExternalLink, FileText, Globe, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fetchUserProfile, fetchUserSocialAccounts } from '../services/github';
import type { GitHubSocialAccount, GitHubUser } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Badge } from './ui/badge';
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

  const linkedinSocial = socials.find(
    (social) => social.provider.toLowerCase() === 'linkedin'
  );
  const blogUrl = profile?.blog;
  const isLinkedInBlog = blogUrl?.toLowerCase().includes('linkedin');

  const linkedinUrl =
    linkedinSocial?.url ||
    (isLinkedInBlog && blogUrl
      ? blogUrl.startsWith('http')
        ? blogUrl
        : `https://${blogUrl}`
      : personal.linkedin);
  const websiteUrl =
    blogUrl && !isLinkedInBlog
      ? blogUrl.startsWith('http')
        ? blogUrl
        : `https://${blogUrl}`
      : null;
  const emailAddress = profile?.email || personal.email;

  const links = [
    {
      label: t.contact.github,
      value: '@VonLanplace',
      href: personal.github,
      icon: <GithubIcon className="h-5 w-5" />,
    },
    {
      label: t.contact.linkedin,
      value: 'in/lucas-p-m-sartorelli',
      href: linkedinUrl,
      icon: <LinkedinIcon className="h-5 w-5" />,
    },
    {
      label: t.contact.resume,
      value: 'Canva',
      href: personal.resume,
      icon: <FileText className="h-5 w-5" />,
    },
    ...(websiteUrl
      ? [
          {
            label: t.contact.website,
            value: websiteUrl.replace(/^https?:\/\//, ''),
            href: websiteUrl,
            icon: <Globe className="h-5 w-5" />,
          },
        ]
      : []),
    {
      label: t.contact.email,
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="border-t border-ef-border bg-ef-bg py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="tech" className="mb-3 px-3 py-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{t.contact.eyebrow}</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-ef-text sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-sm text-ef-muted sm:text-base">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-4 rounded-2xl border border-ef-border bg-ef-surface/80 p-5 shadow-xs transition-all hover:border-ef-accent/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent"
            >
              <span className="rounded-xl border border-ef-accent/20 bg-ef-accent/10 p-2.5 text-ef-accent-text transition-transform group-hover:scale-105">
                {link.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ef-text">{link.label}</span>
                <span className="block truncate font-mono text-xs text-ef-muted">
                  {link.value}
                </span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-ef-muted transition-colors group-hover:text-ef-accent-text" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
