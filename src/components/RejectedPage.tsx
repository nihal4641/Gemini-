import React from 'react';
import { XCircle, AlertTriangle, MessageSquare, ArrowLeft } from 'lucide-react';
import { ProductConfig, OrderSubmission } from '../types';

interface RejectedPageProps {
  order: OrderSubmission;
  config: ProductConfig;
  onHome: () => void;
  onRetry: () => void;
}

export const RejectedPage: React.FC<RejectedPageProps> = ({
  order,
  config,
  onHome,
  onRetry,
}) => {
  return (
    <div className="min-h-screen bg-[#060913] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="rounded-3xl bg-slate-900/90 border border-red-500/40 p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          
          <div className="w-18 h-18 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading font-black text-2xl text-white">
              VERIFICATION REJECTED
            </h1>
            <p className="text-red-300 text-xs font-semibold">
              Order ID: {order.id}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 text-left space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-red-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Reason for Rejection:</span>
            </div>
            <p className="leading-relaxed">
              {order.rejectionReason || 'The payment screenshot or UTR number could not be validated against the expected ₹89 to Ashutosh Kumar Ray.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onRetry}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Submit Valid Payment Proof
            </button>

            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20my%20order%20${order.id}%20was%20rejected.%20Can%20you%20please%20help?`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contact Support on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={onHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
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
