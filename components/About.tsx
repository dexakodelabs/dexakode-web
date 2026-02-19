
import React from 'react';

const STATS = [
  { value: "200+", label: "Sites Launched" },
  { value: "15+", label: "Design Awards" },
  { value: "2x", label: "Faster Load Times" },
  { value: "98%", label: "Client Growth" }
];

export const About: React.FC = () => {
  return (
    <section id="studio" className="relative py-40 px-8 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute right-8 top-20 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        01
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-bronze"></div>
          <span className="text-bronze text-sm font-bold tracking-[0.2em] uppercase">Our Mission</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter mb-12">
              WE TURN IDEAS <br />
              INTO DIGITAL <br />
              <span className="text-bronze">LEGACIES.</span>
            </h2>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-8">
              At DEXACODE, we believe every business deserves a digital presence that reflects its unique soul. We bridge the gap between creative artistry and technical precision to build websites that don't just exist—they inspire.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-16 lg:pt-12">
            {STATS.map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter group-hover:text-bron transition-colors duration-500">
                  {stat.value}
                </div>
                <div className="h-[1px] w-8 bg-bronze/30 mb-4 group-hover:w-full transition-all duration-500"></div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
