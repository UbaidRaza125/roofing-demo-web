import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Eye, Building2 } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectShowcaseProps {
  onRequestQuoteForSimilar: (projectTitle: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onRequestQuoteForSimilar }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>TRIANGLE RESIDENTIAL PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Built right.<br />
              <span className="text-[#D9FF36]">Built to last.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#777970] leading-relaxed">
              Every ridge, valley, and rake reflects authentic Carolina residential architectural heritage. Click any residence to inspect the installation specifications.
            </p>
            <div className="text-[11px] text-[#777970] font-mono mt-2">
              * Demo portfolio featuring realistic architectural examples.
            </div>
          </div>
        </div>

        {/* 2x2 Asymmetric Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="group bg-[#1B1D19] border border-[#2a2c27] hover:border-[#D9FF36]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#111210]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D19] via-transparent to-black/30" />

                {/* Overlaid Location Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#111210]/80 border border-[#2a2c27] backdrop-blur-md text-xs font-mono text-white">
                  <MapPin className="w-3 h-3 text-[#D9FF36]" />
                  <span>{project.location}</span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#D9FF36] text-[#111210] font-mono text-[10px] font-bold uppercase">
                  {project.sizeSquares} SQUARES
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF36] mb-2 uppercase">
                    <span>{project.serviceCategory}</span>
                    <span>·</span>
                    <span className="text-[#777970]">{project.completedDate}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5 group-hover:text-[#D9FF36] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#777970] leading-relaxed mb-5 line-clamp-2">
                    {project.summary}
                  </p>

                  <div className="p-3 rounded-lg bg-[#111210] border border-[#2a2c27] text-xs text-[#E9E9E2] mb-5">
                    <span className="text-[#777970] font-mono uppercase text-[10px] block mb-0.5">
                      INSTALLED SYSTEM:
                    </span>
                    <span className="font-semibold">{project.material}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View case details for ${project.title}`}
                  className="w-full py-3 px-4 rounded-lg bg-[#111210] hover:bg-[#252822] border border-[#2a2c27] hover:border-[#D9FF36]/40 text-xs font-bold uppercase tracking-wider text-white hover:text-[#D9FF36] transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>View Project Case Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D9FF36]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuoteForSimilar={onRequestQuoteForSimilar}
      />
    </section>
  );
};
