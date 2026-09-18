import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ProductConfig } from '../types';

interface StickyMobileBarProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ config, onGetPdf }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#070b14]/95 backdrop-blur-xl border-t border-blue-500/30 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-amber-400 font-heading">
              {config.currency}{config.price}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              ONLY
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            1500 Qs • 5 Chapters
          </div>
        </div>

        <button
          id="mobile-sticky-cta-btn"
          onClick={onGetPdf}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse-subtle"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>GET THE PDF — {config.currency}{config.price}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
