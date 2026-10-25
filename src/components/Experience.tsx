import React from 'react';
import { Briefcase, Building2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { SectionHeader } from './shared/SectionHeader';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="border-t border-ef-border bg-ef-bg py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<Briefcase className="h-3.5 w-3.5" />}
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative ml-4 space-y-8 border-l-2 border-ef-border sm:ml-8">
          {t.experience.jobs.map((job, index) => (
            <div key={`${job.company}-${index}`} className="group relative pl-8 sm:pl-12">
              <span className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-4 border-ef-accent bg-ef-bg shadow-md transition-transform group-hover:scale-125" />

              <Card className="p-6 hover:border-ef-accent/50 hover:shadow-lg sm:p-8">
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-xs text-ef-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-ef-text">{job.role}</h3>
                    </div>
                    <p className="flex items-center gap-1.5 font-mono text-sm font-semibold text-ef-accent">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </p>
                  </div>

                  <Badge variant="tech" className="w-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{job.period}</span>
                  </Badge>
                </div>

                <p className="text-sm leading-relaxed text-ef-muted sm:text-base">
                  {job.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
