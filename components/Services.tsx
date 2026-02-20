
import React from 'react';

const SERVICE_DATA = [
  {
    title: "WEB DEVELOPMENT",
    desc: "Bespoke, high-performance web applications built with modern frameworks to ensure speed and scalability.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
  },
  {
    title: "UI/UX DESIGN",
    desc: "Immersive, user-centric interfaces that blend aesthetic beauty with functional precision for maximum conversion.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
  },
  {
    title: "DIGITAL PORTFOLIOS",
    desc: "Custom showcases for creators and luxury brands that command attention and define professional identity.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
  },
  {
    title: "BUSINESS LAUNCH",
    desc: "Comprehensive digital solutions designed to take your business from concept to online success in record time.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-40 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-bronze"></div>
          <span className="text-bronze text-sm font-bold tracking-[0.2em] uppercase">Services</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter">
            THE ART OF <br />
            <span className="text-bronze">DIGITAL</span> <br />
            DOMINANCE.
          </h2>
          <p className="text-xl text-slate-400 font-medium self-end max-w-lg">
            We help ambitious brands launch and grow through 
            unmatched technical craft and creative vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {SERVICE_DATA.map((s, i) => (
            <div key={i} className="group p-12 glass hover:bg-white/[0.05] transition-all duration-700">
              <div className="w-16 h-16 rounded-full border border-bronze/20 flex items-center justify-center text-bronze mb-12 group-hover:bg-bronze group-hover:text-white transition-all duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={s.icon}></path>
                </svg>
              </div>
              <h4 className="text-xl font-black mb-6 tracking-tight">{s.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
