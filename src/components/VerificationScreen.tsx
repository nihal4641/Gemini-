import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { ProductConfig, OrderSubmission, VerificationCheckStep } from '../types';
import { processScreenshotVerification } from '../services/verification';

interface VerificationScreenProps {
  orderData: Omit<OrderSubmission, 'id' | 'createdAt' | 'status'>;
  config: ProductConfig;
  onVerificationComplete: (order: OrderSubmission) => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  orderData,
  config,
  onVerificationComplete,
}) => {
  const [steps, setSteps] = useState<VerificationCheckStep[]>([
    { name: 'Reading payment screenshot', status: 'running', message: 'Extracting receipt text and image data...' },
    { name: 'Checking payment amount', status: 'waiting', message: `Verifying exact ₹${config.price}...` },
    { name: 'Checking recipient name', status: 'waiting', message: `Verifying "${config.recipientName}"...` },
    { name: 'Checking transaction details', status: 'waiting', message: 'Validating UTR / Transaction reference...' },
    { name: 'Checking duplicate transaction ID', status: 'waiting', message: 'Checking system security registry...' },
  ]);

  useEffect(() => {
    let isMounted = true;

    async function runVerification() {
      const orderId = `AEB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const ocrResult = await processScreenshotVerification(
        orderData.screenshotDataUrl,
        orderData.utrId,
        config,
        (stepIndex, stepName, status, message) => {
          if (!isMounted) return;
          setSteps((prev) => {
            const next = [...prev];
            next[stepIndex] = { name: stepName, status, message };
            // activate next step if current succeeded
            if (status === 'success' && stepIndex + 1 < next.length && next[stepIndex + 1].status === 'waiting') {
              next[stepIndex + 1].status = 'running';
            }
            return next;
          });
        }
      );

      // Brief delay to allow the user to see the complete checklist
      await new Promise((r) => setTimeout(r, 900));

      if (!isMounted) return;

      const finalStatus = ocrResult.isAutoApproved ? 'APPROVED' : 'PENDING';
      const accessKey = ocrResult.isAutoApproved
        ? `AEB-ACC-${orderId.replace('AEB-', '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        : undefined;

      const completedOrder: OrderSubmission = {
        id: orderId,
        ...orderData,
        status: finalStatus,
        createdAt: new Date().toISOString(),
        accessKey,
        ocrResult,
      };

      onVerificationComplete(completedOrder);
    }

    runVerification();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full relative">
        
        {/* Glow halo */}
        <div className="absolute inset-0 bg-blue-600/15 rounded-3xl blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl bg-slate-900/90 border border-blue-500/30 p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          
          {/* Animated Spinner Icon */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
              Security Protocol
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
              VERIFYING PAYMENT...
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Please wait while our automated verification engine processes your transaction proof.
            </p>
          </div>

          {/* 5 Steps Checklist */}
          <div className="space-y-3 pt-2 text-left">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  s.status === 'success'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : s.status === 'running'
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-200'
                    : s.status === 'warning'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                    : s.status === 'failed'
                    ? 'bg-red-950/30 border-red-500/40 text-red-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-heading flex items-center gap-2">
                    {s.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {s.status === 'running' && <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />}
                    {s.status === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
                    {s.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    {s.status === 'waiting' && <Clock className="w-4 h-4 text-slate-600 shrink-0" />}
                    <span>{s.name}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider">
                    {s.status === 'success' && 'VERIFIED'}
                    {s.status === 'running' && 'CHECKING...'}
                    {s.status === 'warning' && 'REVIEW'}
                    {s.status === 'failed' && 'FLAGGED'}
                    {s.status === 'waiting' && 'QUEUED'}
                  </span>
                </div>
                {s.status === 'running' && (
                  <p className="text-[11px] text-slate-400 mt-1 pl-6">
                    {s.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Encrypted Verification Pipeline • ALL EXAM BOOST</span>
          </div>

        </div>

      </div>
    </div>
  );
};
