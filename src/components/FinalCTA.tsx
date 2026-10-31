import React from 'react';
import { ArrowUpRight, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface FinalCTAProps {
  onOpenEstimate: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEstimate }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#111210] overflow-hidden border-b border-[#2a2c27]">
      {/* Background with Dark Architectural Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Architectural roof installation backdrop"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-[#111210]/90 to-[#111210]/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B1D19] border border-[#2a2c27] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D9FF36]" />
          <span className="text-xs font-mono font-bold text-[#E9E9E2] uppercase tracking-wider">
            TRIANGLE RESIDENTIAL DISPATCH
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Ready to give your roof the{' '}
          <span className="text-[#D9FF36]">attention it deserves?</span>
        </h2>

        <p className="text-base sm:text-lg text-[#E9E9E2] max-w-2xl mx-auto leading-relaxed mb-10">
          Tell us about your project and take the first step toward a clearer roofing plan. Receive a full 45-point photographic audit with zero sales pressure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenEstimate}
            className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] active:scale-[0.98] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-xl shadow-[#D9FF36]/20 cursor-pointer"
          >
            <span>Request Your Estimate</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="tel:9195550184"
            className="w-full sm:w-auto px-7 py-4 text-sm font-bold uppercase tracking-wider text-white bg-[#1B1D19] hover:bg-[#252822] border border-[#2a2c27] rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#D9FF36]" />
            <span>(919) 555-0184 · Demo</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#777970] font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D9FF36]" />
            <span>45-Min On-Site Audit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D9FF36]" />
            <span>Itemized Pricing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D9FF36]" />
            <span>No Pressure Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
