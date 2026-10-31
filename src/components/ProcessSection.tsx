import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

interface ProcessSectionProps {
  onOpenEstimate: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenEstimate }) => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>THE FIVE-PHASE PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Down to the deck<br />
              <span className="text-[#D9FF36]">and back again.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#777970] max-w-md leading-relaxed">
            Roofing shouldn’t be a mystery. Here is how your project runs day-by-day with zero unexpected costs, zero abandoned materials, and clear daily check-ins.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#111210] border border-[#2a2c27] hover:border-[#D9FF36]/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-[#D9FF36]">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#777970]">PHASE {idx + 1}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight mb-2.5 group-hover:text-[#D9FF36] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#777970] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Commitment */}
              <div className="pt-4 border-t border-[#2a2c27] flex items-start gap-2 text-[11px] text-[#E9E9E2]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF36] shrink-0 mt-0.5" />
                <span className="font-medium text-[#D9FF36]/90">{step.commitment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Promise */}
        <div className="mt-12 p-6 rounded-2xl bg-[#111210] border border-[#2a2c27] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D9FF36]/10 text-[#D9FF36] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Our Zero-Nail Ground Guarantee</div>
              <div className="text-xs text-[#777970]">
                We roll dual high-powered industrial magnetic sweeps across your driveway, lawn, and flowerbeds twice daily.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenEstimate}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Start with Phase 01</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
