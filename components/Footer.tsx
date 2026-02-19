
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-8 border-t border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black tracking-tighter uppercase">DEXACODE</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs font-medium">© 2024 DEXACODE Premium Web Development & UI/UX Agency. All rights reserved. Crafting legacies worldwide.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Navigation</span>
            <div className="flex flex-col gap-3 text-sm font-bold text-slate-400">
              <a href="#work" className="hover:text-white transition-colors">Works</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#contact" className="hover:text-white transition-colors">Launch</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Social</span>
            <div className="flex flex-col gap-3 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
              <a href="#" className="hover:text-white transition-colors">X / Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
