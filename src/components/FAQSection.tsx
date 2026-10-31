import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#111210] border-b border-[#2a2c27]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B1D19] border border-[#2a2c27] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D9FF36]" />
            <span className="text-xs font-mono font-bold text-[#E9E9E2] uppercase tracking-wider">
              CLEAR ANSWERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently asked <span className="text-[#D9FF36]">questions.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#777970] mt-3">
            Direct, practical answers about our inspection process, material lifespans, and on-site protocols.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#1B1D19] border border-[#2a2c27] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#252822]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#111210] border border-[#2a2c27] flex items-center justify-center shrink-0 text-[#E9E9E2] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D9FF36] border-[#D9FF36]/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className="px-6 pb-6 pt-2 text-sm text-[#E9E9E2] leading-relaxed border-t border-[#2a2c27]/60 animate-in fade-in duration-150"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
