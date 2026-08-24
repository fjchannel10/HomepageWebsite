import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Play, 
  Smartphone, 
  Crosshair, 
  TrendingUp, 
  BarChart3, 
  Layers,
  ArrowRight,
  Hexagon,
  Activity
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// BACKGROUND PARALLAX COMPONENT
// ==========================================
const TriangleBackdrop = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-triangle-mesh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-glow-radial opacity-70" />
      {/* Floating Geometric Nodes */}
      <div className="floating-node absolute top-1/4 left-1/4 text-white/5">
        <Hexagon size={120} strokeWidth={1} />
      </div>
      <div className="floating-node absolute bottom-1/3 right-1/4 text-white/5">
        <Hexagon size={180} strokeWidth={1} />
      </div>
      <div className="floating-node absolute top-2/3 left-1/3 text-white/5">
        <Hexagon size={140} strokeWidth={1} />
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Floating Nodes Continuous Animation
    gsap.to('.floating-node', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'linear',
      stagger: {
        each: 2,
        from: "random"
      }
    });

    gsap.to('.floating-node', {
      y: '20px',
      x: '15px',
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 1.5
    });

    // 2. Hero Entrance Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-text', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    );

    // 3. Staggered Scroll Entrances (Cards)
    gsap.utils.toArray('.focus-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // 4. Roadmap Line Drawing Animation (Scrubbed)
    gsap.fromTo('.roadmap-line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: 'none',
        scrollTrigger: {
          trigger: '.roadmap-container',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        }
      }
    );

    // 5. Showcase Metric Cards staggered entrance
    gsap.fromTo('.metric-card',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.showcase-grid',
          start: 'top 80%',
        }
      }
    );

  }, { scope: containerRef });

  const handleParallax = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.parallax-layer', { x, y, duration: 1.5, ease: 'power2.out' });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen font-sans selection:bg-champagne/30 selection:text-white"
      onMouseMove={handleParallax}
    >
      <TriangleBackdrop />

      {/* TOP NAV */}
      <nav className="fixed w-full top-0 z-50 border-b border-structural glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white font-semibold tracking-widest text-sm uppercase">
            <Hexagon size={20} className="text-champagne" />
            <span>Automate</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] text-white/50 uppercase font-medium">
            <a href="#focus" className="hover:text-white transition-colors">Focus</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#lab" className="hover:text-white transition-colors">Lab Hub</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full parallax-layer">
          <div className="max-w-4xl">
            <div className="hero-text flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-champagne"></span>
              <span className="text-champagne uppercase tracking-[0.2em] text-sm font-semibold">
                Non-Commercial Entrepreneurial Collective
              </span>
            </div>
            
            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8">
              AUTOMATE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                Digital Media & Growth Lab.
              </span>
            </h1>
            
            <p className="hero-text text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light leading-relaxed">
              We document, test, and scale modern media strategies. A private hub dedicated to decoding retention engineering, mass distribution, and attribution modeling.
            </p>
            
            <div className="hero-text flex flex-col sm:flex-row gap-4">
              <a href="#roadmap" className="group relative px-8 py-4 bg-white text-obsidian font-semibold text-sm uppercase tracking-wider overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-champagne transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Explore Roadmap <ArrowRight size={16} />
                </span>
              </a>
              <a href="#lab" className="px-8 py-4 border border-structural hover:bg-white/5 text-white font-semibold text-sm uppercase tracking-wider transition-colors glass-panel">
                View Experiment Hub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FOCUS AREAS */}
      <section id="focus" className="relative z-10 py-32 border-t border-structural bg-obsidian/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Focus Areas</h2>
            <p className="text-white/50 tracking-wider uppercase text-sm font-medium">Strategic Architecture & Deployment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="focus-card group p-8 glass-panel border border-structural hover:border-champagne/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Play size={120} />
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-lg inline-block border border-white/10 group-hover:bg-champagne/10 transition-colors">
                <Play className="text-champagne" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">YouTube Automation</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Designing frictionless content pipelines, script architecture mapping, and deep retention engineering to optimize the algorithmic curve.
              </p>
              <ul className="space-y-3 text-xs tracking-wider text-white/40 uppercase">
                <li className="flex gap-3"><span className="text-champagne">/</span> Pipeline Logistics</li>
                <li className="flex gap-3"><span className="text-champagne">/</span> Retention Engineering</li>
                <li className="flex gap-3"><span className="text-champagne">/</span> Title/Thumb A-B</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="focus-card group p-8 glass-panel border border-structural hover:border-sapphire/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Smartphone size={120} />
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-lg inline-block border border-white/10 group-hover:bg-sapphire/10 transition-colors">
                <Smartphone className="text-sapphire" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">TikTok & Short-Form</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Executing mass distribution testing, high-velocity hook creation, and macro viral metrics analysis across cross-platform architectures.
              </p>
              <ul className="space-y-3 text-xs tracking-wider text-white/40 uppercase">
                <li className="flex gap-3"><span className="text-sapphire">/</span> Velocity Metrics</li>
                <li className="flex gap-3"><span className="text-sapphire">/</span> Hook Frameworks</li>
                <li className="flex gap-3"><span className="text-sapphire">/</span> Mass Syndication</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="focus-card group p-8 glass-panel border border-structural hover:border-bronze/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Crosshair size={120} />
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-lg inline-block border border-white/10 group-hover:bg-bronze/10 transition-colors">
                <Crosshair className="text-bronze" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Paid Ad Media Buying</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Rigorous campaign structural testing, dynamic budget allocation modeling, and first-party data attribution mapping.
              </p>
              <ul className="space-y-3 text-xs tracking-wider text-white/40 uppercase">
                <li className="flex gap-3"><span className="text-bronze">/</span> Campaign Structuring</li>
                <li className="flex gap-3"><span className="text-bronze">/</span> Budget Allocation</li>
                <li className="flex gap-3"><span className="text-bronze">/</span> Attribution Models</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP / TIMELINE */}
      <section id="roadmap" className="relative z-10 py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 roadmap-container">
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Learning Roadmap</h2>
            <p className="text-white/50 tracking-wider uppercase text-sm font-medium">Evolution of Club Execution</p>
          </div>

          <div className="relative">
            {/* The Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            <div className="roadmap-line-fill absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-champagne via-sapphire to-bronze -translate-x-1/2 z-10" />

            <div className="space-y-24">
              {/* Phase 01 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="hidden md:block w-[45%] text-right pr-12">
                  <h4 className="text-xl font-bold text-white mb-2">Protocol Setup</h4>
                  <p className="text-sm text-white/50">Establishing baseline data tracking, automation tools, and standard operating procedures.</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-obsidian border-2 border-champagne rounded-full z-20 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                <div className="w-full md:w-[45%] pl-12 md:pl-12 text-left">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-champagne text-xs uppercase tracking-widest font-bold mb-4">Phase 01</div>
                  <div className="md:hidden">
                    <h4 className="text-xl font-bold text-white mb-2">Protocol Setup</h4>
                    <p className="text-sm text-white/50">Establishing baseline data tracking, automation tools, and standard operating procedures.</p>
                  </div>
                </div>
              </div>

              {/* Phase 02 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pr-12 md:text-right">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-sapphire text-xs uppercase tracking-widest font-bold mb-4">Phase 02</div>
                  <div className="md:hidden">
                     <h4 className="text-xl font-bold text-white mb-2">Scale Architecture</h4>
                     <p className="text-sm text-white/50">Deploying parallel content engines and cross-platform syndication testing.</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-obsidian border-2 border-sapphire rounded-full z-20 shadow-[0_0_15px_rgba(30,58,138,0.5)]" />
                <div className="hidden md:block w-[45%] pl-12 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Scale Architecture</h4>
                  <p className="text-sm text-white/50">Deploying parallel content engines and cross-platform syndication testing.</p>
                </div>
              </div>

              {/* Phase 03 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="hidden md:block w-[45%] text-right pr-12">
                  <h4 className="text-xl font-bold text-white mb-2">Yield Optimization</h4>
                  <p className="text-sm text-white/50">Advanced split-testing, micro-metric adjustments, and final ROI modeling formulation.</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-obsidian border-2 border-bronze rounded-full z-20 shadow-[0_0_15px_rgba(163,112,76,0.4)]" />
                <div className="w-full md:w-[45%] pl-12 md:pl-12 text-left">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-bronze text-xs uppercase tracking-widest font-bold mb-4">Phase 03</div>
                  <div className="md:hidden">
                    <h4 className="text-xl font-bold text-white mb-2">Yield Optimization</h4>
                    <p className="text-sm text-white/50">Advanced split-testing, micro-metric adjustments, and final ROI modeling formulation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIMENT & STRATEGY SHOWCASE */}
      <section id="lab" className="relative z-10 py-32 border-t border-structural bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Experiment Hub</h2>
              <p className="text-white/50 tracking-wider uppercase text-sm font-medium">Live Data & Protocol Visualization</p>
            </div>
            <button className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors pb-2 border-b border-white/10 hover:border-white">
              View All Logs <Activity size={16} />
            </button>
          </div>

          <div className="showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Metric Card 1 */}
            <div className="metric-card glass-panel border border-structural p-6 flex flex-col group hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white/5 rounded border border-white/5">
                  <TrendingUp size={20} className="text-champagne" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/40">Exp-042</span>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-white/50 uppercase tracking-widest font-semibold mb-2">Retention Curve Beta</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-4xl font-bold text-white">68.4<span className="text-2xl text-white/40">%</span></h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">+4.2% AVD</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded overflow-hidden">
                  <div className="w-[68%] h-full bg-champagne"></div>
                </div>
              </div>
            </div>

            {/* Metric Card 2 */}
            <div className="metric-card glass-panel border border-structural p-6 flex flex-col group hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white/5 rounded border border-white/5">
                  <Layers size={20} className="text-sapphire" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/40">Exp-048</span>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-white/50 uppercase tracking-widest font-semibold mb-2">Short-Form Volume</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-4xl font-bold text-white">124<span className="text-2xl text-white/40">u/w</span></h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">Output Scaled</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded overflow-hidden">
                  <div className="w-[85%] h-full bg-sapphire"></div>
                </div>
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="metric-card glass-panel border border-structural p-6 flex flex-col group hover:bg-white/[0.02] transition-colors lg:col-span-1 md:col-span-2">
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white/5 rounded border border-white/5">
                  <BarChart3 size={20} className="text-bronze" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/40">Protocol-A</span>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-white/50 uppercase tracking-widest font-semibold mb-2">CAC Model vs LTV</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-4xl font-bold text-white"><span className="text-2xl text-white/40">$</span>14.20</h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">-12% MoM</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded overflow-hidden">
                  <div className="w-[45%] h-full bg-bronze"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-structural bg-obsidian py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
             <div className="flex items-center gap-3 text-white/80 font-bold tracking-widest text-lg uppercase">
              <Hexagon size={24} className="text-champagne" />
              <span>Automate</span>
            </div>
            <span className="hidden md:block w-px h-6 bg-white/10"></span>
            <p className="text-xs text-white/40 uppercase tracking-wider text-center md:text-left">
              A Non-Commercial Collective for Digital Media Strategy.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-white/30 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="hover:text-white transition-colors">Internal Wiki</a>
          </div>
        </div>
      </footer>
    </div>
  );
}