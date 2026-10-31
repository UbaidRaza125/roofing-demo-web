import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceLinks = [
    { label: 'Roof Replacement', href: '#services' },
    { label: 'Precision Roof Repair', href: '#services' },
    { label: 'Storm Damage Assessment', href: '#services' },
    { label: 'Inspection & Preventive Tune-Up', href: '#services' },
    { label: 'Cost Estimator Calculator', href: '#calculator' },
  ];

  const companyLinks = [
    { label: 'Our Work & Portfolio', href: '#work' },
    { label: 'The 5-Step Process', href: '#process' },
    { label: 'About Marcus & Our Crew', href: '#about' },
    { label: 'Honest Material Matrix', href: '#materials' },
    { label: 'Frequently Asked Questions', href: '#faq' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111210] text-[#E9E9E2] border-t border-[#2a2c27] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2a2c27]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#D9FF36] flex items-center justify-center text-[#111210] font-black text-base">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m3 16 9-9 9 9" />
                  <path d="M7 12V20h10V12" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white uppercase font-sans">
                  RIDGELINE
                </span>
                <span className="text-[10px] tracking-widest text-[#777970] font-medium uppercase -mt-1">
                  Roofing Co.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#777970] leading-relaxed max-w-sm">
              Built to protect. Designed to last. Premium residential roofing contractor serving Durham, Raleigh, Chapel Hill, and Cary with uncompromising craftsmanship.
            </p>

            <div className="p-3 rounded-lg bg-[#1B1D19] border border-[#2a2c27] text-xs text-[#777970] leading-relaxed">
              <span className="text-[#D9FF36] font-mono font-bold">PORTFOLIO DEMONSTRATION:</span>
              <p className="mt-1">
                This website is a professional design demonstration for pitching residential roofing businesses. All company entities, certifications, and testimonials are realistic fictional demo content.
              </p>
            </div>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              SERVICES & SOLUTIONS
            </div>
            <ul className="space-y-2 text-xs text-[#777970]">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-[#D9FF36] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              COMPANY
            </div>
            <ul className="space-y-2 text-xs text-[#777970]">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-[#D9FF36] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Col */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              TRIANGLE DISPATCH
            </div>
            <div className="space-y-2.5 text-xs text-[#777970]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D9FF36] shrink-0" />
                <span>Durham, NC 27701 (Service Area)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D9FF36] shrink-0" />
                <a href="tel:9195550184" className="hover:text-white transition-colors">
                  (919) 555-0184 (Fictional Demo)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D9FF36] shrink-0" />
                <span>estimates@ridgelineroofingdemo.com</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#777970]">
              <strong>Hours:</strong> Mon–Fri 7:00am – 6:00pm<br />
              Emergency Storm Dispatch Available 24/7
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777970]">
          <div>
            © {new Date().getFullYear()} Ridgeline Roofing Co. Demo Portfolio. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenEstimate}
              className="text-[#D9FF36] hover:underline font-semibold cursor-pointer"
            >
              Get Free Estimate
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
