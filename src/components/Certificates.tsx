import React, { useEffect, useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCarousel } from '../hooks/useCarousel';
import {
  fetchCertificates,
  getCertificatesRepositoryUrl,
} from '../services/certificates';
import type { CertificateFile } from '../types';
import { Button, buttonVariants } from './ui/button';
import { Card } from './ui/card';
import { SectionHeader } from './shared/SectionHeader';
import { CarouselPagination } from './shared/CarouselPagination';
import { CertificateCard } from './shared/CertificateCard';
import { cn } from '../lib/utils';

export const Certificates: React.FC = () => {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState<CertificateFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

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
  } = useCarousel(certificates.length, itemsPerPage);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCertificates();
      setCertificates(data);
    } catch {
      setError(t.certificates.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden border-t border-ef-border bg-ef-bg py-24 transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--ef-accent)_0%,transparent_45%)] opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<Award className="h-3.5 w-3.5" />}
          eyebrow={t.certificates.eyebrow}
          title={t.certificates.title}
          subtitle={t.certificates.subtitle}
          action={
            <a
              href={getCertificatesRepositoryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline' })}
            >
              <ExternalLink className="h-4 w-4 text-ef-accent-text" />
              <span>{t.certificates.viewRepository}</span>
            </a>
          }
        />

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-live="polite">
            <span className="sr-only">{t.certificates.loading}</span>
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="aspect-[1.414/1] animate-pulse border-ef-border bg-ef-surface motion-reduce:animate-none"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <Card
            className="border-ef-red/30 bg-ef-red/10 p-8 text-center"
            role="alert"
          >
            <p className="mb-4 font-medium text-ef-red">{error}</p>
            <Button variant="outline" onClick={loadCertificates}>
              <FileText className="h-4 w-4" />
              <span>{t.certificates.retry}</span>
            </Button>
          </Card>
        )}

        {!loading && !error && certificates.length === 0 && (
          <Card className="py-16 text-center">
            <Award className="mx-auto mb-4 h-12 w-12 text-ef-muted" />
            <p className="text-ef-muted">{t.certificates.empty}</p>
          </Card>
        )}

        {!loading && !error && certificates.length > 0 && (
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
                    const pageCertificates = certificates.slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    );

                    return (
                      <div
                        key={pageIndex}
                        className="grid w-full shrink-0 grid-cols-1 gap-6 px-1 md:grid-cols-3"
                      >
                        {pageCertificates.map((certificate) => (
                          <CertificateCard
                            key={certificate.id}
                            certificate={certificate}
                            openLabel={t.certificates.openOriginal}
                            previewError={t.certificates.previewError}
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
    </section>
  );
};
