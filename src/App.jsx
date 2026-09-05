import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Hexagon } from 'lucide-react';

// ==========================================
// BACKGROUND PARALLAX & NERD EMOJI COMPONENT
// ==========================================
const DynamicBackdrop = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-triangle-mesh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-glow-radial opacity-80" />
      
      {/* Massive Washed-out Wireframe Nerd Emoji Backdrop */}
      <div className="nerd-emoji-bg absolute w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] text-pink-500/[0.04] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.8">
          <circle cx="50" cy="50" r="44" />
          <rect x="18" y="32" width="28" height="22" rx="4" />
          <rect x="54" y="32" width="28" height="22" rx="4" />
          <path d="M46 40 H54" strokeWidth="1.5" />
          <path d="M6 38 L18 38" />
          <path d="M82 38 L94 38" />
          <circle cx="32" cy="43" r="3" fill="currentColor" />
          <circle cx="68" cy="43" r="3" fill="currentColor" />
          <path d="M 30 66 Q 50 80 70 66" strokeWidth="1.2" />
          <rect x="44" y="70" width="6" height="7" rx="1" fill="currentColor" />
          <rect x="50" y="70" width="6" height="7" rx="1" fill="currentColor" />
        </svg>
      </div>

      {/* Floating Geometric Nodes */}
      <div className="floating-node absolute top-1/4 left-1/6 text-pink-500/10 hidden sm:block">
        <Hexagon size={140} strokeWidth={0.8} />
      </div>
      <div className="floating-node absolute bottom-1/4 right-1/6 text-pink-500/10">
        <Hexagon size={120} className="sm:w-[200px] sm:h-[200px]" strokeWidth={0.8} />
      </div>
      <div className="floating-node absolute top-2/3 left-1/3 text-pink-500/15">
        <svg width="80" height="80" className="sm:w-[120px] sm:h-[120px]" viewBox="0 0 100 100" fill="none">
          <path d="M50 0L100 100H0Z" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
      </div>
    </div>
  );
};

// ==========================================
// MAIN HERO TITLE APP COMPONENT
// ==========================================
export default function App() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Continuous floating and rotation animations
    gsap.to('.floating-node', {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: 'linear',
      stagger: { each: 2, from: "random" }
    });

    gsap.to('.floating-node', {
      y: '25px',
      x: '15px',
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 1.5
    });

    // Subtly pulse and float the backdrop nerd emoji
    gsap.to('.nerd-emoji-bg', {
      scale: 1.05,
      rotation: 3,
      duration: 8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Hero Staggered Entrance Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-element', 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.1 }
    );

  }, { scope: containerRef });

  const handleParallax = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 25;
    const y = (e.clientY / window.innerHeight - 0.5) * 25;
    gsap.to('.parallax-layer', { x, y, duration: 1.2, ease: 'power2.out' });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full font-sans selection:bg-pink-500/40 selection:text-white overflow-hidden flex flex-col justify-between"
      onMouseMove={handleParallax}
    >
      <DynamicBackdrop />

      {/* NAVIGATION BAR */}
      <nav className="relative z-50 w-full border-b border-structural glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 text-white font-bold tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm uppercase">
            <Hexagon size={20} className="text-[#ff007f] drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]" />
            <span className="text-neon-glow">Automate</span>
          </div>
          <a 
            href="https://snapchat.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-structural bg-pink-950/30 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-pink-400 hover:border-[#ff007f]/50 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
            SNAPCHAT
          </a>
        </div>
      </nav>

      {/* HERO TITLE SECTION */}
      <main className="relative z-10 my-auto px-5 sm:px-8 max-w-7xl mx-auto w-full parallax-layer py-12 sm:py-0">
        <div className="max-w-6xl">
          {/* Eyebrow Label */}
          <div className="hero-element flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="h-px w-8 sm:w-12 bg-[#ff007f] shadow-[0_0_10px_#ff007f]"></span>
            <span className="text-[#ff007f] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-bold drop-shadow-[0_0_8px_rgba(255,0,127,0.6)]">
              Non-Commercial Entrepreneurial Collective
            </span>
          </div>
          
          {/* Primary Headline */}
          <h1 className="hero-element text-6xl sm:text-[8rem] md:text-[11rem] lg:text-[14rem] font-extrabold leading-[0.85] tracking-tight mb-6 sm:mb-8 text-pink-300">
            AUTOMATE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-[#ff007f] text-neon-glow text-3xl sm:text-6xl md:text-7xl lg:text-8xl">
              Media & Growth Lab.
            </span>
          </h1>
          
          {/* Mission Subtitle */}
          <p className="hero-element text-sm sm:text-xl md:text-2xl text-pink-100/70 max-w-2xl font-light leading-relaxed">
            A high-execution strategic hub dedicated to retention engineering, algorithmic distribution, and growth architecture.
          </p>
        </div>
      </main>

      {/* SLEEK FOOTER BAR */}
      <footer className="relative z-10 border-t border-structural glass-panel py-4 sm:py-5 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-pink-300/40 font-mono uppercase">
          <span>// 2026 Automate</span>
        </div>
      </footer>
    </div>
  );
}