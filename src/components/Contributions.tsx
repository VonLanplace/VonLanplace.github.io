import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  GitBranch,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCarousel } from '../hooks/useCarousel';
import type { GitHubRepo } from '../types';
import contributionsData from '../data/contributions.json';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { SectionHeader } from './shared/SectionHeader';
import { CarouselPagination } from './shared/CarouselPagination';
import { RepoCard } from './shared/RepoCard';
import { RepoDetailsDialog } from './shared/RepoDetailsDialog';
import { cn } from '../lib/utils';

export const Contributions: React.FC = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
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

  useEffect(() => {
    if (contributionsData?.contributions) {
      setRepos(contributionsData.contributions as GitHubRepo[]);
    }
  }, []);

  const openDetails = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setDialogOpen(true);
  };

  return (
    <section
      id="contributions"
      className="relative overflow-hidden border-t border-ef-border bg-ef-surface/30 py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<GitBranch className="h-3.5 w-3.5" />}
          eyebrow={t.contributions.eyebrow}
          title={t.contributions.title}
          subtitle={t.contributions.subtitle}
        />

        {repos.length === 0 ? (
          <Card className="py-16 text-center">
            <FolderGit2 className="mx-auto mb-4 h-12 w-12 text-ef-muted" />
            <p className="text-ef-muted">{t.contributions.noRepos}</p>
          </Card>
        ) : (
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
