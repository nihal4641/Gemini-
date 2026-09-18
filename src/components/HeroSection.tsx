import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Zap, Award, Flame, Download } from 'lucide-react';
import { ProductConfig } from '../types';

interface HeroSectionProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onGetPdf }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Ambient background glow spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Particle Accents */}
      <div className="absolute top-12 left-[15%] w-2 h-2 rounded-full bg-blue-400/40 animate-float pointer-events-none" />
      <div className="absolute top-40 right-[20%] w-3 h-3 rounded-full bg-indigo-400/30 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-[25%] w-2.5 h-2.5 rounded-full bg-amber-400/30 animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subheadline & Primary CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide shadow-inner">
              <span className="text-sm">🎯</span>
              <span>COMPETITIVE EXAM PRACTICE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
              MASTER <br className="hidden sm:inline" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
                1500
              </span>{' '}
              OBJECTIVE QUESTIONS
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              5 Chapters. 1500 Objective Questions. <br className="hidden sm:inline" />
              Built for serious competitive exam practice.
            </p>

            {/* Pricing Section */}
            <div className="pt-1 pb-2">
              <div className="inline-flex items-baseline gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/80 border border-amber-400/30 shadow-lg shadow-amber-500/5">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
                  {config.currency}{config.price}
                </span>
                <span className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                  ONLY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                One-time payment • Instant access after verification
              </p>
            </div>

            {/* Primary CTA Area */}
            <div className="space-y-3 pt-1">
              <button
                id="hero-buy-now-cta"
                onClick={onGetPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-lg tracking-tight shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer animate-pulse-subtle"
              >
                <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
                <span>🔥 GET THE PDF — {config.currency}{config.price}</span>
                <ArrowRight className="w-5 h-5 text-blue-200" />
              </button>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Secure UPI payment
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Simple verification
                </span>
              </div>
            </div>

            {/* Quick Feature Chips */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-medium">
                ✓ Bilingual (Hindi & English)
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-medium">
                ✓ High-Yield Solutions Included
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-medium">
                ✓ Radio, Police, SSC & Technical
              </span>
            </div>
          </div>

          {/* Right Column: 3D/Glass PDF Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              
              {/* Outer Glow Halo behind mockup */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000" />

              {/* Badges around the PDF */}
              {/* Badge 1: 1500 Questions */}
              <div className="absolute -top-3 -left-3 sm:-left-6 z-20 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-blue-600/40 border border-blue-400/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>1500 QUESTIONS</span>
              </div>

              {/* Badge 2: 5 Chapters */}
              <div className="absolute -bottom-3 -left-2 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 text-sky-300 text-xs font-bold shadow-lg border border-sky-500/30 flex items-center gap-1.5 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>5 CHAPTERS</span>
              </div>

              {/* Badge 3: Price */}
              <div className="absolute -top-3 -right-3 z-20 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/30 border border-yellow-200 flex items-center gap-1">
                <span>₹89 ONLY</span>
              </div>

              {/* 3D Glass PDF Book/Card Mockup */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#101a35] to-[#0a1022] p-6 sm:p-7 border border-blue-500/30 shadow-2xl overflow-hidden text-center group">
                
                {/* Book Spine Line Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-blue-700/60 to-transparent pointer-events-none" />

                {/* Cover Header */}
                <div className="pb-4 border-b border-white/10">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                    OFFICIAL STUDY COMPILATION
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white tracking-tight mt-1">
                    ALL EXAM BOOST
                  </h3>
                  <p className="text-amber-400 font-bold text-sm tracking-wide mt-0.5">
                    1500 OBJECTIVE QUESTIONS
                  </p>
                </div>

                {/* Mockup Preview Lines representing content */}
                <div className="py-5 space-y-2.5 text-left">
                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">01</span>
                      <span className="text-xs font-semibold text-slate-200">Wave & SHM Practice</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">300 Qs</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">02</span>
                      <span className="text-xs font-semibold text-slate-200">Damped & Resonance</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">300 Qs</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">03</span>
                      <span className="text-xs font-semibold text-slate-200">Group & Phase Velocity</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">300 Qs</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">04</span>
                      <span className="text-xs font-semibold text-slate-200">Wave Dispersion</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">300 Qs</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">05</span>
                      <span className="text-xs font-semibold text-slate-200">Special Question Bank</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400">300 Qs</span>
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Bilingual PDF Format</span>
                  <span className="text-emerald-400 font-semibold">Instant Access</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
