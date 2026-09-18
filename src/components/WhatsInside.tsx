import React from 'react';
import { Layers, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { ProductConfig } from '../types';

interface WhatsInsideProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const WhatsInside: React.FC<WhatsInsideProps> = ({ config, onGetPdf }) => {
  return (
    <section id="whats-inside" className="py-16 md:py-24 relative bg-[#070b14] overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            Syllabus Coverage
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            5 CHAPTERS. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              1500 QUESTIONS.
            </span> <br />
            ONE PDF.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Systematically structured into 5 comprehensive modules for maximum retention and speed.
          </p>
        </div>

        {/* 5 Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.chapters.map((ch, idx) => (
            <div
              key={ch.id}
              id={`chapter-card-${idx + 1}`}
              className="relative rounded-2xl bg-slate-900/70 p-6 sm:p-7 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl shadow-xl glass-card-hover group transition-all"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-300 font-heading font-black text-xs tracking-wider">
                  {ch.number}
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  {ch.questionsCount} Questions
                </span>
              </div>

              {/* Title as specified: "Objective Practice" (or admin edited title) */}
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {ch.title}
              </h3>

              {/* Subtitle / Topic details if present */}
              {ch.subtitle && (
                <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
                  {ch.subtitle}
                </p>
              )}

              {/* Card features */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Topic-wise Objective Questions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Detailed Solutions & Answer Key</span>
                </div>
              </div>
            </div>
          ))}

          {/* 6th Card: Grand Summary Box */}
          <div className="relative rounded-2xl bg-gradient-to-br from-blue-950/90 via-indigo-950/80 to-[#070d1e] p-6 sm:p-7 border-2 border-amber-400/50 backdrop-blur-xl shadow-2xl flex flex-col justify-between text-center sm:col-span-2 lg:col-span-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/40">
                <Sparkles className="w-3.5 h-3.5" />
                COMPLETE COMBO
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                TOTAL
              </div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
                1500 OBJECTIVE QUESTIONS
              </div>
              <p className="text-slate-300 text-xs mt-2">
                All 5 chapters compiled together into one clean, high-resolution PDF.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                id="whats-inside-get-pdf"
                onClick={onGetPdf}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                UNLOCK ALL 5 CHAPTERS — {config.currency}{config.price}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
