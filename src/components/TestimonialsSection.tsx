import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase mb-3">
              HOMEOWNER VOICES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Honest work leaves{' '}
              <span className="text-[#D9FF36]">lasting words.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#777970] font-mono mr-2">
              SAMPLE TESTIMONIALS (DEMO DATA)
            </span>
            <button
              onClick={prev}
              className="p-3 rounded-lg bg-[#1B1D19] border border-[#2a2c27] hover:border-[#D9FF36] text-white hover:text-[#D9FF36] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-lg bg-[#1B1D19] border border-[#2a2c27] hover:border-[#D9FF36] text-white hover:text-[#D9FF36] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#1B1D19] border border-[#2a2c27] rounded-3xl p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto shadow-2xl">
          <Quote className="w-12 h-12 text-[#D9FF36]/30 mb-6" />

          {/* Testimonial Quote */}
          <blockquote className="text-lg sm:text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8">
            “{current.quote}”
          </blockquote>

          {/* Author info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-[#2a2c27]">
            <div>
              <div className="text-base sm:text-lg font-bold text-white">{current.author}</div>
              <div className="flex items-center gap-2 text-xs text-[#777970] mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#D9FF36]" />
                <span>{current.location}</span>
                <span>·</span>
                <span>{current.projectType}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#D9FF36] font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>COMPLETED {current.completedYear}</span>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === i ? 'w-8 bg-[#D9FF36]' : 'w-2 bg-[#2a2c27] hover:bg-[#383a35]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
