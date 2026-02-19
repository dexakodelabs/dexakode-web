
import React, { useEffect, useState, useRef } from 'react';

const UptimeSLACard: React.FC = () => {
  const [uptime, setUptime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = 99.99;
    const duration = 800; // Increased speed from 2000ms to 800ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Using a slightly more aggressive ease-out for a snappier feel
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const currentUptime = easeOutQuart(progress) * end;

      setUptime(currentUptime);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setUptime(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  // Precise bar configuration to match screenshot: [height, color_opacity]
  const barConfigs = [
    [0.45, 0.3],  [0.65, 0.08], [0.35, 0.3],  [0.85, 0.6], 
    [0.55, 0.08], [0.42, 0.3],  [0.72, 0.6],  [0.92, 1.0], 
    [0.62, 0.08], [0.38, 0.3],  [0.82, 0.6],  [0.48, 0.08], 
    [0.75, 0.3],  [0.95, 0.6],  [0.52, 0.08], [0.68, 0.3], 
    [0.88, 0.6],  [0.44, 0.08], [0.58, 0.3],  [0.78, 0.6], 
    [0.98, 1.0],  [0.54, 0.08], [0.66, 0.3],  [0.84, 0.6], 
    [0.42, 0.08], [0.74, 0.3],  [0.94, 0.6],  [0.58, 0.08], 
    [0.82, 0.3],  [0.64, 0.6],  [0.86, 0.3],  [0.96, 1.0],
    [1.0, 1.0] // The Glowing "Live" bar
  ];

  return (
    <div ref={cardRef} className="group relative">
      <div className="bg-[#080808] rounded-[2.5rem] p-8 md:p-10 h-full border border-white/5 flex flex-col justify-between overflow-hidden relative transition-all duration-700 hover:border-white/10 shadow-2xl">
        {/* Top Status */}
        <div className="relative z-10 flex items-center justify-between">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">UPTIME SLA</h4>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">LIVE</span>
          </div>
        </div>

        {/* The Rising Bar Graph */}
        <div className="relative z-10 flex-grow flex items-end justify-between py-10 gap-[3px] md:gap-[5px]">
          {barConfigs.map(([height, opacity], i) => {
            const isWhiteGlow = opacity === 1.0;
            return (
              <div 
                key={i} 
                className="flex-1 min-w-[2px] rounded-t-[1px] transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)"
                style={{ 
                  height: isVisible ? `${height * 100}%` : '2%',
                  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                  boxShadow: isWhiteGlow ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${i * 8}ms` // Reduced delay for a smoother wave effect
                }}
              ></div>
            );
          })}
        </div>

        {/* Value Readout */}
        <div className="relative z-10">
          <div className="flex flex-col">
            <span className="text-[4.5rem] md:text-[5.5rem] font-bold text-white tracking-tighter leading-none tabular-nums">
              {uptime.toFixed(2)}%
            </span>
            <span className="text-[13px] font-semibold text-white/20 mt-4 tracking-tight">Last 30 days performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CopilotFeature: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-32 pb-32 px-8 bg-[#0A0A0B] overflow-hidden">
      <div 
        className={`max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        {/* Main Neural Copilot Card */}
        <div className="lg:col-span-2 group relative">
          <div className="bg-[#080808] rounded-[2.5rem] p-8 md:p-14 h-full border border-white/5 flex flex-col md:flex-row gap-8 overflow-hidden relative transition-all duration-700 hover:border-white/10 shadow-2xl">
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-10 w-fit">
                <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">AI V2.0</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Neural Copilot</h2>
              
              <p className="text-xl text-white/40 font-medium leading-[1.6] mb-12 max-w-sm">
                Let Sora analyze your codebase to suggest optimizations, generate test suites, and write documentation automatically.
              </p>
              
              <div className="flex items-center gap-10">
                <button className="px-10 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-3 group/btn">
                  Start Analysis
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="text-white/30 hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors">View Docs</button>
              </div>
            </div>

            {/* Code Snippet Window */}
            <div className="flex-1 relative flex items-center">
              <div className="w-full bg-[#050505] rounded-[2rem] border border-white/5 p-10 font-mono text-[14px] leading-[2] shadow-2xl relative overflow-hidden backdrop-blur-3xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="flex gap-2 mb-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                </div>

                <div className="space-y-1 text-white/80">
                  <div className="flex gap-6">
                    <span className="text-white/10 w-4 select-none">1</span> 
                    <span><span className="text-indigo-400">async</span> <span className="text-white">function</span> <span className="text-emerald-400">optimize</span>() {'{'}</span>
                  </div>
                  <div className="flex gap-6 animate-analyze-pulse">
                    <span className="text-white/10 w-4 select-none">2</span> 
                    <span className="text-white/30 italic ml-4">// Analyzing codebase...</span>
                  </div>
                  <div className="flex gap-6 h-6">
                    <span className="text-white/10 w-4 select-none">3</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-white/10 w-4 select-none">4</span> 
                    <span className="text-white">{'}'}</span>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/5 rounded-full blur-[80px]"></div>
              </div>
            </div>
          </div>
        </div>

        <UptimeSLACard />
      </div>

      <style>{`
        @keyframes analyze-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        .animate-analyze-pulse {
          animation: analyze-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};
