import React, { useEffect } from 'react';
import { X, MapPin, CheckCircle, Calendar, Home, Layers, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuoteForSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuoteForSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111210]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#1B1D19] border border-[#2a2c27] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.9]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D19] via-transparent to-black/50" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#111210]/80 text-[#E9E9E2] hover:text-white rounded-full hover:bg-[#111210] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and location tag on image bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF36] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location}</span>
              <span className="text-[#777970]">· SAMPLE PROJECT</span>
            </div>
            <h3 id="project-modal-title" className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-sm sm:text-base text-[#E9E9E2] leading-relaxed">
            {project.summary}
          </p>

          {/* Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111210] border border-[#2a2c27] text-xs">
            <div>
              <div className="text-[10px] text-[#777970] font-mono">SERVICE</div>
              <div className="font-semibold text-white mt-0.5">{project.serviceCategory}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#777970] font-mono">PITCH & PROFILE</div>
              <div className="font-semibold text-white mt-0.5">{project.roofPitch}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#777970] font-mono">AREA SIZE</div>
              <div className="font-semibold text-white mt-0.5">{project.sizeSquares} Squares</div>
            </div>
            <div>
              <div className="text-[10px] text-[#777970] font-mono">COMPLETED</div>
              <div className="font-semibold text-white mt-0.5">{project.completedDate}</div>
            </div>
          </div>

          {/* Material Specs */}
          <div className="p-4 rounded-xl bg-[#111210] border border-[#2a2c27]">
            <div className="text-xs font-mono font-bold text-[#D9FF36] mb-1">INSTALLED SYSTEM:</div>
            <div className="text-sm font-semibold text-white">{project.material}</div>
          </div>

          {/* Key Craft Highlights */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-[#777970] uppercase">
              CRAFTSMANSHIP HIGHLIGHTS:
            </div>
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#E9E9E2]">
                <CheckCircle className="w-4 h-4 text-[#D9FF36] shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#777970] font-mono italic">
            * Note: Fictional project portfolio piece created for demonstration purposes. All architectural photography demonstrates real construction craft.
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-[#2a2c27] bg-[#111210] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#E9E9E2] hover:text-white transition-colors cursor-pointer"
          >
            Back to Showcase
          </button>
          <button
            onClick={() => {
              onRequestQuoteForSimilar(project.title);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Estimate for Similar Roof</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
