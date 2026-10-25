import React from 'react';
import { Code2, Cpu, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import skillsData from '../data/skills.json';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SectionHeader } from './shared/SectionHeader';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="border-t border-ef-border bg-ef-surface/30 py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<Wrench className="h-3.5 w-3.5" />}
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <Tabs defaultValue={`cat-${skillsData.categories[0]?.id ?? 'empty'}`} className="w-full">
          <div className="no-scrollbar mb-6 flex overflow-x-auto pb-2 [mask-image:linear-gradient(to_right,black_88%,transparent)] md:overflow-visible md:[mask-image:none]">
            <TabsList className="h-auto w-max gap-2 p-1.5 md:w-full md:flex-wrap">
              {skillsData.categories.map((category) => (
                <TabsTrigger key={category.id} value={`cat-${category.id}`}>
                  {category.name}
                  <span className="text-[10px] text-ef-muted">
                    {category.items.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {skillsData.categories.map((category) => (
            <TabsContent key={category.id} value={`cat-${category.id}`}>
              <Card className="p-6 shadow-lg sm:p-8">
                <div className="mb-7 flex flex-col justify-between gap-3 border-b border-ef-border pb-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl border border-ef-accent/20 bg-ef-accent/10 p-2.5 text-ef-accent">
                      <Cpu className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-ef-text sm:text-2xl">
                        {category.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-ef-muted">
                        {category.items.length} {t.skills.count}
                      </p>
                    </div>
                  </div>
                  <Badge variant="default" className="w-fit font-mono">
                    {t.skills.activeStack}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {category.items.map((item) => (
                    <div
                      key={item}
                      className="group flex items-center gap-2.5 rounded-xl border border-ef-border bg-ef-bg p-3 shadow-xs transition-all hover:border-ef-accent/60 hover:shadow-md"
                    >
                      <Code2 className="h-4 w-4 shrink-0 text-ef-muted transition-colors group-hover:text-ef-accent" />
                      <span className="truncate text-sm font-medium text-ef-text">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
