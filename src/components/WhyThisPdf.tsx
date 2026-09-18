import React from 'react';
import { BookOpen, Layers, Target, CheckCircle2 } from 'lucide-react';
import { ProductConfig } from '../types';

interface WhyThisPdfProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const WhyThisPdf: React.FC<WhyThisPdfProps> = ({ config, onGetPdf }) => {
  const features = [
    {
      id: 'feature-1500-questions',
      icon: '📚',
      title: '1500 Questions',
      description: 'Practice a large collection of objective questions.',
      highlight: 'Massive Practice',
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30',
    },
    {
      id: 'feature-5-chapters',
      icon: '📖',
      title: '5 Chapters',
      description: 'Organized chapter-wise for easier preparation.',
      highlight: 'Structured Learning',
      color: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30',
    },
    {
      id: 'feature-exam-focused',
      icon: '🎯',
      title: 'Exam Focused',
      description: 'Made specifically for competitive exam practice.',
      highlight: 'Targeted Syllabus',
      color: 'from-sky-500/20 to-blue-500/10',
      border: 'border-sky-500/30',
    },
    {
      id: 'feature-only-89',
      icon: '💰',
      title: `Only ${config.currency}${config.price}`,
      description: 'Affordable one-time purchase.',
      highlight: 'Best Value',
      color: 'from-amber-500/20 to-yellow-500/10',
      border: 'border-amber-500/40',
    },
  ];

  return (
    <section id="why-this-pdf" className="py-16 md:py-24 relative border-t border-white/5 bg-[#060a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Curated For High Scores
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            YOUR NEXT 1500 QUESTIONS <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              START HERE.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to master objective questions in one compact, verified study manual.
          </p>
        </div>

        {/* 4 Premium Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`relative rounded-2xl bg-gradient-to-b ${item.color} bg-slate-900/60 p-6 sm:p-7 border ${item.border} backdrop-blur-xl shadow-xl glass-card-hover flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-slate-900/80 border border-white/10 shadow-inner">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl text-white tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-blue-400 font-semibold gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Content</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA Banner */}
        <div className="mt-12 text-center">
          <button
            id="why-section-get-pdf"
            onClick={onGetPdf}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-sm font-bold transition-all cursor-pointer"
          >
            <span>Claim Your 1500 Questions Copy for {config.currency}{config.price}</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};
