'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { contentTemplates, DropProject, projects } from '@/data/projects';

const HeroOrb = dynamic(() => import('./HeroOrb'), { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-full bg-cyan/10" /> });

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { const mq = matchMedia('(prefers-reduced-motion: reduce)'); setReduced(mq.matches); const on = () => setReduced(mq.matches); mq.addEventListener('change', on); return () => mq.removeEventListener('change', on); }, []);
  return reduced;
}

export default function DroprApp() {
  const [selected, setSelected] = useState<DropProject>(projects[0]);
  const reduced = useReducedMotion();
  const stats = useMemo(() => {
    const tasks = projects.flatMap(p => p.tasks);
    return [ ['Total projects', projects.length], ['High priority', projects.filter(p => p.priority >= 85).length], ['Blocked tasks', tasks.filter(t => t.status === 'blocked').length], ['Completed tasks', tasks.filter(t => t.status === 'done').length], ['Avg alpha score', Math.round(projects.reduce((a,p)=>a+p.priority,0)/projects.length)] ];
  }, []);

  useEffect(() => {
    if (reduced) return;
    const cards = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('opacity-100','translate-y-0')), { threshold: .14 });
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, [reduced]);

  return <main className="relative min-h-screen">
    <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.05fr_.95fr]">
      <div className="z-10 space-y-8">
        <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.35em] text-cyan">Dropr OS / alpha layer online</div>
        <div className="space-y-5"><p className="text-alpha">Your alpha command center.</p><h1 className="max-w-4xl text-5xl font-black tracking-[-.06em] sm:text-7xl lg:text-8xl">Track drops before they drop.</h1><p className="max-w-2xl text-lg leading-8 text-slate-300">Dropr helps you manage airdrops, testnets, research notes, and alpha signals in one command center.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><a href="#dashboard" className="rounded-full bg-cyan px-6 py-4 text-center font-bold text-void shadow-[0_0_40px_rgba(40,242,255,.35)]">Open Dashboard</a><a href="#watchlist" className="rounded-full border border-white/15 px-6 py-4 text-center font-bold text-white hover:border-alpha hover:text-alpha">Add Project</a></div>
      </div>
      <div className="relative h-[520px] min-h-[420px]">
        <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-cyan/20 via-purple-500/10 to-alpha/10 blur-3xl" />
        <HeroOrb />
        {projects.slice(0,4).map((p,i)=><button key={p.name} onClick={()=>setSelected(p)} className="glass absolute rounded-2xl px-4 py-3 text-left text-sm transition hover:-translate-y-1" style={{left:[2,66,8,60][i]+'%', top:[18,22,68,72][i]+'%'}}><b>{p.name}</b><br/><span className="text-cyan">{p.priority} alpha</span></button>)}
      </div>
    </section>

    <section id="dashboard" className="mx-auto max-w-7xl space-y-8 px-5 py-20">
      <Header kicker="Dashboard overview" title="Command metrics for the next drop cycle." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{stats.map(([label,value])=><Card key={label as string}><p className="text-sm text-slate-400">{label}</p><p className="mt-3 text-4xl font-black text-white">{value}</p></Card>)}</div>
    </section>

    <section id="watchlist" className="mx-auto max-w-7xl space-y-8 px-5 py-16">
      <Header kicker="Project watchlist" title="Prioritized alpha cards with risk, access, and notes." />
      <div className="grid gap-5 lg:grid-cols-3">{projects.map(p=><ProjectCard key={p.name} project={p} active={selected.name===p.name} onClick={()=>setSelected(p)} />)}</div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-[1fr_380px]">
      <div className="glass relative min-h-[520px] overflow-hidden rounded-[2rem] p-6"><Header kicker="Alpha Radar" title="Node distance maps priority and research gravity." small />
        <div className="absolute inset-20 rounded-full border border-cyan/25 shadow-[inset_0_0_60px_rgba(40,242,255,.08)]" /><div className="absolute inset-32 rounded-full border border-alpha/20" /><div className="scanline absolute left-0 top-1/2 h-px w-full" />
        {projects.map(p=><button key={p.name} onClick={()=>setSelected(p)} className={`absolute rounded-full border px-3 py-2 text-xs font-bold transition hover:scale-110 ${selected.name===p.name?'border-alpha bg-alpha text-void':'border-cyan/40 bg-cyan/10 text-cyan'}`} style={{left:`${p.radar.x}%`, top:`${p.radar.y}%`}}>{p.name}</button>)}
      </div>
      <Card><p className="text-cyan">Selected target</p><h3 className="mt-2 text-3xl font-black">{selected.name}</h3><p className="mt-4 text-slate-300">{selected.notes}</p><div className="mt-6 grid grid-cols-2 gap-3 text-sm"><Pill k="Priority" v={`${selected.priority}/100`} /><Pill k="Risk" v={selected.risk} /><Pill k="Token" v={selected.tokenStatus} /><Pill k="Access" v={selected.accessStatus} /></div></Card>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2">
      <Card><Header kicker="Task tracker" title="Execution queue by project." small />{projects.map(p=><div key={p.name} className="mt-5"><b>{p.name}</b>{p.tasks.map(t=><div key={t.title} className="mt-2 flex justify-between rounded-xl bg-white/5 p-3 text-sm"><span>{t.title}</span><span className="text-cyan">{t.status}</span></div>)}</div>)}</Card>
      <Card><Header kicker="Content Lab" title="Turn research into distribution." small /><div className="mt-6 grid gap-4 sm:grid-cols-2">{contentTemplates.map(t=><div key={t.type} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-alpha">{t.type}</p><p className="mt-3 text-slate-300">{t.text}</p></div>)}</div></Card>
    </section>
  </main>;
}

function Header({ kicker, title, small=false }: { kicker: string; title: string; small?: boolean }) { return <div data-reveal className="translate-y-6 opacity-0 transition duration-700"><p className="text-sm font-bold uppercase tracking-[.28em] text-cyan">{kicker}</p><h2 className={`${small?'text-2xl':'text-4xl md:text-5xl'} mt-2 font-black tracking-[-.04em]`}>{title}</h2></div>; }
function Card({ children }: { children: ReactNode }) { return <div data-reveal className="glass translate-y-6 rounded-[2rem] p-6 opacity-0 transition duration-700 hover:-translate-y-1">{children}</div>; }
function Pill({ k, v }: { k: string; v: string }) { return <div className="rounded-2xl bg-white/5 p-3"><p className="text-slate-500">{k}</p><p className="font-bold capitalize">{v}</p></div>; }
function ProjectCard({ project, active, onClick }: { project: DropProject; active: boolean; onClick: () => void }) { return <button onClick={onClick} data-reveal className={`glass group translate-y-6 rounded-[2rem] p-5 text-left opacity-0 transition duration-700 hover:rotate-1 hover:scale-[1.02] ${active?'ring-2 ring-alpha/70':''}`}><div className="flex items-start justify-between"><div><p className="text-cyan">{project.category}</p><h3 className="mt-1 text-3xl font-black">{project.name}</h3></div><span className={`rounded-full px-3 py-1 text-xs ${project.risk==='high'?'bg-risk/20 text-risk':project.risk==='medium'?'bg-purple-500/20 text-purple-200':'bg-alpha/20 text-alpha'}`}>{project.risk} risk</span></div><p className="mt-4 text-slate-300">{project.notes}</p><div className="mt-5 grid grid-cols-2 gap-3 text-sm"><Pill k="Ecosystem" v={project.ecosystem} /><Pill k="Airdrop" v={project.airdropStatus} /><Pill k="Access" v={project.accessStatus} /><Pill k="Score" v={`${project.priority}`} /></div></button>; }
