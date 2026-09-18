import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface PhonePeQrProps {
  customImageUrl?: string;
  recipientName: string;
  upiId: string;
  amount: number;
  className?: string;
}

export const PhonePeQr: React.FC<PhonePeQrProps> = ({
  customImageUrl,
  recipientName,
  upiId,
  amount,
  className = '',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // If a custom uploaded image was provided by the user in the admin panel, use that directly
    if (customImageUrl) {
      setQrDataUrl(customImageUrl);
      return;
    }

    // Generate UPI standard payment string
    const encodedPn = encodeURIComponent(recipientName);
    const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodedPn}&am=${amount}&cu=INR&tn=ALLEXAMBOOST%201500%20Questions`;

    QRCode.toDataURL(upiUri, {
      width: 420,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [customImageUrl, recipientName, upiId, amount]);

  return (
    <div className={`relative mx-auto w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-900 ${className}`}>
      {/* PhonePe Header Branding */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-black text-sm shadow-sm">
            पे
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5f259f] block leading-none">
              PhonePe
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              Accepted Here
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-900 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
            ₹{amount}
          </span>
        </div>
      </div>

      {/* QR Code with Center Logo */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white p-2 border border-slate-100 flex items-center justify-center shadow-inner">
        {qrDataUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={qrDataUrl}
              alt="PhonePe UPI QR Scanner"
              className="w-full h-full object-contain rounded-xl"
            />
            {/* Center PhonePe 'पे' Icon if dynamically rendered */}
            {!customImageUrl && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-black text-lg border-2 border-white shadow-md">
                  पे
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            Loading QR Scanner...
          </div>
        )}
      </div>

      {/* Recipient Details & Security Notice */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 text-center">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
          UPI RECIPIENT
        </div>
        <div className="text-sm font-bold text-slate-900 tracking-tight mt-0.5 flex items-center justify-center gap-1.5">
          <span>{recipientName}</span>
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[8px] font-bold">
            ✓
          </span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1 font-mono">
          UPI ID: {upiId}
        </div>
        <div className="mt-2 text-[10px] bg-slate-50 rounded-lg py-1 px-2 text-slate-600 font-medium">
          Works with PhonePe, Google Pay, Paytm & any UPI app
        </div>
      </div>
    </div>
  );
};
