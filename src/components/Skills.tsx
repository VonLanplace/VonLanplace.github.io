import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Wrench } from 'lucide-react';
import skillsData from '../data/skills.json';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-[var(--ef-surface)]/40 border-t border-[var(--ef-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="p-2 rounded-xl bg-[var(--ef-accent)]/10 text-[var(--ef-accent)]">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--ef-text)]">{t.skills.title}</h2>
            <p className="text-[var(--ef-muted)] text-sm mt-1">Categorized skills dynamically extracted from GitHub repositories & profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.categories.map((category, idx) => (
            <div key={idx} className="bg-[var(--ef-surface)] border border-[var(--ef-border)] p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[var(--ef-text)] mb-6 pb-3 border-b border-[var(--ef-border)] flex items-center justify-between">
                  <span>{category.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[var(--ef-accent)]/10 text-[var(--ef-accent)] border border-[var(--ef-accent)]/20">
                    {category.items.length} skills
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--ef-bg)] text-[var(--ef-text)] text-sm font-medium border border-[var(--ef-border)] hover:border-[var(--ef-accent)] transition-colors shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
