import React from 'react';
import { Clock, ShieldAlert, MessageSquare, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ProductConfig, OrderSubmission } from '../types';

interface PendingPageProps {
  order: OrderSubmission;
  config: ProductConfig;
  onHome: () => void;
  onRefreshStatus?: () => void;
}

export const PendingPage: React.FC<PendingPageProps> = ({
  order,
  config,
  onHome,
  onRefreshStatus,
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20ALL%20EXAM%20BOOST,%20I%20have%20submitted%20my%20payment%20for%20the%201500%20Questions%20PDF.%20My%20Order%20ID%20is%20${order.id}%20and%20UTR%20is%20${order.utrId}.%20Kindly%20verify.`;

  return (
    <div className="min-h-screen bg-[#060913] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <div className="max-w-xl w-full">
        
        <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          
          {/* Hourglass / Clock Icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              ⏳ PAYMENT VERIFICATION PENDING
            </h1>
            <p className="text-amber-300 text-sm font-semibold">
              "Your payment screenshot has been submitted successfully."
            </p>
          </div>

          {/* Core explanation message */}
          <div className="rounded-2xl bg-amber-950/30 border border-amber-500/20 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            "We'll verify your payment details before providing access to the PDF."
          </div>

          {/* Submitted details summary */}
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-slate-400 font-semibold">Order Reference:</span>
              <span className="font-mono text-sm font-bold text-blue-400">{order.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Student Name</span>
                <span className="font-semibold text-white">{order.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">WhatsApp</span>
                <span className="font-semibold text-white">{order.whatsapp}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Transaction / UTR ID</span>
                <span className="font-mono font-semibold text-white">{order.utrId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Amount</span>
                <span className="font-bold text-amber-300">₹{order.amount}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-slate-400">Current Status:</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
                ● PENDING VERIFICATION
              </span>
            </div>
          </div>

          {/* Expedite via WhatsApp */}
          <div className="space-y-3 pt-2">
            <a
              id="pending-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Speed up via WhatsApp Support</span>
            </a>

            {onRefreshStatus && (
              <button
                id="pending-refresh-btn"
                onClick={onRefreshStatus}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Check Approval Status</span>
              </button>
            )}
          </div>

          {/* Back Home */}
          <div className="pt-2">
            <button
              onClick={onHome}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Home</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
