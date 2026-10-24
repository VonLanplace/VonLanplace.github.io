import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 bg-[var(--ef-bg)] border-t border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="p-2 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ef-text)]">{t.experience.title}</h2>
        </div>

        <div className="space-y-6">
          {t.experience.jobs.map((job, index) => (
            <div
              key={index}
              className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-6 sm:p-8 rounded-3xl relative transition-all hover:border-[var(--ef-accent)] shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[var(--ef-text)]">{job.role}</h3>
                  <p className="text-[var(--ef-accent)] font-semibold">{job.company}</p>
                </div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--ef-bg)] text-[var(--ef-muted)] text-sm w-fit border border-[var(--ef-border)]">
                  <Calendar className="w-4 h-4 text-[var(--ef-accent)]" />
                  <span>{job.period}</span>
                </div>
              </div>
              <p className="text-[var(--ef-muted)] leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
