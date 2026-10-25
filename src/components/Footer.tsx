import React from 'react';
import { Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ef-border bg-ef-bg py-10 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-ef-accent p-1.5 text-ef-accent-ink">
            <Code2 className="h-4 w-4" />
          </span>
          <span className="font-bold text-ef-text">VonLanplace</span>
          <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-ef-border bg-ef-surface px-2 py-0.5 font-mono text-[10px] text-ef-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ef-accent" />
            {t.footer.status}
          </span>
        </div>

        <p className="text-center text-sm text-ef-muted">
          © {currentYear} Lucas Sartorelli. {t.footer.rights}
        </p>

        <p className="font-mono text-[11px] text-ef-muted">
          React · Tailwind · Radix UI
        </p>
      </div>
    </footer>
  );
};
