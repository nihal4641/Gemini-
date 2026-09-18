import React, { useState, useRef } from 'react';
import { ArrowLeft, ShieldAlert, Upload, CheckCircle2, ArrowDown, FileCheck, AlertTriangle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ProductConfig, OrderSubmission } from '../types';
import { PhonePeQr } from './PhonePeQr';

interface PaymentPageProps {
  config: ProductConfig;
  onBack: () => void;
  onSubmitPayment: (orderData: Omit<OrderSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  config,
  onBack,
  onSubmitPayment,
}) => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [utrId, setUtrId] = useState('');
  const [screenshotDataUrl, setScreenshotDataUrl] = useState('');
  const [screenshotFileName, setScreenshotFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (file: File) => {
    setErrorMsg('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, or JPEG).');
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Screenshot file size exceeds 5 MB. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setScreenshotDataUrl(result);
      setScreenshotFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanPhone = whatsapp.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid WhatsApp phone number (at least 10 digits).');
      return;
    }

    if (!utrId.trim() || utrId.trim().length < 6) {
      setErrorMsg('Please enter a valid Transaction / UTR ID from your payment receipt.');
      return;
    }

    if (!screenshotDataUrl) {
      setErrorMsg('Please upload your payment screenshot to verify your payment.');
      return;
    }

    onSubmitPayment({
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      utrId: utrId.trim(),
      amount: config.price,
      screenshotDataUrl,
      screenshotFileName: screenshotFileName || 'payment_proof.jpg',
    });
  };

  return (
    <div className="min-h-screen bg-[#060913] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Back Button */}
        <div className="mb-6">
          <button
            id="payment-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header Summary */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Official Checkout
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            GET YOUR 1500 QUESTIONS PDF
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-300 font-medium pt-1">
            <span className="font-bold text-white">ALL EXAM BOOST</span>
            <span>•</span>
            <span>{config.questionsCount} Objective Questions</span>
            <span>•</span>
            <span>{config.chaptersCount} Chapters</span>
            <span>•</span>
            <span className="font-black text-amber-400 text-base">{config.currency}{config.price}</span>
          </div>
        </div>

        {/* STEP 1: SCAN & PAY GLASS CARD */}
        <div className="relative rounded-3xl bg-slate-900/80 border border-blue-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-10">
          
          <div className="text-center mb-6">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              SCAN & PAY {config.currency}{config.price}
            </h2>
            <div className="mt-2 text-sm text-slate-300">
              UPI RECIPIENT:{' '}
              <span className="font-bold text-amber-300 text-base">
                {config.recipientName}
              </span>
            </div>
          </div>

          {/* QR Scanner Display */}
          <div className="my-6">
            <PhonePeQr
              customImageUrl={config.qrCodeUrl || undefined}
              recipientName={config.recipientName}
              upiId={config.upiId}
              amount={config.price}
            />
          </div>

          {/* Important Instruction */}
          <div className="text-center text-sm font-semibold text-slate-200 mt-4">
            "Please make the payment of exactly {config.currency}{config.price}."
          </div>

          {/* Important Warning / Info Box */}
          <div className="mt-6 max-w-xl mx-auto rounded-2xl bg-amber-950/40 border border-amber-500/30 p-4 sm:p-5 flex items-start gap-3.5 text-left">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 block mb-1">
                IMPORTANT:
              </strong>
              Your payment screenshot must clearly show the recipient name{' '}
              <strong className="text-white">'{config.recipientName}'</strong> and the amount{' '}
              <strong className="text-white">{config.currency}{config.price}</strong>. Do not crop or hide the recipient details.
            </div>
          </div>

          {/* Action to proceed to verification form */}
          <div className="mt-8 text-center">
            <button
              id="i-have-paid-btn"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>I HAVE MADE THE PAYMENT</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* STEP 2: PAYMENT VERIFICATION FORM */}
        <div
          ref={formRef}
          id="verification-form-container"
          className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8 pb-4 border-b border-white/10 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Step 2 of 2
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              SUBMIT PAYMENT PROOF
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Enter your details and upload the screenshot to unlock your PDF download.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your PDF access link will also be associated with this WhatsApp number.
              </p>
            </div>

            {/* Transaction / UTR ID */}
            <div>
              <label htmlFor="utrId" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Transaction / UTR ID <span className="text-red-400">*</span>
              </label>
              <input
                id="utrId"
                type="text"
                value={utrId}
                onChange={(e) => setUtrId(e.target.value)}
                placeholder="Enter your transaction ID"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Found in PhonePe/GPay/Paytm as "UPI Ref No." or "UTR" (usually 12 digits).
              </p>
            </div>

            {/* Payment Screenshot Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Payment Screenshot <span className="text-red-400">*</span>
              </label>

              <div
                id="screenshot-dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-950/40'
                    : screenshotDataUrl
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-700 hover:border-blue-500/50 bg-slate-950/40 hover:bg-slate-950/70'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                {screenshotDataUrl ? (
                  <div className="space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg relative group">
                      <img
                        src={screenshotDataUrl}
                        alt="Uploaded screenshot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                      <FileCheck className="w-4 h-4" />
                      <span>{screenshotFileName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Click or drag a new image to replace
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="font-heading font-bold text-sm sm:text-base text-white">
                      📸 Upload Payment Screenshot
                    </div>
                    <div className="text-xs text-slate-400">
                      PNG / JPG • Maximum 5 MB
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Drag and drop your file here, or click to browse
                    </p>
                  </div>
                )}
              </div>

              {/* Small note */}
              <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Make sure the screenshot is clear and the recipient name is visible.</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                id="verify-payment-btn"
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>VERIFY PAYMENT →</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
