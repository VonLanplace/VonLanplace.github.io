import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  FolderGit2,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCarousel } from '../hooks/useCarousel';
import { fetchUserRepos } from '../services/github';
import type { GitHubRepo } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { SectionHeader } from './shared/SectionHeader';
import { CarouselPagination } from './shared/CarouselPagination';
import { RepoCard } from './shared/RepoCard';
import { RepoDetailsDialog } from './shared/RepoDetailsDialog';
import { cn } from '../lib/utils';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const itemsPerPage = isMobile ? 1 : 3;
  const {
    currentIndex,
    totalPages,
    dragOffset,
    isDragging,
    next,
    prev,
    goTo,
    containerProps,
  } = useCarousel(repos.length, itemsPerPage);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserRepos();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.projects.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const openDetails = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setDialogOpen(true);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-ef-border bg-ef-bg py-24 transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--ef-accent)_0%,transparent_50%)] opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<Code2 className="h-3.5 w-3.5" />}
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          action={
            <Button variant="outline" onClick={loadRepos} disabled={loading}>
              <RefreshCw
                className={cn('h-4 w-4 text-ef-accent', loading && 'animate-spin motion-reduce:animate-none')}
              />
              <span>{t.projects.refresh}</span>
            </Button>
          }
        />

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-live="polite">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="flex h-64 animate-pulse flex-col justify-between p-6 motion-reduce:animate-none">
                <div>
                  <div className="mb-4 h-5 w-2/3 rounded bg-ef-border" />
                  <div className="mb-2 h-4 w-full rounded bg-ef-border" />
                  <div className="h-4 w-4/5 rounded bg-ef-border" />
                </div>
                <div className="h-8 w-1/3 rounded bg-ef-border" />
              </Card>
            ))}
          </div>
        )}

        {!loading && error && (
          <Card
            className="border-ef-red/30 bg-ef-red/10 p-8 text-center"
            role="alert"
          >
            <p className="mb-4 font-medium text-ef-red">{error}</p>
            <Button variant="outline" onClick={loadRepos}>
              <RefreshCw className="h-4 w-4" />
              <span>{t.projects.retry}</span>
            </Button>
          </Card>
        )}

        {!loading && !error && repos.length === 0 && (
          <Card className="py-16 text-center">
            <FolderGit2 className="mx-auto mb-4 h-12 w-12 text-ef-muted" />
            <p className="text-ef-muted">{t.projects.noRepos}</p>
          </Card>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <div className="relative flex items-center sm:px-12">
              {totalPages > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  aria-label="Previous page"
                  className="absolute left-0 z-20 hidden h-11 w-11 shadow-lg sm:inline-flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}

              <div
                className="w-full cursor-grab touch-pan-y overflow-hidden py-3 active:cursor-grabbing"
                {...containerProps}
                onDragStart={(event) => event.preventDefault()}
              >
                <div
                  className={cn(
                    'flex',
                    isDragging ? 'duration-0' : 'duration-500 ease-out'
                  )}
                  style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                  }}
                >
                  {Array.from({ length: totalPages }).map((_, pageIndex) => {
                    const pageRepos = repos.slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    );

                    return (
                      <div
                        key={pageIndex}
                        className="grid w-full shrink-0 grid-cols-1 gap-6 px-1 md:grid-cols-3"
                      >
                        {pageRepos.map((repo) => (
                          <RepoCard
                            key={repo.id}
                            repo={repo}
                            onDetails={openDetails}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {totalPages > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  aria-label="Next page"
                  className="absolute right-0 z-20 hidden h-11 w-11 shadow-lg sm:inline-flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>

            <CarouselPagination
              currentIndex={currentIndex}
              totalPages={totalPages}
              onSelect={goTo}
            />
          </>
        )}
      </div>

      <RepoDetailsDialog
        repo={selectedRepo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
};
