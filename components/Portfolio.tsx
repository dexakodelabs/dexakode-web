
import React from 'react';

const PROJECTS = [
  { id: 1, title: 'LUXE E-COMMERCE', category: 'WEB DEVELOPMENT', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'CREATIVE SHOWCASE', category: 'UI/UX DESIGN', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'SaaS DASHBOARD', category: 'PRODUCT DESIGN', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'IDENTITY FLOW', category: 'BRANDING', img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200' }
];

export const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-40 px-8 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-bronze"></div>
              <span className="text-bronze text-sm font-bold tracking-[0.2em] uppercase">Selected Works</span>
            </div>
            <h3 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter">
              CRAFTING THE <br />
              <span className="text-bronze">EXTRAORDINARY.</span>
            </h3>
          </div>
          <button className="text-white text-sm font-black tracking-widest uppercase flex items-center gap-4 group">
            View All Projects 
            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[2rem] aspect-[16/10] mb-8">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-40 group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-bronze font-black text-[10px] tracking-[0.3em] uppercase block mb-2">{p.category}</span>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter">{p.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  <svg className="w-6 h-6 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
