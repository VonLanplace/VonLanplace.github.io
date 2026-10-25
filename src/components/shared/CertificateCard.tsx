import type { CertificateFile } from '../../types';
import { PdfPreview } from './PdfPreview';

interface CertificateCardProps {
  certificate: CertificateFile;
  openLabel: string;
  previewError: string;
}

export function CertificateCard({
  certificate,
  openLabel,
  previewError,
}: CertificateCardProps) {
  return (
    <div className="relative rounded-3xl border border-ef-border bg-ef-surface/80 p-2.5 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-ef-accent/50 hover:shadow-xl">
      <div className="relative aspect-[1.414/1] overflow-hidden rounded-2xl border border-ef-border/60 bg-ef-bg">
        {certificate.kind === 'pdf' ? (
          <PdfPreview
            url={certificate.rawUrl}
            title={certificate.title}
            errorLabel={previewError}
          />
        ) : (
          <img
            src={certificate.previewUrl ?? certificate.rawUrl}
            alt={certificate.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <a
        href={certificate.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${openLabel}: ${certificate.title}`}
        title={certificate.title}
        data-carousel-swipe="true"
        className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent"
      />
    </div>
  );
}
