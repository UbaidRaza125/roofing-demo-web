import React, { useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111210]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#1B1D19] border border-[#2a2c27] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2c27] bg-[#111210]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#D9FF36] px-2.5 py-1 rounded bg-[#1B1D19] border border-[#2a2c27]">
              SERVICE {service.number}
            </span>
            <h3 id="service-modal-title" className="text-xl font-bold text-white tracking-tight">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777970] hover:text-white rounded-lg hover:bg-[#252822] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-sm sm:text-base text-[#E9E9E2] leading-relaxed">
            {service.fullDescription}
          </p>

          {/* Scope Specifications */}
          <div className="space-y-3 bg-[#111210] p-5 rounded-xl border border-[#2a2c27]">
            <div className="text-xs font-mono font-bold text-[#D9FF36] uppercase tracking-wider">
              SCOPE SPECIFICATIONS & DELIVERABLES:
            </div>
            <div className="space-y-2">
              {service.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E9E9E2]">
                  <CheckCircle className="w-4 h-4 text-[#D9FF36] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#111210] border border-[#2a2c27]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#777970] mb-1">
                <Clock className="w-3.5 h-3.5 text-[#D9FF36]" />
                <span>TYPICAL TIMELINE</span>
              </div>
              <div className="text-sm font-semibold text-white">{service.typicalTimeline}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#111210] border border-[#2a2c27]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#777970] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9FF36]" />
                <span>WARRANTY COVERAGE</span>
              </div>
              <div className="text-sm font-semibold text-white">{service.warranty}</div>
            </div>
          </div>

          <div className="text-xs text-[#777970] bg-[#1B1D19] p-3 rounded-lg border border-[#2a2c27]">
            <span className="font-semibold text-[#E9E9E2]">Recommended for: </span>
            {service.recommendedFor}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#2a2c27] bg-[#111210] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#E9E9E2] hover:text-white transition-colors cursor-pointer"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onRequestService(service.title);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request {service.title} Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
