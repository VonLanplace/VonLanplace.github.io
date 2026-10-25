import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  Star,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { GitHubRepo } from '../../types';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button, buttonVariants } from '../ui/button';
import { Card } from '../ui/card';
import { Tooltip } from '../ui/tooltip';

interface RepoCardProps {
  repo: GitHubRepo;
  onDetails?: (repo: GitHubRepo) => void;
  className?: string;
}

export function RepoCard({ repo, onDetails, className }: RepoCardProps) {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const description = repo.description?.trim() ?? '';
  const hasLongDescription = description.length > 110;
  const locale = language === 'pt' ? 'pt-BR' : 'en-US';

  return (
    <Card
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden p-6 hover:border-ef-accent/50 hover:shadow-xl',
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-ef-accent/10 blur-2xl transition-colors group-hover:bg-ef-accent/20" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-bold text-ef-text transition-colors group-hover:text-ef-accent">
            {repo.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5">
            {onDetails && (
              <Tooltip content={t.projects.details}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={t.projects.details}
                  onClick={() => onDetails(repo)}
                >
                  <BookOpen className="h-4 w-4 text-ef-accent" />
                </Button>
              </Tooltip>
            )}
            <Tooltip content={t.projects.viewRepo}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.projects.viewRepo}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'icon',
                  className: 'h-9 w-9',
                })}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Tooltip>
          </div>
        </div>

        <div className="mb-5">
          <p
            className={cn(
              'text-sm leading-relaxed text-ef-muted',
              !expanded && 'line-clamp-3'
            )}
          >
            {description || t.projects.noDescription}
          </p>
          {hasLongDescription && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ef-accent transition-opacity hover:opacity-80"
            >
              <span>{expanded ? t.common.less : t.common.more}</span>
              {expanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex flex-wrap gap-1.5">
          {repo.language && <Badge variant="default">{repo.language}</Badge>}
          {repo.topics?.slice(0, 2).map((topic) => (
            <Badge key={topic} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ef-border pt-4 text-xs font-medium text-ef-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1" title={t.projects.stars}>
              <Star className="h-4 w-4 text-ef-yellow" />
              <span>{repo.stargazers_count}</span>
            </span>
            <span className="flex items-center gap-1" title={t.projects.forks}>
              <GitBranch className="h-4 w-4 text-ef-accent" />
              <span>{repo.forks_count}</span>
            </span>
          </div>
          <span>{new Date(repo.updated_at).toLocaleDateString(locale)}</span>
        </div>
      </div>
    </Card>
  );
}
