import React from 'react';
import { ExternalLink, FolderGit2, GitBranch, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { GitHubRepo } from '../../types';
import { Badge } from '../ui/badge';
import { Button, buttonVariants } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface RepoDetailsDialogProps {
  repo: GitHubRepo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RepoDetailsDialog: React.FC<RepoDetailsDialogProps> = ({
  repo,
  open,
  onOpenChange,
}) => {
  const { t, language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {repo && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-ef-accent" />
              <span className="truncate">{repo.name}</span>
            </DialogTitle>
            <DialogDescription className="font-mono">
              {t.projects.inspectSubtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-2xl border border-ef-border bg-ef-bg p-4">
              <p className="text-sm leading-relaxed text-ef-text">
                {repo.description?.trim() || t.projects.noDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {repo.language && <Badge variant="default">{repo.language}</Badge>}
              {repo.topics?.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs text-ef-muted">
              <div className="flex items-center justify-between rounded-xl border border-ef-border bg-ef-bg p-3">
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-ef-yellow" />
                  {t.projects.stars}
                </span>
                <span className="font-bold text-ef-text">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-ef-border bg-ef-bg p-3">
                <span className="flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5 text-ef-accent" />
                  {t.projects.forks}
                </span>
                <span className="font-bold text-ef-text">{repo.forks_count}</span>
              </div>
            </div>

            <p className="font-mono text-xs text-ef-muted">
              {new Date(repo.updated_at).toLocaleDateString(
                language === 'pt' ? 'pt-BR' : 'en-US'
              )}
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t.projects.close}
            </Button>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'default' })}
            >
              <span>{t.projects.openGithub}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
