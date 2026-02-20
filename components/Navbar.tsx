
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-6 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-10 bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tighter uppercase cursor-pointer">DEXACODE</span>
        </div>

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

        <button 
          onClick={onOpenEstimator}
          className="group px-4 sm:px-8 py-2 sm:py-3 rounded-full border border-white/20 text-sm sm:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#C28E6F] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:border-white transition-all flex items-center gap-2 active:scale-95 min-w-[120px] md:min-w-[180px] justify-center overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:scale-110">
            Let's Talk
          </span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};
