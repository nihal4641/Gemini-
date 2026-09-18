import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, CheckCircle, Sparkles, ShieldCheck, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { ProductConfig, OrderSubmission } from '../types';
import { downloadPurchasedPdf } from '../services/pdfGenerator';

interface SuccessPageProps {
  order: OrderSubmission;
  config: ProductConfig;
  onHome: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ order, config, onHome }) => {
  useEffect(() => {
    // Launch festive confetti celebration
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#3b82f6', '#60a5fa', '#f59e0b', '#10b981', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleDownload = () => {
    downloadPurchasedPdf(config, order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09122a] via-[#070e22] to-[#050916] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-6">
        
        {/* Main Success Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-blue-500/40 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center space-y-8">
          
          {/* Large Animated Checkmark */}
          <div className="relative inline-flex">
            <div className="absolute -inset-4 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 relative z-10 mx-auto">
              <CheckCircle className="w-14 h-14" />
            </div>
          </div>

          {/* Headlines */}
          <div className="space-y-2">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              🎉 CONGRATULATIONS!
            </h1>
            <p className="text-emerald-400 font-bold text-base sm:text-lg uppercase tracking-wider">
              YOUR PAYMENT HAS BEEN VERIFIED.
            </p>
          </div>

          {/* Product Pill Box */}
          <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-500/30 inline-block text-center max-w-lg mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
              ALL EXAM BOOST
            </div>
            <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight mt-0.5">
              1500 OBJECTIVE QUESTIONS
            </div>
            <div className="text-xs font-semibold text-amber-400 mt-1">
              5 CHAPTERS • BILINGUAL SOLUTIONS
            </div>
          </div>

          {/* Message */}
          <p className="text-slate-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            "Your PDF is ready. Start practicing and boost your preparation!"
          </p>

          {/* Primary Glowing Download CTA Button */}
          <div className="pt-2">
            <button
              id="download-pdf-success-btn"
              onClick={handleDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-black text-lg shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download className="w-6 h-6 animate-bounce" />
              <span>📥 DOWNLOAD PDF</span>
            </button>
          </div>

          {/* Safety note */}
          <div className="text-xs text-slate-400 font-medium">
            "Keep this page/link safe for future access."
          </div>

          {/* Order Details Accordion Box */}
          <div className="pt-6 border-t border-white/10 text-left space-y-2 text-xs text-slate-300 bg-slate-950/40 rounded-2xl p-4 sm:p-5 border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-white/5 font-semibold text-white">
              <span>Order ID: <span className="font-mono text-blue-400">{order.id}</span></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-slate-400">
              <div>Student: <span className="text-slate-200 font-medium">{order.fullName}</span></div>
              <div>WhatsApp: <span className="text-slate-200 font-medium">{order.whatsapp}</span></div>
              <div>Amount Paid: <span className="text-amber-300 font-bold">₹{order.amount}</span></div>
              <div>UTR ID: <span className="text-slate-200 font-mono">{order.utrId}</span></div>
            </div>
            {order.accessKey && (
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                Secure Access Token: <span className="font-mono text-sky-400 font-bold">{order.accessKey}</span>
              </div>
            )}
          </div>

          {/* Return Home */}
          <div className="pt-2">
            <button
              id="success-back-home"
              onClick={onHome}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
