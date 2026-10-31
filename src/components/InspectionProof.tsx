import React, { useState } from 'react';
import { Camera, CheckCircle2, FileSearch, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { INSPECTION_IMAGE } from '../data/mockData';

interface InspectionProofProps {
  onOpenEstimate: () => void;
}

export const InspectionProof: React.FC<InspectionProofProps> = ({ onOpenEstimate }) => {
  const [activeTab, setActiveTab] = useState<'flashing' | 'shingles' | 'attic' | 'drone'>('flashing');

  const inspectionDetails = {
    flashing: {
      title: 'Valley Metals & Counter-Flashing Integrity',
      subtitle: 'Where 80% of preventable roof leaks actually begin',
      description: 'Valleys funnel thousands of gallons of Carolina rainwater per storm. We inspect the copper or galvanized metal transitions, step-flashing behind siding, and chimney mortar reglet joints for rusted nails and cracked caulking.',
      findings: ['Step-flashing tucked under siding', 'Lead chimney counter-flashing', 'Ice & water shield barrier check'],
    },
    shingles: {
      title: 'Shingle Mat Flexibility & Granule Density',
      subtitle: 'Assessing remaining protective lifespan with precision',
      description: 'Granules shield the underlying asphalt from solar UV degradation. We test for blistering, wind crease lines across seal strips, and micro-fractures in the fiberglass core that happen after hail impacts.',
      findings: ['Adhesion seal strip strength', 'Thermal shock micro-cracking', 'Wind uplift resistance test'],
    },
    attic: {
      title: 'Attic Decking & Ventilation Analysis',
      subtitle: 'Checking the underside of the deck where moisture hides',
      description: 'An inspection from the outside is only half the story. We crawl into the attic to check for daylight penetration, black mold stains on plywood, rusted decking nails, and intake soffit airflow.',
      findings: ['Baffle airflow from soffit to ridge', 'Decking plywood delamination check', 'Moisture meter percentage readings'],
    },
    drone: {
      title: 'High-Resolution 4K Aerial Scan',
      subtitle: 'Complete 3D geometric roof measurement and slope mapping',
      description: 'Our drone cameras capture 48-megapixel orthomosaic photographs of every ridge, hip, and valley. This gives you exact pitch calculations and square footage without anyone walking on brittle tiles.',
      findings: ['Exact pitch & square footage CAD report', 'Zero damage to fragile architectural tiles', '360° photographic record for insurance'],
    },
  };

  const current = inspectionDetails[activeTab];

  return (
    <section id="inspection" className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3">
              <FileSearch className="w-4 h-4" />
              <span>THE 45-POINT ROOF AUDIT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              45 minutes on your roof,<br />
              <span className="text-[#D9FF36]">report within 24 hours.</span>
            </h2>
          </div>
          <p className="text-base text-[#777970] max-w-md leading-relaxed">
            You see the paperwork before you see the crew. A complete photographic report with zero guesswork, no vague quotes, and no sales pressure.
          </p>
        </div>

        {/* 2-Column Split: Image on Left / Interactive Inspector Checklist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Authentic Inspector Photography with Sample Report Card */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#2a2c27] bg-[#1B1D19] min-h-[420px] flex flex-col justify-end group">
            <img
              src={INSPECTION_IMAGE}
              alt="Roofing inspector in hardhat examining valley metal flashing and roof tiles with digital tablet"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-[#111210]/40 to-transparent" />

            {/* Overlaid Sample Report Card */}
            <div className="relative z-10 m-6 p-5 rounded-lg bg-[#111210]/90 backdrop-blur-md border border-[#2a2c27]">
              <div className="flex items-center justify-between text-xs text-[#777970] mb-2 font-mono">
                <span>INSPECTION ID: #NC-2026-881</span>
                <span className="text-[#D9FF36]">DIGITAL CAD ATTACHED</span>
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                “Every seam, boot, and shingle documented before you spend a dime.”
              </div>
              <div className="flex items-center gap-4 text-xs text-[#E9E9E2] mt-3 pt-3 border-t border-[#2a2c27]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF36]" />
                  <span>35+ High-Res Photos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF36]" />
                  <span>Attic Moisture Scan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF36]" />
                  <span>Transparent Repair Scope</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Selector */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl p-6 sm:p-8 bg-[#1B1D19] border border-[#2a2c27]">
            <div>
              {/* Category Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {(
                  [
                    { id: 'flashing', label: 'Flashing & Valleys' },
                    { id: 'shingles', label: 'Shingles & Mat' },
                    { id: 'attic', label: 'Attic & Decking' },
                    { id: 'drone', label: 'Drone CAD Scan' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                      activeTab === tab.id
                        ? 'bg-[#D9FF36] text-[#111210] shadow-sm font-bold'
                        : 'bg-[#111210] text-[#E9E9E2] hover:bg-[#252822] border border-[#2a2c27]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase text-[#D9FF36] tracking-wider">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{current.title}</h3>
                <p className="text-sm text-[#E9E9E2] leading-relaxed">{current.description}</p>

                {/* Checked items */}
                <div className="pt-4 space-y-2.5">
                  <div className="text-xs font-mono uppercase text-[#777970] tracking-wider">
                    SPECIFIC ITEMS VERIFIED:
                  </div>
                  {current.findings.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#E9E9E2]">
                      <div className="w-5 h-5 rounded-full bg-[#D9FF36]/10 text-[#D9FF36] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-[#2a2c27] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-[#777970]">
                Homeowner presence optional for exterior drone inspections.
              </div>
              <button
                onClick={onOpenEstimate}
                className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Book 45-Min Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
