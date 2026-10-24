import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Code, Cpu, Terminal } from 'lucide-react';

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 bg-[var(--ef-surface)]/40 border-t border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-2 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ef-text)]">{t.about.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[var(--ef-surface)] border border-[var(--ef-border)] p-8 rounded-3xl shadow-sm flex flex-col justify-center">
            <p className="text-[var(--ef-text)] text-lg leading-relaxed mb-4">
              {t.about.content}
            </p>
            <p className="text-[var(--ef-muted)] leading-relaxed">
              {language === 'pt' 
                ? 'Comprometido com a criação de sistemas eficientes, arquitetura limpa e ecossistemas open source baseados em Linux.'
                : 'Committed to building efficient systems, clean architecture, and Linux-based open source ecosystems.'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--ef-text)]">Java Junior Dev</h3>
                <p className="text-sm text-[var(--ef-muted)]">Backend & Java Ecosystem</p>
              </div>
            </div>

            <div className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--ef-text)]">Clean Code & OOP</h3>
                <p className="text-sm text-[var(--ef-muted)]">Object-Oriented Design</p>
              </div>
            </div>

            <div className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--ef-text)]">Linux & FOSS</h3>
                <p className="text-sm text-[var(--ef-muted)]">Open Source & Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
