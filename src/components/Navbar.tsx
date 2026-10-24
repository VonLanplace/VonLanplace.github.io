import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Menu, X, Code2, Sun, Moon, Clock } from 'lucide-react';

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--ef-bg)]/80 backdrop-blur-md border-b border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="bg-[var(--ef-accent)] p-2 rounded-xl text-[var(--ef-bg)] shadow-md">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[var(--ef-text)]">
            VonLanplace
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollTo('about')} className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] font-medium transition-colors">
            {t.nav.about}
          </button>
          <button onClick={() => scrollTo('experience')} className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] font-medium transition-colors">
            {t.nav.experience}
          </button>
          <button onClick={() => scrollTo('skills')} className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] font-medium transition-colors">
            {t.nav.skills}
          </button>
          <button onClick={() => scrollTo('projects')} className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] font-medium transition-colors">
            {t.nav.projects}
          </button>
          <button onClick={() => scrollTo('contact')} className="text-[var(--ef-muted)] hover:text-[var(--ef-text)] font-medium transition-colors">
            {t.nav.contact}
          </button>

          <div className="flex items-center space-x-2 border-l border-[var(--ef-border)] pl-4">
            {/* Theme Switcher Button */}
            <button
              onClick={cycleTheme}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] text-[var(--ef-text)] border border-[var(--ef-border)] transition-all text-sm font-medium shadow-sm"
              title={`Tema Everforest (${themeMode.toUpperCase()})`}
            >
              {themeMode === 'auto' ? <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" /> : isDark ? <Moon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : <Sun className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
              <span className="text-xs uppercase">{themeMode}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] text-[var(--ef-text)] border border-[var(--ef-border)] transition-all text-sm font-medium shadow-sm"
              title="Mudar Idioma / Change Language"
            >
              <Globe className="w-4 h-4 text-[var(--ef-accent)]" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-xl bg-[var(--ef-surface)] text-[var(--ef-text)] border border-[var(--ef-border)]"
            title="Theme"
          >
            {themeMode === 'auto' ? <Clock className="w-4 h-4" /> : isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-[var(--ef-surface)] text-[var(--ef-text)] border border-[var(--ef-border)] text-xs font-medium"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--ef-accent)]" />
            <span>{language.toUpperCase()}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--ef-text)] p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--ef-surface)] border-b border-[var(--ef-border)] px-4 pt-3 pb-5 space-y-2">
          <button onClick={() => scrollTo('about')} className="block w-full text-left px-3 py-2 rounded-xl text-[var(--ef-text)] hover:bg-[var(--ef-surface-hover)] font-medium">
            {t.nav.about}
          </button>
          <button onClick={() => scrollTo('experience')} className="block w-full text-left px-3 py-2 rounded-xl text-[var(--ef-text)] hover:bg-[var(--ef-surface-hover)] font-medium">
            {t.nav.experience}
          </button>
          <button onClick={() => scrollTo('skills')} className="block w-full text-left px-3 py-2 rounded-xl text-[var(--ef-text)] hover:bg-[var(--ef-surface-hover)] font-medium">
            {t.nav.skills}
          </button>
          <button onClick={() => scrollTo('projects')} className="block w-full text-left px-3 py-2 rounded-xl text-[var(--ef-text)] hover:bg-[var(--ef-surface-hover)] font-medium">
            {t.nav.projects}
          </button>
          <button onClick={() => scrollTo('contact')} className="block w-full text-left px-3 py-2 rounded-xl text-[var(--ef-text)] hover:bg-[var(--ef-surface-hover)] font-medium">
            {t.nav.contact}
          </button>
        </div>
      )}
    </header>
  );
};
