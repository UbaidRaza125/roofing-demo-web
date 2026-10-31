import React, { useState } from 'react';
import { ArrowUpRight, Check, Hammer, Wrench, CloudLightning, Shield } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEstimate,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'replacement':
        return <Hammer className="w-5 h-5 text-[#D9FF36]" />;
      case 'repair':
        return <Wrench className="w-5 h-5 text-[#D9FF36]" />;
      case 'storm':
        return <CloudLightning className="w-5 h-5 text-[#D9FF36]" />;
      default:
        return <Shield className="w-5 h-5 text-[#D9FF36]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3">
              WHAT WE DO BEST
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Roofing services built on{' '}
              <span className="text-[#D9FF36]">craft, not shortcuts.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#777970] max-w-md leading-relaxed">
            From surgical leak repairs to full architectural roof replacements, we treat every rafter, valley, and fastener with complete engineering discipline.
          </p>
        </div>

        {/* 4-Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#1B1D19] border border-[#2a2c27] hover:border-[#D9FF36]/60 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D9FF36]/5"
            >
              <div>
                {/* Header row with editorial number and icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-[#777970] group-hover:text-[#D9FF36] transition-colors">
                    {service.number}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#111210] border border-[#2a2c27] flex items-center justify-center group-hover:border-[#D9FF36]/40 transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-[#D9FF36] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#777970] leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Bullets Preview */}
                <div className="space-y-2 pt-4 border-t border-[#2a2c27]">
                  {service.bullets.slice(0, 2).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#E9E9E2]">
                      <Check className="w-3.5 h-3.5 text-[#D9FF36] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-8 pt-4 border-t border-[#2a2c27] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  aria-label={`Explore ${service.title} details`}
                  className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#D9FF36] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <span className="text-[11px] font-mono text-[#777970]">
                  {service.id === 'replacement' ? '1–2 Days' : 'Same Day'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestService={onSelectServiceForEstimate}
      />
    </section>
  );
};
