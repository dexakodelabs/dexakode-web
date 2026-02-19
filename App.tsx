
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CodeFeature } from './components/CodeFeature';
import { CopilotFeature } from './components/CopilotFeature';
import { About } from './components/About';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIEstimator } from './components/AIEstimator';

const App: React.FC = () => {
  const [showEstimator, setShowEstimator] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A]">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-squares opacity-20"></div>
        <div className="absolute top-[20%] right-[-10%] w-[80vw] h-[80vw] mesh-gradient rounded-full animate-float-slow"></div>
        
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-bronze/10 border border-white/5"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
              transform: `rotate(${Math.random() * 45}deg)`,
              animation: `float-slow ${Math.random() * 10 + 20}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <Navbar onOpenEstimator={() => setShowEstimator(true)} />
      
      <main>
        <Hero onOpenEstimator={() => setShowEstimator(true)} />
        <CodeFeature />
        <CopilotFeature />
        <About />
        <Process />
        <Portfolio />
        <Contact />
      </main>

      <Footer />

      {showEstimator && (
        <AIEstimator onClose={() => setShowEstimator(false)} />
      )}

      <style>{`
        @keyframes expand-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes steam-rise {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes pen-shake {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(3deg); }
          75% { transform: translate(-2px, 2px) rotate(-3deg); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 100; stroke-dasharray: 100; }
          to { stroke-dashoffset: 0; stroke-dasharray: 100; }
        }
        @keyframes progress-flow {
          0% { width: 0%; opacity: 0.8; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes code-pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-expand-line { animation: expand-line 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-steam-rise { animation: steam-rise 5s ease-out infinite; }
        .animate-pen-shake { animation: pen-shake 0.4s ease-in-out infinite; }
        .animate-draw-line { animation: draw-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-progress-flow { animation: progress-flow 3s ease-in-out infinite; }
        .animate-dash-flow { stroke-dasharray: 5; animation: dash-flow 1s linear infinite; }
        .animate-code-pulse { animation: code-pulse 4s ease-in-out infinite; }
        .animate-cursor-blink { animation: cursor-blink 1s step-end infinite; }
      `}</style>
    </div>
  );
};

export default App;
