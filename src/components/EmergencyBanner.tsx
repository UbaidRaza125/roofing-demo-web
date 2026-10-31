import React, { useState } from 'react';
import { AlertTriangle, Phone, ChevronRight, CheckCircle, ShieldAlert } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenEstimate: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEstimate }) => {
  const [showChecklist, setShowChecklist] = useState(false);

  return (
    <section className="bg-[#1B1D19] border-y border-[#2a2c27] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Header & Prompt */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>URGENT WEATHER & LEAK RESPONSE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Water coming in right now? Hail or high wind last night?
            </h2>
            <p className="text-sm text-[#777970] mt-1.5 leading-relaxed">
              Active leaks don’t wait for Monday morning. Follow immediate containment steps and request emergency stabilization.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#111210] hover:bg-[#252822] border border-[#2a2c27] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-expanded={showChecklist}
            >
              <span>{showChecklist ? 'Hide Emergency Protocol' : 'View 3-Step Protocol'}</span>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${showChecklist ? 'rotate-90' : ''}`}
              />
            </button>

            <a
              href="tel:9195550184"
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-md transition-all flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Emergency Dispatch: (919) 555-0184</span>
            </a>
          </div>
        </div>

        {/* Expandable 3-Step Immediate Checklist */}
        {showChecklist && (
          <div className="mt-6 pt-6 border-t border-[#2a2c27] grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-lg bg-[#111210] border border-[#2a2c27] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36]">
                <span>STEP 01</span>
                <span className="text-[#777970]">· CONTAINMENT</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Relieve ceiling water pressure</h4>
              <p className="text-xs text-[#777970] leading-relaxed">
                Place a catch basin beneath any sagging drywall. Gently pierce the center with a screwdriver to channel water and prevent structural ceiling collapse.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111210] border border-[#2a2c27] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36]">
                <span>STEP 02</span>
                <span className="text-[#777970]">· EVIDENCE</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Document with timestamps</h4>
              <p className="text-xs text-[#777970] leading-relaxed">
                Take video and photos of water ingress, attic moisture, and fallen exterior shingles before moving items. Your insurance adjuster requires date-stamped records.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111210] border border-[#2a2c27] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36]">
                <span>STEP 03</span>
                <span className="text-[#777970]">· STABILIZATION</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Dispatch certified emergency tarp</h4>
              <p className="text-xs text-[#777970] leading-relaxed">
                Call our Triangle dispatch team. We deploy emergency water-tight shrink-wrapping and sandbagged tarps to safeguard framing until full repairs commence.
              </p>
              <button
                onClick={onOpenEstimate}
                className="mt-2 text-xs font-semibold text-[#D9FF36] hover:underline self-start flex items-center gap-1 cursor-pointer"
              >
                <span>Request urgent inspection form</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
