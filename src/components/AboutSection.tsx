import React from 'react';
import { ArrowRight, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';
import { SUPERVISOR_IMAGE } from '../data/mockData';

interface AboutSectionProps {
  onOpenEstimate: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimate }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Crew Snapshot */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2a2c27] bg-[#111210] shadow-2xl">
              <img
                src={SUPERVISOR_IMAGE}
                alt="Marcus Vance, Senior Field Inspector and Co-Founder at Ridgeline Roofing Co."
                className="w-full h-[480px] object-cover object-top filter brightness-[0.92]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-transparent to-transparent" />

              {/* Overlaid Quote Plaque */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#111210]/95 backdrop-blur-md border border-[#2a2c27]">
                <div className="text-white text-sm font-semibold italic mb-1.5 leading-snug">
                  “If I wouldn’t put my name on the report, it doesn’t leave my clipboard.”
                </div>
                <div className="flex items-center justify-between text-xs text-[#777970] pt-2 border-t border-[#2a2c27]">
                  <span className="font-bold text-[#E9E9E2]">Marcus Vance</span>
                  <span className="font-mono text-[#D9FF36]">FIELD SUPERVISOR</span>
                </div>
              </div>
            </div>

            {/* Accent Corner Tag */}
            <div className="hidden sm:flex absolute -top-4 -right-4 p-3 bg-[#D9FF36] text-[#111210] rounded-xl font-mono text-xs font-bold shadow-lg">
              IN-HOUSE CREWS ONLY
            </div>
          </div>

          {/* Right Column: Brand Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>THE RIDGELINE STANDARD</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Good roofing starts with{' '}
              <span className="text-[#D9FF36]">doing things right.</span>
            </h2>

            <p className="text-base text-[#E9E9E2] leading-relaxed">
              In an industry too often plagued by storm-chasing sales crews and sub-contracted roulette, Ridgeline was formed around a simple conviction: the person who inspects your roof should be the person accountable for its build.
            </p>

            <p className="text-sm text-[#777970] leading-relaxed">
              We operate exclusively in the Research Triangle region. We maintain our own certified installers, carry comprehensive general liability and workers’ compensation, and never bill until your final walkthrough is complete.
            </p>

            {/* Credibility Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2a2c27]">
              <div className="p-4 rounded-xl bg-[#111210] border border-[#2a2c27]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF36] mb-1 font-bold">
                  <Users className="w-4 h-4" />
                  <span>DEDICATED SITE FOREMAN</span>
                </div>
                <div className="text-xs text-[#777970] leading-relaxed">
                  An English-speaking site foreman remains on your property from the first nail strip to the final dumpster haul.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111210] border border-[#2a2c27]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF36] mb-1 font-bold">
                  <Award className="w-4 h-4" />
                  <span>MANUFACTURER MASTER INSTALLER</span>
                </div>
                <div className="text-xs text-[#777970] leading-relaxed">
                  Certified to offer full 50-year non-prorated system warranties backed directly by material makers.
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2">
              {[
                'Full tarping armor over AC condensers, decks, and landscape shrubbery',
                'Pre-agreed transparent per-sheet plywood replacement rates ($85/sheet)',
                '100% itemized estimates before a single hammer is lifted',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#E9E9E2]">
                  <CheckCircle2 className="w-4 h-4 text-[#D9FF36] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenEstimate}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request On-Site Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-[#777970] font-mono text-center sm:text-left">
                * Ridgeline Roofing Co. is a demo concept for website client presentation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
