import React from 'react';
import { ArrowUpRight, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onOpenEstimate: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate, onExploreWork }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#111210]">
      {/* Background Image Container with Editorial Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Professional roofer installing high-grade architectural shingles on a residential home in North Carolina"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-[1.02]"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        {/* Multi-layered cinematic gradient overlays for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111210] via-[#111210]/85 to-[#111210]/40 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-[#111210]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111210]/70 via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow Label with Regional Trust Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#1B1D19]/80 border border-[#2a2c27] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D9FF36]" />
            <span className="text-[11px] font-bold tracking-widest text-[#E9E9E2] uppercase font-mono">
              SERVING THE TRIANGLE REGION · NORTH CAROLINA
            </span>
            <span className="text-[10px] text-[#777970] font-mono">(DEMO)</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06] mb-6 font-sans">
            ROOFING BUILT FOR THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D9FF36]/90">
              LONG RUN.
            </span>
          </h1>

          {/* Tagline & Supporting Copy */}
          <p className="text-lg sm:text-xl text-[#E9E9E2] font-normal leading-relaxed mb-8 max-w-2xl">
            Thoughtful craftsmanship, dependable materials, and residential roofing solutions designed to protect your home for decades.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={onOpenEstimate}
              className="px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] active:scale-[0.98] rounded-md transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#D9FF36]/20 cursor-pointer group"
            >
              <span>Get a Free Estimate</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreWork}
              className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-white bg-[#1B1D19]/90 hover:bg-[#252822] hover:border-[#D9FF36]/50 active:scale-[0.98] border border-[#2a2c27] rounded-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Our Work</span>
            </button>
          </div>

          {/* Trust Commitments */}
          <div className="pt-6 border-t border-[#2a2c27]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#E9E9E2]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D9FF36] shrink-0" />
              <span>45-minute aerial & deck inspection</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#D9FF36] shrink-0" />
              <span>Itemized proposal before work begins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D9FF36] shrink-0" />
              <span>50-yr non-prorated system warranty</span>
            </div>
          </div>
        </div>

        {/* Halden-inspired Floating Snapshot Badge (Desktop only) */}
        <div className="hidden xl:flex absolute right-8 bottom-12 max-w-sm p-5 bg-[#1B1D19]/90 border border-[#2a2c27] backdrop-blur-md rounded-lg flex-col gap-3 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-[#777970] border-b border-[#2a2c27] pb-2">
            <span className="font-mono text-[11px] text-[#D9FF36]">RIDGELINE STANDARD</span>
            <span className="font-mono text-[10px]">NC LICENSED PRACTICE</span>
          </div>
          <div className="text-white text-base font-semibold leading-snug">
            “One roof. Thirty quiet years.”
          </div>
          <p className="text-xs text-[#777970] leading-relaxed">
            Every shingle fastened to exact manufacturer wind specifications. No subcontracted shortcuts, ever.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#D9FF36] font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dual magnetic nail sweep on all jobsites</span>
          </div>
        </div>
      </div>
    </section>
  );
};
