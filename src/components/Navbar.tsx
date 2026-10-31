import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenEstimate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Our Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111210]/95 backdrop-blur-md border-b border-[#2a2c27] py-3.5 shadow-xl'
            : 'bg-gradient-to-b from-[#111210]/80 via-[#111210]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white group whitespace-nowrap shrink-0"
            aria-label="Ridgeline Roofing Co. homepage"
          >
            <div className="w-8 h-8 rounded bg-[#D9FF36] flex items-center justify-center text-[#111210] font-black text-base shadow-sm group-hover:scale-105 transition-transform">
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
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#E9E9E2]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#D9FF36] transition-colors whitespace-nowrap shrink-0 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D9FF36] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Phone CTA */}
          <div className="hidden sm:flex items-center gap-5 shrink-0">
            <a
              href="tel:9195550184"
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#E9E9E2] hover:text-[#D9FF36] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#D9FF36]" />
              <span>(919) 555-0184</span>
              <span className="text-[10px] text-[#777970] uppercase font-mono">(Demo)</span>
            </a>

            <button
              onClick={onOpenEstimate}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] active:scale-[0.98] rounded-md transition-all duration-150 flex items-center gap-1.5 shadow-md shadow-[#D9FF36]/10 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Get a Free Estimate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenEstimate}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] rounded-md"
            >
              Estimate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E9E9E2] hover:text-white rounded-md bg-[#1B1D19] border border-[#2a2c27] focus:outline-none focus:ring-2 focus:ring-[#D9FF36]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#111210]/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 transition-opacity sm:hidden">
          <div className="flex flex-col gap-5 text-lg font-semibold border-b border-[#2a2c27] pb-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white hover:text-[#D9FF36] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#777970]" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-[#E9E9E2] p-3 rounded-lg bg-[#1B1D19] border border-[#2a2c27]">
              <Phone className="w-4 h-4 text-[#D9FF36]" />
              <div>
                <div className="font-semibold">(919) 555-0184</div>
                <div className="text-xs text-[#777970]">Triangle Dispatch Line · Demo</div>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimate();
              }}
              className="w-full py-3.5 text-sm font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] rounded-md flex items-center justify-center gap-2"
            >
              <span>Get a Free Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#777970] mt-4">
              <Shield className="w-3.5 h-3.5 text-[#D9FF36]" />
              <span>Serving Raleigh, Durham, Chapel Hill, Cary NC</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
