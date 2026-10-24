import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GitHubRepo } from '../types';
import { fetchUserRepos } from '../services/github';
import { GitBranch, Star, ExternalLink, RefreshCw, FolderGit2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    setCurrentIndex(0);
    try {
      const data = await fetchUserRepos();
      setRepos(data);
    } catch (err: any) {
      setError(err.message || t.projects.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(totalPages - 1); // Loop to end
    }
  };

  // Touch & Mouse Drag / Swipe Handling
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
    touchCurrentX.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchCurrentX.current = clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = touchStartX.current - touchCurrentX.current;
    const threshold = 40;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="projects" className="py-28 bg-[var(--ef-bg)] relative overflow-hidden border-t border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ef-text)] mb-3">
              {t.projects.title}
            </h2>
            <p className="text-[var(--ef-muted)] text-base max-w-xl">
              {t.projects.subtitle}
            </p>
          </div>

          <div>
            <button
              onClick={loadRepos}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] border border-[var(--ef-border)] text-[var(--ef-text)] text-sm font-medium transition-all disabled:opacity-50 shadow-sm"
              title="Refresh Repositories"
            >
              <RefreshCw className={`w-4 h-4 text-[var(--ef-accent)] ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-8 rounded-3xl animate-pulse h-64 flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-[var(--ef-border)] rounded w-2/3 mb-4" />
                  <div className="h-4 bg-[var(--ef-border)] rounded w-full mb-2" />
                  <div className="h-4 bg-[var(--ef-border)] rounded w-4/5" />
                </div>
                <div className="h-8 bg-[var(--ef-border)] rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-950/30 border border-red-900/50 p-8 rounded-3xl text-center backdrop-blur-md mx-4">
            <p className="text-red-400 mb-4 font-medium">{error}</p>
            <button
              onClick={loadRepos}
              className="px-6 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-white font-medium transition-all shadow-lg"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-20 bg-[var(--ef-surface)] border border-[var(--ef-border)] rounded-3xl backdrop-blur-md mx-4">
            <FolderGit2 className="w-14 h-14 text-[var(--ef-muted)] mx-auto mb-4" />
            <p className="text-[var(--ef-muted)] text-lg">{t.projects.noRepos}</p>
          </div>
        )}

        {/* Carousel */}
        {!loading && !error && repos.length > 0 && (
          <div className="relative flex items-center px-6 sm:px-14 lg:px-16">
            {/* Left Arrow */}
            {totalPages > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 z-30 p-3 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-accent)] hover:text-[var(--ef-bg)] text-[var(--ef-text)] border border-[var(--ef-border)] shadow-xl transition-all hover:scale-110 active:scale-95 hidden sm:block"
                title="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Carousel Track */}
            <div
              className="w-full overflow-hidden touch-pan-y py-4 cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              <div
                className={`flex transition-transform ${isDragging ? 'duration-0' : 'duration-500 ease-out'}`}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const pageRepos = repos.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);
                  return (
                    <div
                      key={pageIdx}
                      className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
                    >
                      {pageRepos.map((repo) => {
                        const isExpanded = expandedIds.includes(repo.id);
                        const hasLongDesc = repo.description && repo.description.length > 100;

                        return (
                          <div
                            key={repo.id}
                            className="bg-[var(--ef-surface)] border border-[var(--ef-border)] rounded-3xl p-7 flex flex-col justify-between hover:border-[var(--ef-accent)] shadow-sm hover:shadow-xl transition-all duration-300 group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-[var(--ef-text)] group-hover:text-[var(--ef-accent)] transition-colors truncate pr-2">
                                  {repo.name}
                                </h3>
                                <a
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] p-2.5 rounded-2xl bg-[var(--ef-bg)] hover:bg-[var(--ef-surface-hover)] transition-all border border-[var(--ef-border)] flex-shrink-0 shadow-sm"
                                  title={t.projects.viewRepo}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>

                              <div className="mb-6">
                                <p className={`text-[var(--ef-muted)] text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                                  {repo.description || ''}
                                </p>
                                {hasLongDesc && (
                                  <button
                                    onClick={() => toggleExpand(repo.id)}
                                    className="mt-2 text-xs font-semibold text-[var(--ef-accent)] hover:opacity-80 inline-flex items-center space-x-1 transition-colors"
                                  >
                                    <span>{isExpanded ? 'Menos' : 'Mais'}</span>
                                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                  </button>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-1.5 mb-6">
                                {repo.language && (
                                  <span className="px-3 py-1 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)] text-xs font-semibold border border-[var(--ef-accent)]/20">
                                    {repo.language}
                                  </span>
                                )}
                                {repo.topics && repo.topics.slice(0, 3).map((topic, i) => (
                                  <span key={i} className="px-2.5 py-1 rounded-xl bg-[var(--ef-bg)] text-[var(--ef-muted)] text-xs font-medium border border-[var(--ef-border)]">
                                    {topic}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-[var(--ef-border)] text-xs text-[var(--ef-muted)] font-medium">
                                <div className="flex items-center space-x-4">
                                  <span className="flex items-center space-x-1" title={t.projects.stars}>
                                    <Star className="w-4 h-4 text-amber-500" />
                                    <span>{repo.stargazers_count}</span>
                                  </span>
                                  <span className="flex items-center space-x-1" title={t.projects.forks}>
                                    <GitBranch className="w-4 h-4 text-[var(--ef-accent)]" />
                                    <span>{repo.forks_count}</span>
                                  </span>
                                </div>

                                <span>
                                  {new Date(repo.updated_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            {totalPages > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 z-30 p-3 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-accent)] hover:text-[var(--ef-bg)] text-[var(--ef-text)] border border-[var(--ef-border)] shadow-xl transition-all hover:scale-110 active:scale-95 hidden sm:block"
                title="Próxima"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${currentIndex === idx ? 'w-8 bg-[var(--ef-accent)] shadow-md' : 'w-2.5 bg-[var(--ef-border)] hover:bg-[var(--ef-muted)]'}`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
