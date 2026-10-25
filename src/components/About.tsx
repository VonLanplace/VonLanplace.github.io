import React from 'react';
import { Code2, Cpu, Terminal, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { SectionHeader } from './shared/SectionHeader';

const PRINCIPLES = [
  { icon: Code2, titleKey: 'javaTitle', descKey: 'javaDesc' },
  { icon: Cpu, titleKey: 'cleanTitle', descKey: 'cleanDesc' },
  { icon: Terminal, titleKey: 'linuxTitle', descKey: 'linuxDesc' },
] as const;

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-t border-ef-border bg-ef-surface/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<User className="h-3.5 w-3.5" />}
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="p-7 sm:p-9 lg:col-span-7">
            <Badge variant="tech" className="mb-5">
              <Terminal className="h-3.5 w-3.5" />
              <span>cat about.md</span>
            </Badge>
            <p className="text-base leading-relaxed text-ef-text sm:text-lg">
              {t.about.content}
            </p>
            <p className="mt-4 leading-relaxed text-ef-muted">{t.about.extra}</p>
          </Card>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {PRINCIPLES.map(({ icon: Icon, titleKey, descKey }) => (
              <Card
                key={titleKey}
                className="flex items-start gap-4 p-5 hover:border-ef-accent/50 hover:shadow-md"
              >
                <span className="rounded-xl border border-ef-accent/20 bg-ef-accent/10 p-2.5 text-ef-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ef-text">
                    {t.about.cards[titleKey]}
                  </h3>
                  <p className="mt-0.5 text-sm text-ef-muted">
                    {t.about.cards[descKey]}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
