
import React, { useState, useRef } from 'react';

interface HeroProps {
  onOpenEstimator: () => void;
}

const DISCIPLINES = [
  "Web Development", "UI/UX Design", "Brand Identity", "Interactive Portfolios", "E-Commerce", "Digital Strategy", "Creative Coding", "Product Design", "Launch Management"
];

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const titleRef = useRef<HTMLHeadingElement>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 pt-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-grow flex flex-col justify-center pb-20">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-4 mb-8 opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            <div className="h-[1px] w-12 bg-bronze"></div>
            <span className="text-bronze text-sm font-bold tracking-[0.2em] uppercase">Launch Your Vision</span>
          </div>
          
          <h1 
            ref={titleRef}
            onMouseMove={handleMouseMove}
            style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` } as React.CSSProperties}
            className="hero-title text-[clamp(3.5rem,11vw,13rem)] font-black uppercase text-white mb-4 group cursor-default perspective-1000 spotlight-container"
          >
            <div className="overflow-hidden block py-1">
              <span className="spotlight-text inline-block transition-all duration-1000 group-hover:-translate-x-12 translate-y-[120%] opacity-0 animate-[reveal-up_1.2s_cubic-bezier(0.19,1,0.22,1)_forwards]">WE DESIGN</span>
            </div>
            <div className="overflow-hidden block -mt-[0.2em] py-1">
              <span className="spotlight-text inline-block transition-all duration-1000 group-hover:translate-x-12 translate-y-[120%] opacity-0 text-white animate-[reveal-up_1.2s_cubic-bezier(0.19,1,0.22,1)_0.1s_forwards]">DIGITAL</span>
            </div>
            <div className="overflow-hidden block -mt-[0.2em] py-1">
              <span className="spotlight-text inline-block transition-all duration-1000 group-hover:-translate-x-12 translate-y-[120%] opacity-0 animate-[reveal-up_1.2s_cubic-bezier(0.19,1,0.22,1)_0.2s_forwards] text-bronze-spotlight">REALITIES</span>
            </div>
          </h1>
        </div>

        <div className="max-w-xl opacity-0 animate-[fade-in_1s_ease-out_0.8s_forwards]">
          <p className="text-xl text-slate-400 mb-12 leading-tight font-medium">
            We craft high-end websites and immersive digital identities that transform 
            ambitious startups into market leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={scrollToContact}
              className="px-6 sm:px-12 py-3 sm:py-5 bg-bronze text-white text-base sm:text-lg font-bold rounded-full hover:brightness-110 transition-all active:scale-95 shadow-2xl shadow-bronze/20"
            >
              <span className="whitespace-nowrap">Start Your Project</span>
            </button>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?img=${i+30}`} alt="Creative" />
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Award-winning Designers
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-sm py-4 sm:py-8 marquee-mask opacity-0 animate-[fade-in_1.5s_ease-out_1s_forwards]">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {DISCIPLINES.map((discipline, idx) => (
                    <div key={idx} className="flex items-center px-6 sm:px-16 group">
                      <span className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-[0.15em] text-white/10 group-hover:text-bronze transition-all duration-700 cursor-default">
                    {discipline}
                  </span>
                  <div className="mx-16 w-1.5 h-1.5 rounded-full bg-bronze/20 group-hover:bg-bronze transition-colors duration-700"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes reveal-up { 0% { transform: translateY(120%) rotateX(-20deg) skewY(5deg); opacity: 0; filter: blur(10px); } 100% { transform: translateY(0) rotateX(0deg) skewY(0deg); opacity: 1; filter: blur(0); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-infinite-scroll { animation: infinite-scroll 15s linear infinite; }
        .marquee-mask { -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
        .spotlight-container { position: relative; }
        .spotlight-text { background-image: radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), #ffffff 0%, rgba(255, 255, 255, 0.08) 70%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .text-bronze-spotlight { background-image: radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), #C28E6F 0%, rgba(194, 142, 111, 0.15) 70%); -webkit-background-clip: text; background-clip: text; color: transparent; }
      `}</style>
    </section>
  );
};
