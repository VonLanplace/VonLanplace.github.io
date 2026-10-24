import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ef-bg)] border-t border-[var(--ef-border)] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="bg-[var(--ef-accent)] p-1.5 rounded-xl text-[var(--ef-bg)]">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-[var(--ef-text)]">VonLanplace</span>
        </div>

        <p className="text-[var(--ef-muted)] text-sm">
          © {currentYear} Lucas Sartorelli. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};
