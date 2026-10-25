import React from 'react';
import {
  ArrowRight,
  Code2,
  Cpu,
  FileText,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './SocialIcons';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip } from './ui/tooltip';
import personal from '../data/personal.json';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-ef-bg pb-24 pt-24 transition-colors duration-300 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--ef-accent)_0%,transparent_45%)] opacity-10" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--ef-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--ef-border)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none lg:col-span-7">
            <Badge variant="tech" className="mb-6 px-3.5 py-1.5">
              <Terminal className="h-3.5 w-3.5 animate-pulse motion-reduce:animate-none" />
              <span>{t.hero.badge}</span>
            </Badge>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-ef-text sm:text-6xl">
              {t.hero.greeting}{' '}
              <span className="bg-linear-to-r from-ef-accent to-ef-aqua bg-clip-text text-transparent">
                Lucas Sartorelli
              </span>
            </h1>

            <p className="mb-6 flex items-start gap-2 text-xl font-semibold text-ef-text/90 sm:text-2xl">
              <Code2 className="mt-1 h-5 w-5 shrink-0 text-ef-accent-text" />
              <span>{t.hero.title}</span>
            </p>

            <p className="mb-10 max-w-2xl text-base leading-relaxed text-ef-muted sm:text-lg">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollTo('projects')} className="group">
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                <FileText className="h-4 w-4 text-ef-accent-text" />
                <span>{t.hero.viewResume}</span>
              </a>

              <Button variant="outline" size="lg" onClick={() => scrollTo('contact')}>
                <span>{t.hero.contactMe}</span>
              </Button>

              <Tooltip content="GitHub">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={buttonVariants({ variant: 'outline', size: 'icon', className: 'h-12 w-12' })}
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              </Tooltip>
            </div>
          </div>

          <div className="animate-in fade-in zoom-in-95 duration-700 motion-reduce:animate-none lg:col-span-5">
            <Card className="overflow-hidden border-ef-border shadow-2xl">
              <div className="flex h-10 items-center justify-between border-b border-ef-border bg-ef-surface-hover px-4">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-ef-red/80" />
                  <span className="h-3 w-3 rounded-full bg-ef-yellow/80" />
                  <span className="h-3 w-3 rounded-full bg-ef-green/80" />
                </div>
                <span className="font-mono text-xs text-ef-muted">lucas@sartorelli:~</span>
                <Cpu className="h-4 w-4 text-ef-accent-text" />
              </div>

              <div className="p-5">
                <Tabs defaultValue="terminal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="terminal">{t.hero.terminal.tabTerminal}</TabsTrigger>
                    <TabsTrigger value="stack">{t.hero.terminal.tabStack}</TabsTrigger>
                    <TabsTrigger value="status">{t.hero.terminal.tabStatus}</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="terminal"
                    className="min-h-[190px] space-y-3 pt-2 font-mono text-sm text-ef-text"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-ef-accent-text">$</span>
                      <span>{t.hero.terminal.whoami}</span>
                    </div>
                    <p className="pl-4 text-xs leading-relaxed text-ef-muted">
                      {t.hero.terminal.bio}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-ef-accent-text">$</span>
                      <span>{t.hero.terminal.focus}</span>
                    </div>
                    <p className="pl-4 text-xs leading-relaxed text-ef-muted">
                      {t.hero.terminal.focusOutput}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-ef-accent-text">$</span>
                      <span className="animate-pulse motion-reduce:animate-none">_</span>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="stack"
                    className="min-h-[190px] pt-2 font-mono text-xs text-ef-text"
                  >
                    <pre className="overflow-x-auto rounded-xl border border-ef-border bg-ef-bg p-3 text-ef-accent-text">
{`{
  "core": ["Java", "TypeScript", "React"],
  "backend": ["OOP", "REST", "SQL"],
  "devops": ["Linux", "Git", "CI/CD"],
  "philosophy": ["Clean Code", "FOSS"]
}`}
                    </pre>
                  </TabsContent>

                  <TabsContent
                    value="status"
                    className="min-h-[190px] space-y-3 pt-2 font-mono text-xs text-ef-text"
                  >
                    <div className="flex items-center justify-between rounded-xl border border-ef-border bg-ef-bg p-2.5">
                      <span className="flex items-center gap-2 text-ef-muted">
                        <Server className="h-3.5 w-3.5 text-ef-accent-text" />
                        <span>{t.hero.terminal.api}</span>
                      </span>
                      <Badge className="text-[10px]">{t.hero.terminal.apiStatus}</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-ef-border bg-ef-bg p-2.5">
                      <span className="flex items-center gap-2 text-ef-muted">
                        <ShieldCheck className="h-3.5 w-3.5 text-ef-accent-text" />
                        <span>{t.hero.terminal.security}</span>
                      </span>
                      <Badge variant="outline" className="text-[10px] text-ef-accent-text">
                        {t.hero.terminal.securityStatus}
                      </Badge>
                    </div>

                    <p className="pt-1 text-[11px] leading-relaxed text-ef-muted">
                      {t.hero.terminal.ready}
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
