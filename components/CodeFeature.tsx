
import React, { useState, useEffect, useRef } from 'react';

const CODE_CONTENT = `import React from 'react';
import { motion } from 'framer-motion';

export const NexusHero: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="hero-container"
    >
      <h1>Designing Digital Realities</h1>
      <button onClick={() => launch()}>
        Go Online
      </button>
    </motion.div>
  );
};`;

const TerminalNetworkCard: React.FC<{ activated: boolean }> = ({ activated }) => {
  const getBarColor = (index: number) => {
    switch(index) {
      case 3: return 'bg-[#7DD3FC] shadow-[0_0_10px_rgba(125,211,252,0.3)]';
      case 4: return 'bg-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.4)]';
      case 5: return 'bg-[#0EA5E9] shadow-[0_0_20px_rgba(14,165,233,0.5)]';
      default: return 'bg-white/10';
    }
  };
  return (
    <div className={`absolute -left-12 top-1/4 z-30 w-52 bg-[#0A0A0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out hover:scale-110 hover:border-bronze/30 cursor-pointer group/card ${activated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#38BDF8] font-black text-xs">$</span>
          <span className="text-[10px] font-bold text-white/40 tracking-[0.15em]">CORE_ENGINE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[9px] font-black text-emerald-500/80 tracking-widest uppercase">READY</span>
        </div>
      </div>
      <div className="flex items-end justify-between h-12 gap-1 mb-6 px-1">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`w-1.5 rounded-full transition-all duration-700 ease-in-out ${getBarColor(i)}`} style={{ height: '100%', animation: `wave-bars 1.2s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }}></div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Perf Score</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-black text-white/90">100</span>
          <span className="text-[8px] font-bold text-white/30">/100</span>
        </div>
      </div>
    </div>
  );
};

const ProductionReadyCard: React.FC<{ activated: boolean }> = ({ activated }) => (
  <div className={`absolute -right-12 top-[42%] z-30 w-52 bg-[#0A0A0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out hover:scale-110 hover:border-bronze/30 cursor-pointer group/card ${activated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="text-[#38BDF8] font-black text-xs">$</span>
        <span className="text-[10px] font-bold text-white/40 tracking-[0.15em]">DEPLOYMENT</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
        <span className="text-[9px] font-black text-emerald-500/80 tracking-widest uppercase">LIVE</span>
      </div>
    </div>
    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center"><span className="text-[9px] text-white/20 uppercase font-black tracking-widest">UX Audit</span><span className="text-[9px] text-emerald-400 font-black">PASSED</span></div>
      <div className="flex justify-between items-center"><span className="text-[9px] text-white/20 uppercase font-black tracking-widest">SEO</span><span className="text-[9px] text-white/80 font-black">OPTIMIZED</span></div>
      <div className="w-full bg-white/5 h-[1.5px] rounded-full overflow-hidden mt-1"><div className="h-full bg-emerald-500/40 w-[95%]"></div></div>
    </div>
    <div className="pt-2 border-t border-white/5"><div className="flex flex-col"><span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Build</span><span className="text-[10px] font-bold text-white/40">production.v1.2</span></div></div>
  </div>
);

export const CodeFeature: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [hoverChars, setHoverChars] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - rect.top) / (rect.height * 0.7)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timer: number;
    if (isHovered) {
      timer = window.setInterval(() => setHoverChars(v => Math.min(v + 10, CODE_CONTENT.length)), 20);
    }
    return () => clearInterval(timer);
  }, [isHovered]);

  const charCount = Math.max(Math.floor(progress * CODE_CONTENT.length), hoverChars);
  const displayed = CODE_CONTENT.slice(0, charCount);
  const lines = displayed.split('\n');

  const highlight = (code: string) => {
    const regex = /(@[a-zA-Z]+)|(".*?")|\b(import|export|const|return|class|void|interface|function|let|async|from)\b|\b(React|motion|NexusHero|FC)\b|\b(initial|animate|transition|onClick|launch)\b(?=\()/g;

    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(regex, (match, annotation, string, keyword, type, method) => {
        if (annotation) return `<span class="text-indigo-400 font-bold">${annotation}</span>`;
        if (string) return `<span class="text-amber-300">${string}</span>`;
        if (keyword) return `<span class="text-blue-400 font-bold">${keyword}</span>`;
        if (type) return `<span class="text-emerald-400 font-medium">${type}</span>`;
        if (method) return `<span class="text-white">${method}</span>`;
        return match;
      });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] bg-[#080808] overflow-hidden flex flex-col items-center pt-28 pb-28">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-squares"></div>
      
      <div className="sticky top-0 h-screen flex items-center justify-center w-full max-w-7xl px-4">
        <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <TerminalNetworkCard activated={progress > 0.2} />
          <ProductionReadyCard activated={progress > 0.4} />
          
          <div className="absolute -inset-[1px] rounded-[3.1rem] overflow-hidden pointer-events-none z-0">
            <div 
              className="absolute inset-[-150%] animate-border-beam opacity-80"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0 335deg, #C28E6F 350deg, transparent 360deg)',
              }}
            />
          </div>

          <div className="relative glass rounded-[3rem] overflow-hidden border border-white/5 flex flex-col h-[580px] backdrop-blur-3xl bg-[#0A0A0B]/98 shadow-2xl transition-all duration-700 hover:border-bronze/10 z-10">
            <div className="flex items-center gap-6 px-10 py-6 bg-white/[0.03] border-b border-white/5">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/60"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/60"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/60"></div>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">ENGINEERING / <span className="text-white">NEXUSHERO.TSX</span></span>
            </div>

            <div className="flex flex-1 overflow-hidden font-mono text-[13px] md:text-sm leading-[1.7] px-10 py-8">
              <div className="w-12 text-slate-700 select-none hidden md:block">
                {[...Array(Math.max(22, lines.length))].map((_, i) => (
                  <div key={i} className="transition-opacity duration-500" style={{ opacity: i < lines.length ? 0.6 : 0.1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>
              <div className="flex-1 text-slate-300 relative overflow-y-auto scrollbar-hide">
                {lines.map((line, i) => (
                  <div key={i} className="min-h-[1.7em] relative flex items-baseline">
                    <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                    {i === lines.length - 1 && charCount < CODE_CONTENT.length && (
                      <span className="inline-block w-[12px] h-[1.2em] bg-[#C28E6F] shadow-[0_0_20px_rgba(194,142,111,0.8)] ml-1 translate-y-[0.2em] animate-cursor-blink rounded-sm" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave-bars { 0%, 100% { height: 30%; } 50% { height: 100%; } }
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
        @keyframes border-beam {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-border-beam {
          animation: border-beam 4s linear infinite;
        }
        .animate-cursor-blink { animation: cursor-blink 0.65s step-end infinite; }
        .bg-squares { background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
