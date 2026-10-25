import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Clock, Code2, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'certificates', key: 'certificates' },
  { id: 'contact', key: 'contact' },
] as const;

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const cycleTheme = () => {
    if (themeMode === 'auto') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('light');
    else setThemeMode('auto');
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ThemeIcon = themeMode === 'auto' ? Clock : isDark ? Moon : Sun;

  return (
    <header className="sticky top-0 z-50 border-b border-ef-border bg-ef-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent"
          aria-label="VonLanplace"
        >
          <span className="rounded-xl bg-ef-accent p-2 text-ef-accent-ink shadow-md">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-ef-text">
            VonLanplace
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-ef-muted transition-colors hover:bg-ef-surface hover:text-ef-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent"
            >
              {t.nav[item.key]}
            </button>
          ))}

          <div className="ml-3 flex items-center gap-2 border-l border-ef-border pl-3">
            <Button
              variant="outline"
              size="sm"
              onClick={cycleTheme}
              title={`Theme: ${themeMode}`}
              aria-label={`Theme: ${themeMode}`}
              className="font-mono"
            >
              <ThemeIcon className="h-4 w-4 text-ef-accent" />
              <span className="text-[10px] uppercase">{themeMode}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              title="Mudar idioma / Change language"
              aria-label="Mudar idioma / Change language"
              className="font-mono"
            >
              <Globe className="h-4 w-4 text-ef-accent" />
              <span>{language.toUpperCase()}</span>
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-1.5 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={cycleTheme}
            aria-label={`Theme: ${themeMode}`}
            className="h-9 w-9"
          >
            <ThemeIcon className="h-4 w-4 text-ef-accent" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            aria-label="Mudar idioma / Change language"
            className="h-9 px-2.5 font-mono"
          >
            <Globe className="h-3.5 w-3.5 text-ef-accent" />
            <span>{language.toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="h-9 w-9"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-ef-border bg-ef-surface md:hidden',
          mobileMenuOpen ? 'block animate-in fade-in-0 slide-in-from-top-2 motion-reduce:animate-none' : 'hidden'
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ef-text transition-colors hover:bg-ef-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent"
            >
              {t.nav[item.key]}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
