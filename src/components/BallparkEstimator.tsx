import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check, HelpCircle, Info } from 'lucide-react';
import { calculateBallparkRoofCost, formatCurrency } from '../utils/calculator';
import { BallparkInputs } from '../types';
import { MATERIALS } from '../data/mockData';

interface BallparkEstimatorProps {
  onLockInEstimate: (data: {
    sqft: number;
    materialId: string;
    estimateRange: string;
  }) => void;
}

export const BallparkEstimator: React.FC<BallparkEstimatorProps> = ({ onLockInEstimate }) => {
  const [inputs, setInputs] = useState<BallparkInputs>({
    squareFootage: 2400,
    pitch: 'moderate',
    stories: 2,
    materialId: 'arch_shingle',
    includeTearOff: true,
  });

  const calculation = useMemo(() => {
    return calculateBallparkRoofCost(inputs);
  }, [inputs]);

  const selectedMaterial = useMemo(() => {
    return MATERIALS.find((m) => m.id === inputs.materialId) || MATERIALS[0];
  }, [inputs.materialId]);

  const handleLockIn = () => {
    onLockInEstimate({
      sqft: inputs.squareFootage,
      materialId: inputs.materialId,
      estimateRange: `${formatCurrency(calculation.lowEstimate)} – ${formatCurrency(calculation.highEstimate)}`,
    });
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#2a2c27] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111210] border border-[#2a2c27] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#D9FF36]" />
            <span className="text-xs font-mono font-bold text-[#E9E9E2] uppercase tracking-wider">
              REALISTIC COST TRANSPARENCY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ballpark your roof in <span className="text-[#D9FF36]">under a minute.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#777970] mt-3">
            No sales calls required. Select your home parameters below to generate an immediate material and labor price band for the Triangle area.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#111210] border border-[#2a2c27] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-7">
              {/* 1. Square Footage Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="sqft-slider" className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>Home Living Area (Square Feet)</span>
                    <span className="text-xs text-[#777970] font-normal">Approximate</span>
                  </label>
                  <span className="text-lg font-mono font-bold text-[#D9FF36] tabular-nums">
                    {inputs.squareFootage.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  id="sqft-slider"
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={inputs.squareFootage}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, squareFootage: Number(e.target.value) }))
                  }
                  className="w-full h-2 bg-[#2a2c27] rounded-lg appearance-none cursor-pointer accent-[#D9FF36]"
                />
                <div className="flex justify-between text-[11px] text-[#777970] mt-1 font-mono">
                  <span>1,000 sq ft</span>
                  <span>2,500 sq ft</span>
                  <span>4,000 sq ft</span>
                  <span>5,000 sq ft</span>
                </div>
              </div>

              {/* 2. Roof Pitch Selector */}
              <div>
                <div className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Roof Pitch / Slope</span>
                  <span className="text-xs text-[#777970] font-normal">Affects roof surface area</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'low', label: 'Low Pitch', desc: 'Ranch / Walkable (4:12)' },
                    { id: 'moderate', label: 'Moderate', desc: 'Standard Colonial (6-8:12)' },
                    { id: 'steep', label: 'Steep Pitch', desc: 'Dramatic Gables (9:12+)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        setInputs((prev) => ({
                          ...prev,
                          pitch: p.id as 'low' | 'moderate' | 'steep',
                        }))
                      }
                      className={`p-3 rounded-lg text-left transition-all cursor-pointer border ${
                        inputs.pitch === p.id
                          ? 'bg-[#1B1D19] border-[#D9FF36] text-white shadow-sm'
                          : 'bg-[#111210] border-[#2a2c27] text-[#777970] hover:text-white hover:border-[#383a35]'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-0.5">{p.label}</div>
                      <div className="text-[11px] text-[#777970] leading-tight">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Number of Stories */}
              <div>
                <div className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Building Stories</span>
                  <span className="text-xs text-[#777970] font-normal">Safety staging & roof access</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {([1, 2, 3] as const).map((story) => (
                    <button
                      key={story}
                      type="button"
                      onClick={() => setInputs((prev) => ({ ...prev, stories: story }))}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer border ${
                        inputs.stories === story
                          ? 'bg-[#D9FF36] text-[#111210] border-[#D9FF36] font-bold'
                          : 'bg-[#1B1D19] border-[#2a2c27] text-[#E9E9E2] hover:text-white'
                      }`}
                    >
                      {story} {story === 1 ? 'Story' : 'Stories'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Material Selection */}
              <div>
                <div className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Roofing Material</span>
                  <span className="text-xs text-[#D9FF36] font-mono">{selectedMaterial.lifespanYears}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MATERIALS.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setInputs((prev) => ({ ...prev, materialId: mat.id }))}
                      className={`p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                        inputs.materialId === mat.id
                          ? 'bg-[#1B1D19] border-[#D9FF36] text-white shadow-sm'
                          : 'bg-[#111210] border-[#2a2c27] text-[#777970] hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold text-white truncate">{mat.name}</div>
                      <div className="text-[10px] text-[#777970] flex items-center justify-between mt-1">
                        <span>{mat.costTier}</span>
                        <span>{mat.windRatingMph} mph</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Tear-off toggle */}
              <div className="pt-2 border-t border-[#2a2c27] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">
                    Include full tear-off to wood decking
                  </span>
                  <span className="text-[11px] text-[#777970]">
                    Includes dumpster rental, haul away, safety tarps & magnetic sweep
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setInputs((prev) => ({ ...prev, includeTearOff: !prev.includeTearOff }))
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    inputs.includeTearOff ? 'bg-[#D9FF36]' : 'bg-[#2a2c27]'
                  }`}
                  aria-label="Toggle tear off inclusion"
                >
                  <div
                    className={`bg-[#111210] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      inputs.includeTearOff ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Halden-Signature Lime Accent Result Card */}
          <div className="lg:col-span-5 bg-[#D9FF36] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-[#111210] shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase mb-6 border-b border-[#111210]/20 pb-3">
                <span>ESTIMATED BALLPARK RANGE</span>
                <span className="bg-[#111210] text-[#D9FF36] px-2 py-0.5 rounded text-[10px]">
                  TRIANGLE NC RATES
                </span>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-widest text-[#111210]/70 mb-1">
                  What would a new roof cost?
                </div>
                <div className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight font-mono">
                  {formatCurrency(calculation.lowEstimate)} – {formatCurrency(calculation.highEstimate)}
                </div>
                <div className="text-xs font-medium text-[#111210]/80 mt-2 flex items-center gap-2">
                  <span>Based on ~{calculation.estimatedSquares} roof squares</span>
                  <span>·</span>
                  <span>{selectedMaterial.name}</span>
                </div>
              </div>

              {/* Itemized Estimate Breakdown */}
              <div className="space-y-3 bg-[#111210]/5 p-4 rounded-xl border border-[#111210]/15 mb-6 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#111210]">Materials & Synthetic Barrier:</span>
                  <span className="font-mono font-bold">
                    {formatCurrency(calculation.breakdown.materialCostRange[0])} –{' '}
                    {formatCurrency(calculation.breakdown.materialCostRange[1])}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#111210]">Installation Labor & Safety:</span>
                  <span className="font-mono font-bold">
                    {formatCurrency(calculation.breakdown.laborAndInstallRange[0])} –{' '}
                    {formatCurrency(calculation.breakdown.laborAndInstallRange[1])}
                  </span>
                </div>
                {inputs.includeTearOff && (
                  <div className="flex justify-between items-center pt-2 border-t border-[#111210]/10">
                    <span className="font-semibold text-[#111210]">Tear-off, Disposal & Sweep:</span>
                    <span className="font-mono font-bold">
                      {formatCurrency(calculation.breakdown.tearOffAndDisposal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Trust Notes */}
              <div className="space-y-1.5 text-[11px] text-[#111210]/80">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Includes drip edge, starter strip & synthetic underlayment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Valid for 30 days upon physical inspection confirmation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Clear demo pricing · No obligation quote</span>
                </div>
              </div>
            </div>

            {/* Lock-In Button */}
            <div className="mt-8 pt-4 border-t border-[#111210]/20">
              <button
                type="button"
                onClick={handleLockIn}
                className="w-full py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#D9FF36] bg-[#111210] hover:bg-[#252822] active:scale-[0.98] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Lock In This Estimate for Free Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
