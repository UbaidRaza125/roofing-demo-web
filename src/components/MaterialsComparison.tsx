import React, { useState } from 'react';
import { Layers, Shield, Wind, Calendar, Check, X, ArrowRight } from 'lucide-react';
import { MATERIALS } from '../data/mockData';
import { RoofingMaterial } from '../types';

interface MaterialsComparisonProps {
  onSelectMaterial: (materialName: string) => void;
}

export const MaterialsComparison: React.FC<MaterialsComparisonProps> = ({ onSelectMaterial }) => {
  const [filter, setFilter] = useState<'all' | 'asphalt' | 'metal' | 'composite' | 'flat'>('all');

  const filteredMaterials = MATERIALS.filter((m) => {
    if (filter === 'all') return true;
    return m.category === filter;
  });

  return (
    <section id="materials" className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>THE HONEST MATERIAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Six roofs we install,<br />
              <span className="text-[#D9FF36]">compared honestly.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#777970] max-w-md leading-relaxed">
            No proprietary marketing jargon. We lay out real lifespans, wind ratings, and actual trade-offs so you can decide what fits your home.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Materials (6)' },
            { id: 'asphalt', label: 'Architectural Asphalt' },
            { id: 'metal', label: 'Standing Seam Metal' },
            { id: 'composite', label: 'Synthetic Slate' },
            { id: 'flat', label: 'Low-Slope TPO' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer border ${
                filter === tab.id
                  ? 'bg-[#D9FF36] text-[#111210] border-[#D9FF36] shadow-sm'
                  : 'bg-[#1B1D19] border-[#2a2c27] text-[#E9E9E2] hover:text-white hover:border-[#383a35]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-[#1B1D19] border border-[#2a2c27] hover:border-[#D9FF36]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Tag & Cost Tier */}
                <div className="flex items-center justify-between text-xs mb-3 font-mono">
                  <span className="text-[#D9FF36] font-semibold">{mat.tag}</span>
                  <span className="px-2 py-0.5 rounded bg-[#111210] text-[#E9E9E2] border border-[#2a2c27]">
                    Cost: {mat.costTier}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">{mat.name}</h3>
                <p className="text-xs text-[#777970] mb-5 leading-relaxed">{mat.bestFor}</p>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#111210] border border-[#2a2c27] mb-5 text-xs">
                  <div>
                    <div className="text-[10px] text-[#777970] font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D9FF36]" />
                      <span>LIFESPAN</span>
                    </div>
                    <div className="font-bold text-white mt-0.5">{mat.lifespanYears}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#777970] font-mono flex items-center gap-1">
                      <Wind className="w-3 h-3 text-[#D9FF36]" />
                      <span>WIND RATING</span>
                    </div>
                    <div className="font-bold text-white mt-0.5">{mat.windRatingMph} MPH</div>
                  </div>
                </div>

                {/* Honest Pros & Cons */}
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#D9FF36] mb-1.5 font-bold">
                      THE ADVANTAGES:
                    </div>
                    <div className="space-y-1">
                      {mat.pros.slice(0, 2).map((pro, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[#E9E9E2]">
                          <Check className="w-3.5 h-3.5 text-[#D9FF36] shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#777970] mb-1.5 font-bold">
                      THE HONEST TRADE-OFFS:
                    </div>
                    <div className="space-y-1">
                      {mat.cons.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[#777970]">
                          <X className="w-3.5 h-3.5 text-amber-500/80 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-[#2a2c27]">
                <button
                  type="button"
                  onClick={() => onSelectMaterial(mat.name)}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select for Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
