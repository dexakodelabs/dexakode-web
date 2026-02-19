
import React, { useState, useRef, useEffect } from 'react';
import { startConsultation, generateStructuredEstimate } from '../services/gemini';
import { ChatMessage, ProjectEstimation } from '../types';

interface AIEstimatorProps { fiberClips?: boolean; onClose: () => void; }

export const AIEstimator: React.FC<AIEstimatorProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the DEXACODE Creative Interface. I am DexaAI. What digital reality are we designing today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<ProjectEstimation | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;
    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const response = await startConsultation(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || "Your vision is intriguing. Tell me more about the project goals." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Creative link interrupted. Please try again." }]);
    } finally { setLoading(false); }
  };

  const handleGetEstimate = async () => {
    setLoading(true);
    try {
      const chatContext = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
      const data = await generateStructuredEstimate(chatContext);
      setEstimate(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-5xl h-[85vh] glass rounded-[3rem] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(194,142,111,0.1)] border-white/5">
        <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-bronze flex items-center justify-center shadow-2xl shadow-bronze/40">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-black text-2xl tracking-tight uppercase">DEXACODE AI</h3>
              <p className="text-xs text-bronze font-bold tracking-[0.3em]">CREATIVE INTERFACE</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full transition-colors group">
            <svg className="w-8 h-8 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 flex flex-col border-r border-white/5 bg-black/40">
            <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto space-y-8 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-6 rounded-3xl ${m.role === 'user' ? 'bg-bronze text-white shadow-xl shadow-bronze/10' : 'glass text-slate-300'}`}>
                    <p className="text-base leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="glass px-6 py-4 rounded-3xl animate-pulse"><div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-bronze rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}</div></div></div>}
            </div>
            <div className="p-8 border-t border-white/5 bg-white/[0.01]">
              <div className="relative flex items-center">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Imagine your project..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-8 pr-24 focus:outline-none focus:border-bronze transition-all text-lg" />
                <button onClick={handleSend} className="absolute right-4 p-4 bg-bronze hover:brightness-110 rounded-xl transition-all shadow-xl shadow-bronze/20"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 p-10 bg-black/60 overflow-y-auto">
            {!estimate ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full glass border-bronze/20 flex items-center justify-center mb-8">
                  <svg className="w-10 h-10 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                </div>
                <h4 className="font-black text-xl mb-4 tracking-tight uppercase">Live Strategy</h4>
                <p className="text-sm text-slate-500 mb-10 leading-relaxed font-medium">Chat with DexaAI to generate a high-level creative blueprint.</p>
                <button onClick={handleGetEstimate} disabled={messages.length < 3 || loading} className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-slate-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl shadow-white/5">Generate Roadmap</button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h4 className="font-black text-bronze text-xs uppercase tracking-[0.3em] mb-10">Creative Summary</h4>
                <div className="space-y-10">
                  <div><span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Project Scale</span><p className="text-lg font-bold text-white">{estimate.complexity}</p></div>
                  <div><span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Launch Timeline</span><p className="text-lg font-bold text-white">{estimate.estimatedTimeline}</p></div>
                  <div><span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Stack Selection</span><div className="flex flex-wrap gap-2 mt-4">{estimate.techStack.map((tech, idx) => (<span key={idx} className="px-3 py-1.5 bg-bronze/10 text-bronze border border-bronze/20 rounded-lg text-[10px] font-black uppercase tracking-wider">{tech}</span>))}</div></div>
                  <div><span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Strategic Insights</span><ul className="space-y-4 mt-4">{estimate.recommendations.map((rec, idx) => (<li key={idx} className="text-sm text-slate-400 leading-relaxed flex gap-3"><span className="text-bronze font-bold">•</span> {rec}</li>))}</ul></div>
                </div>
                <button onClick={() => window.location.href = '#contact'} className="w-full mt-12 py-5 bg-bronze text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:brightness-110 transition-all shadow-2xl shadow-bronze/20">Confirm Vision</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
