
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenEstimator: () => void;
}

const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Studio', href: '#studio' },
  { name: 'Services', href: '#services' },
  { name: 'Journal', href: '#journal' }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-6 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 md:py-10 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg md:text-2xl font-black tracking-tighter uppercase cursor-pointer">DEXACODE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 text-sm font-medium tracking-wide">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="relative group text-slate-400 hover:text-white transition-all duration-300 py-1 flex items-center h-8"
              >
                <span className="inline-block transition-transform duration-300 group-hover:scale-110">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C28E6F] shadow-[0_0_15px_rgba(194,142,111,0.8)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* CTA Button */}
            <button 
              onClick={onOpenEstimator}
              className="group px-3 md:px-8 py-2 md:py-3 rounded-full border border-white/20 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#C28E6F] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:border-white transition-all flex items-center gap-1 md:gap-2 active:scale-95 min-w-fit md:min-w-[180px] justify-center overflow-hidden"
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-110">
                Let's Talk
              </span>
              <svg className="w-3 md:w-4 h-3 md:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>

            {/* Mobile Hamburger Button - Premium Animation */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 group relative"
            >
              <div 
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                  mobileMenuOpen 
                    ? 'rotate-45 translate-y-[11px] shadow-lg shadow-white/30' 
                    : 'group-hover:shadow-md group-hover:shadow-white/20'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
              ></div>
              <div 
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-400 ease-out ${
                  mobileMenuOpen 
                    ? 'opacity-0 scale-0' 
                    : 'opacity-100 scale-100 group-hover:shadow-md group-hover:shadow-white/20'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
              ></div>
              <div 
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                  mobileMenuOpen 
                    ? '-rotate-45 -translate-y-[11px] shadow-lg shadow-white/30' 
                    : 'group-hover:shadow-md group-hover:shadow-white/20'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
              ></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-full md:hidden bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col pt-24 px-6 space-y-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-2xl font-black uppercase tracking-tight text-white hover:text-bronze transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8 border-t border-white/10">
            <button
              onClick={() => {
                onOpenEstimator();
                closeMobileMenu();
              }}
              className="w-full py-4 bg-bronze text-white font-black uppercase tracking-widest rounded-full hover:brightness-110 transition-all"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
};
