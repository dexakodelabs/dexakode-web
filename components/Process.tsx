
import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: "1",
    title: "Discovery & Briefing",
    desc: "We start with a detailed discussion about your project goals, target audience, and vision. We'll ask the right questions to understand your brand and requirements fully."
  },
  {
    num: "2",
    title: "Design & Strategy",
    desc: "I create initial concepts and wireframes based on your brief. You'll receive interactive previews to ensure we're perfectly aligned on the direction before moving forward."
  },
  {
    num: "3",
    title: "Engineering & Dev",
    desc: "Adding functionality, high-performance code, and immersive animations to bring the designs to life. This stage transforms visual concepts into pixel-perfect digital realities."
  },
  {
    num: "4",
    title: "Launch & Delivery",
    desc: "Final testing, deployment, and optimization. You'll receive a fully functional, high-performance website ready to command attention and drive results online."
  }
];

const ProcessStep: React.FC<{ step: typeof STEPS[0]; index: number; progress: number }> = ({ step, index, progress }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection to allow blur-out when scrolling away
        setIsVisible(entry.isIntersecting);
      },
      { 
        // rootMargin defines the "focus zone" in the middle of the viewport
        rootMargin: "-15% 0px -15% 0px",
        threshold: 0.1 
      }
    );
    if (stepRef.current) observer.observe(stepRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate if this specific node should be "active" based on global section progress
  const stepThreshold = (index / (STEPS.length - 1)) * 100;
  const isActive = progress >= stepThreshold - 5;

  return (
    <div 
      ref={stepRef}
      className={`group relative flex flex-col sm:flex-row items-center gap-12 sm:gap-0 transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) ${
        isVisible 
          ? 'opacity-100 blur-0 translate-y-0 scale-100' 
          : 'opacity-0 blur-2xl translate-y-20 scale-95'
      } ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
    >
      {/* Content Box */}
      <div className={`w-full sm:w-[45%] p-8 md:p-10 glass rounded-[2.5rem] border-white/5 transition-all duration-700 hover:border-bronze/30 group-hover:bg-white/[0.04] relative`}>
        <h3 className={`text-2xl font-black uppercase tracking-tight mb-4 transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-white'}`}>
          {step.title}
        </h3>
        <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
          {step.desc}
        </p>
        
        {/* Mobile Indicator */}
        <div className={`absolute -left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full sm:hidden transition-all duration-500 ${isActive ? 'bg-bronze scale-125 shadow-[0_0_15px_#C28E6F]' : 'bg-white/10'}`}></div>
      </div>

      {/* Central Number Circle */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 hidden sm:flex">
        <div className={`w-12 h-12 rounded-full bg-black border-2 transition-all duration-700 flex items-center justify-center ${
          isActive 
            ? 'border-bronze scale-110 shadow-[0_0_30px_rgba(194,142,111,0.6)]' 
            : 'border-white/10 scale-100'
        }`}>
          <span className={`font-black text-lg transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-white/40'}`}>
            {step.num}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="w-full sm:w-[45%] hidden sm:block"></div>
    </div>
  );
};

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const start = viewportHeight * 0.8;
      const end = viewportHeight * 0.2;
      const progress = Math.max(0, Math.min(100, ((start - rect.top) / (rect.height - (start - end))) * 100));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative py-40 px-8 overflow-hidden bg-black">
      {/* Background Decorative Number */}
      <div className="absolute right-8 top-20 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        02
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-bronze"></div>
            <span className="text-bronze text-sm font-bold tracking-[0.2em] uppercase">My Process</span>
          </div>
          
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tighter mb-6">
            From concept <br /> to <span className="text-bronze">reality</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            A proven workflow that delivers exceptional results through strategic design and elite engineering.
          </p>
        </div>

        <div className="relative space-y-24">
          {/* Vertical Progress Spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden sm:block">
            {/* The Active Filling Part */}
            <div 
              className="absolute top-0 left-0 w-full bg-bronze shadow-[0_0_15px_#C28E6F] transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress}%` }}
            ></div>
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-bronze to-transparent h-full opacity-10"></div>
          </div>

          {STEPS.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} progress={scrollProgress} />
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cubic-bezier(0.23, 1, 0.32, 1) {
          transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </section>
  );
};
