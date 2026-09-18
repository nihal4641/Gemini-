import React from 'react';
import { CheckCircle2, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { ProductConfig } from '../types';

interface TrustSectionProps {
  config: ProductConfig;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ config }) => {
  const trustPoints = [
    `${config.questionsCount} Objective Questions`,
    `${config.chaptersCount} Chapters`,
    `${config.currency}${config.price} One-Time Purchase`,
    'Simple UPI Payment',
    'Payment Verification',
    'Digital PDF Access',
  ];

  return (
    <section id="trust-section" className="py-16 relative border-t border-white/5 bg-[#050813]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Card Container */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0a1124] border border-blue-500/20 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                  Transparent & Reliable Preparation
                </h3>
                <p className="text-slate-400 text-sm mt-0.5">
                  Honest study material designed to boost your objective practice and exam readiness.
                </p>
              </div>
            </div>

            <div className="shrink-0 px-4 py-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs font-bold text-blue-300">
              ALL EXAM BOOST OFFICIAL
            </div>
          </div>

          {/* 6 Trust Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
            {trustPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Ethical Statement */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We focus on providing curated, high-quality practice questions and comprehensive explanations. We do not make misleading claims of guaranteed selection; your hard work and diligent practice drive your success.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
