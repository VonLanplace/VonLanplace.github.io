import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

interface PdfPreviewProps {
  url: string;
  title: string;
  errorLabel: string;
}

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      return pdfjs;
    });
  }
  return pdfjsPromise;
}

export function PdfPreview({ url, title, errorLabel }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let destroyTask: (() => Promise<void>) | undefined;
    let observer: IntersectionObserver | null = null;

    const render = async () => {
      setStatus('loading');

      try {
        const pdfjs = await loadPdfjs();
        const loadingTask = pdfjs.getDocument({ url });
        destroyTask = () => loadingTask.destroy();
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: 1200 / baseViewport.width });
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const context = canvas.getContext('2d');
        if (!context) return;

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: context, viewport, canvas }).promise;
        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          observer = null;
          void render();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (destroyTask) void destroyTask();
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white"
      role="img"
      aria-label={title}
    >
      {status === 'error' ? (
        <div className="flex flex-col items-center gap-2 p-6 text-center text-ef-muted">
          <FileText className="h-8 w-8 text-ef-accent" />
          <span className="text-xs font-medium">{errorLabel}</span>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {status !== 'ready' && status !== 'error' && (
        <div className="absolute inset-0 animate-pulse bg-ef-surface motion-reduce:animate-none" />
      )}
    </div>
  );
}
