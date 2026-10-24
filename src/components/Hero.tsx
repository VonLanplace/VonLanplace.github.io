import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, FileText } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import personal from '../data/personal.json';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-24 pb-32 overflow-hidden bg-[var(--ef-bg)] transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--ef-accent)]/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ef-text)] mb-6">
            {t.hero.greeting}{' '}
            <span className="text-[var(--ef-accent)]">
              Lucas Sartorelli
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-[var(--ef-text)] opacity-90 mb-6">
            {t.hero.title}
          </p>

          <p className="text-base sm:text-lg text-[var(--ef-muted)] mb-10 leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[var(--ef-accent)] hover:opacity-90 text-[var(--ef-bg)] font-semibold shadow-lg transition-all"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] text-[var(--ef-text)] font-semibold border border-[var(--ef-border)] transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-[var(--ef-accent)]" />
              <span>{t.hero.viewResume}</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] text-[var(--ef-text)] font-semibold border border-[var(--ef-border)] transition-all"
            >
              <span>{t.hero.contactMe}</span>
            </button>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-2xl bg-[var(--ef-surface)] hover:bg-[var(--ef-surface-hover)] text-[var(--ef-text)] border border-[var(--ef-border)] transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
