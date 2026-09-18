import React from 'react';
import { QrCode, UploadCloud, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { ProductConfig } from '../types';

interface HowItWorksProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ config, onGetPdf }) => {
  const steps = [
    {
      id: 'step-01',
      stepNum: 'STEP 01',
      title: 'SCAN & PAY',
      description: `Scan the UPI QR and pay exactly ${config.currency}${config.price}.`,
      icon: QrCode,
      color: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'border-blue-500/40',
      numberBg: 'bg-blue-600',
    },
    {
      id: 'step-02',
      stepNum: 'STEP 02',
      title: 'UPLOAD PROOF',
      description: 'Upload your payment screenshot and enter your transaction details.',
      icon: UploadCloud,
      color: 'from-indigo-500/20 to-purple-500/10',
      borderColor: 'border-indigo-500/40',
      numberBg: 'bg-indigo-600',
    },
    {
      id: 'step-03',
      stepNum: 'STEP 03',
      title: 'GET ACCESS',
      description: 'After successful verification, unlock your PDF.',
      icon: Download,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/40',
      numberBg: 'bg-emerald-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative bg-[#070b14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            Fast & Simple Workflow
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            GET YOUR PDF IN <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              3 SIMPLE STEPS
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No complicated registrations or credit cards. Use your regular UPI app.
          </p>
        </div>

        {/* Steps Container with glowing connection line */}
        <div className="relative">
          {/* Glowing horizontal connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] z-0" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((s, index) => {
              const IconComponent = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className={`relative rounded-2xl bg-gradient-to-b ${s.color} bg-slate-900/80 p-6 sm:p-8 border ${s.borderColor} backdrop-blur-xl shadow-xl glass-card-hover flex flex-col justify-between`}
                >
                  <div>
                    {/* Header with Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl ${s.numberBg} text-white flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/20`}>
                        {index + 1}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 font-mono tracking-wider">
                        {s.stepNum}
                      </span>
                    </div>

                    {/* Icon Illustration Box */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-blue-400 mb-5">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-heading font-black text-xl text-white tracking-tight mb-2">
                      {s.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Step status check indicator */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Instant Processing
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button below steps */}
        <div className="mt-14 text-center">
          <button
            id="how-it-works-start-btn"
            onClick={onGetPdf}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>START NOW — SCAN & PAY {config.currency}{config.price}</span>
            <ArrowRight className="w-5 h-5 text-blue-200" />
          </button>
        </div>

      </div>
    </section>
  );
};
