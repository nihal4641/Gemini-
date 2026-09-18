import React, { useState, useRef } from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  DollarSign, 
  Edit3, 
  Save, 
  RefreshCw, 
  ArrowLeft, 
  LogOut, 
  AlertCircle,
  ExternalLink,
  Download,
  Trash2
} from 'lucide-react';
import { ProductConfig, OrderSubmission, Chapter } from '../types';
import { 
  getOrders, 
  saveOrders, 
  updateOrderStatus, 
  saveProductConfig,
  isAdminAuthenticated, 
  setAdminAuthenticated 
} from '../services/storage';

interface AdminDashboardProps {
  config: ProductConfig;
  onUpdateConfig: (newConfig: ProductConfig) => void;
  onClose: () => void;
  onViewOrderAccess?: (order: OrderSubmission) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  onUpdateConfig,
  onClose,
  onViewOrderAccess,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');

  // Orders State
  const [orders, setOrders] = useState<OrderSubmission[]>(getOrders());
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<OrderSubmission | null>(null);
  const [rejectionModalOrder, setRejectionModalOrder] = useState<OrderSubmission | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // Settings State Form
  const [title, setTitle] = useState(config.title);
  const [price, setPrice] = useState(config.price);
  const [recipientName, setRecipientName] = useState(config.recipientName);
  const [upiId, setUpiId] = useState(config.upiId);
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [chapters, setChapters] = useState<Chapter[]>(config.chapters);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const qrFileInputRef = useRef<HTMLInputElement>(null);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'admin123' || pinInput.trim() === '8989') {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Password/PIN. (Default PIN is admin123)');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const refreshOrders = () => {
    setOrders(getOrders());
  };

  const handleApprove = (orderId: string) => {
    const updated = updateOrderStatus(orderId, 'APPROVED');
    if (updated) {
      refreshOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const handleOpenReject = (order: OrderSubmission) => {
    setRejectionModalOrder(order);
    setRejectionReasonInput('Payment screenshot did not match the expected ₹89 or recipient Ashutosh Kumar Ray.');
  };

  const handleConfirmReject = () => {
    if (!rejectionModalOrder) return;
    const updated = updateOrderStatus(rejectionModalOrder.id, 'REJECTED', rejectionReasonInput);
    if (updated) {
      refreshOrders();
      if (selectedOrder?.id === rejectionModalOrder.id) {
        setSelectedOrder(updated);
      }
    }
    setRejectionModalOrder(null);
  };

  // QR Image Upload Handler
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updatedConfig = { ...config, qrCodeUrl: dataUrl };
      onUpdateConfig(updatedConfig);
      saveProductConfig(updatedConfig);
      setSaveSuccessMsg('Payment QR Scanner replaced successfully!');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // PDF File Upload Handler
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updatedConfig = { 
        ...config, 
        pdfFileUrl: dataUrl,
        pdfFileName: file.name 
      };
      onUpdateConfig(updatedConfig);
      saveProductConfig(updatedConfig);
      setSaveSuccessMsg(`Final PDF "${file.name}" uploaded successfully!`);
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedConfig: ProductConfig = {
      ...config,
      title: title.trim(),
      price: Number(price) || 89,
      recipientName: recipientName.trim(),
      upiId: upiId.trim(),
      whatsappNumber: whatsappNumber.trim(),
      chapters,
    };
    onUpdateConfig(updatedConfig);
    saveProductConfig(updatedConfig);
    setSaveSuccessMsg('Admin settings saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleChapterChange = (index: number, field: 'number' | 'title' | 'subtitle', val: string) => {
    const updated = [...chapters];
    updated[index] = { ...updated[index], [field]: val };
    setChapters(updated);
  };

  // Counts
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const approvedOrders = orders.filter(o => o.status === 'APPROVED').length;
  const rejectedOrders = orders.filter(o => o.status === 'REJECTED').length;

  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'ALL') return true;
    return o.status === statusFilter;
  });

  // If not authenticated, render login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-slate-900/95 border border-blue-500/30 p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              ALL EXAM BOOST
            </h2>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mt-0.5">
              Admin Portal Login
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Default password: <span className="text-amber-400 font-mono font-bold">admin123</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Sign In to Admin
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100">
      
      {/* Top Admin Navigation Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              AEB
            </div>
            <div>
              <h1 className="font-heading font-black text-base text-white">
                ALL EXAM BOOST — ADMIN
              </h1>
              <p className="text-[10px] text-slate-400">
                1500 Questions Management & Verification System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:text-white text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards (TOTAL ORDERS, PENDING, APPROVED, REJECTED) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              TOTAL ORDERS
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
              {totalOrders}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              All lifetime customer attempts
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
              PENDING
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-amber-400 mt-1">
              {pendingOrders}
            </div>
            <span className="text-[11px] text-amber-200/70 mt-1 block">
              Requires manual verification
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
              APPROVED
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-emerald-400 mt-1">
              {approvedOrders}
            </div>
            <span className="text-[11px] text-emerald-200/70 mt-1 block">
              PDF access link active
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-300 block">
              REJECTED
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-red-400 mt-1">
              {rejectedOrders}
            </div>
            <span className="text-[11px] text-red-200/70 mt-1 block">
              Disallowed / Invalid UTR
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Order Submissions & Verification ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Product & QR / PDF Settings
            </button>
          </div>

          {saveSuccessMsg && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-lg animate-pulse">
              ✓ {saveSuccessMsg}
            </span>
          )}
        </div>

        {/* TAB 1: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5">
                {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      statusFilter === st
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={refreshOrders}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Orders</span>
              </button>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Customer Name</th>
                    <th className="py-3.5 px-4 font-bold">WhatsApp</th>
                    <th className="py-3.5 px-4 font-bold">UTR ID</th>
                    <th className="py-3.5 px-4 font-bold">Amount</th>
                    <th className="py-3.5 px-4 font-bold">Screenshot</th>
                    <th className="py-3.5 px-4 font-bold">Verification Status</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        No {statusFilter.toLowerCase()} orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          {ord.fullName}
                          <span className="block text-[10px] text-slate-500 font-mono">
                            {ord.id}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium">
                          {ord.whatsapp}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {ord.utrId}
                        </td>
                        <td className="py-3.5 px-4 font-black text-amber-400 font-heading">
                          ₹{ord.amount}
                        </td>
                        <td className="py-3.5 px-4">
                          {ord.screenshotDataUrl ? (
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-400 cursor-pointer shadow-sm relative group"
                            >
                              <img
                                src={ord.screenshotDataUrl}
                                alt="proof thumbnail"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500 italic">No image</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              ord.status === 'APPROVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : ord.status === 'PENDING'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {ord.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                            {ord.status === 'PENDING' && <Clock className="w-3 h-3" />}
                            {ord.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                            <span>{ord.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-slate-400 whitespace-nowrap">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {/* VIEW Action */}
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              title="View details & OCR notes"
                              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                            >
                              VIEW
                            </button>

                            {/* APPROVE Action */}
                            {ord.status !== 'APPROVED' && (
                              <button
                                onClick={() => handleApprove(ord.id)}
                                title="Approve & grant PDF access"
                                className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                              >
                                APPROVE
                              </button>
                            )}

                            {/* REJECT Action */}
                            {ord.status !== 'REJECTED' && (
                              <button
                                onClick={() => handleOpenReject(ord)}
                                title="Reject order"
                                className="px-2.5 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
                              >
                                REJECT
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ADMIN SETTINGS (QR, PDF, PRICE, CHAPTERS) */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-4xl">
            
            {/* PROMINENT PLACEHOLDERS MANDATED IN PROMPT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* PLACEHOLDER 1: PAYMENT QR / SCANNER IMAGE */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-dashed border-blue-500/50 text-center space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Scanner Asset
                  </span>
                  {config.qrCodeUrl && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                      Custom Image Active
                    </span>
                  )}
                </div>

                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <ImageIcon className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="font-heading font-black text-lg text-white">
                    [UPLOAD PAYMENT QR HERE]
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Replace the payment scanner image with your official PhonePe or UPI scanner.
                  </p>
                </div>

                {config.qrCodeUrl && (
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-white/20 p-1 bg-white">
                    <img
                      src={config.qrCodeUrl}
                      alt="Current payment QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <input
                  ref={qrFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleQrUpload}
                  className="hidden"
                />

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => qrFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Upload / Replace Payment QR
                  </button>

                  {config.qrCodeUrl && (
                    <button
                      onClick={() => {
                        const updated = { ...config, qrCodeUrl: '' };
                        onUpdateConfig(updated);
                        saveProductConfig(updated);
                        setSaveSuccessMsg('Reverted to dynamic PhonePe QR');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>

              {/* PLACEHOLDER 2: FINAL PDF FILE */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-dashed border-amber-500/50 text-center space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Product Download File
                  </span>
                  {config.pdfFileUrl ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                      Custom PDF Linked
                    </span>
                  ) : (
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                      Built-in PDF Generator Active
                    </span>
                  )}
                </div>

                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="font-heading font-black text-lg text-white">
                    [UPLOAD FINAL 1500 QUESTIONS PDF HERE]
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Upload your exact 1500 questions final document file to distribute automatically to buyers.
                  </p>
                </div>

                <div className="text-xs text-slate-300 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
                  Current file: {config.pdfFileName}
                </div>

                <input
                  ref={pdfFileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => pdfFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/30 transition-all cursor-pointer"
                  >
                    Upload / Replace PDF
                  </button>

                  {config.pdfFileUrl && (
                    <button
                      onClick={() => {
                        const updated = { ...config, pdfFileUrl: null, pdfFileName: 'ALL_EXAM_BOOST_1500_Questions.pdf' };
                        onUpdateConfig(updated);
                        saveProductConfig(updated);
                        setSaveSuccessMsg('Reset to built-in preparation PDF generator');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* EDITABLE PRODUCT SETTINGS FORM */}
            <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading font-black text-xl text-white">
                  Product Details & Payment Coordinates
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Product Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Edit Product Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                {/* Product Price */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Edit Product Price (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">Default: ₹89</span>
                </div>

                {/* Default Recipient */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Recipient Name (For Verification)
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-semibold"
                  />
                  <span className="text-[10px] text-slate-500">Default: Ashutosh Kumar Ray</span>
                </div>

                {/* UPI ID */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>

                {/* WhatsApp Support Number */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Edit WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-medium"
                  />
                </div>

              </div>

              {/* EDIT CHAPTER NAMES */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div>
                  <h4 className="font-heading font-black text-base text-white">
                    Edit Chapter Names (5 Chapters)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Update the title or topics of any chapter displayed across the storefront.
                  </p>
                </div>

                <div className="space-y-3">
                  {chapters.map((ch, idx) => (
                    <div
                      key={ch.id}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={ch.number}
                          onChange={(e) => handleChapterChange(idx, 'number', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-blue-300 font-mono"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={ch.title}
                          onChange={(e) => handleChapterChange(idx, 'title', e.target.value)}
                          placeholder="Chapter title"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={ch.subtitle}
                          onChange={(e) => handleChapterChange(idx, 'subtitle', e.target.value)}
                          placeholder="Topic subtitle"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  Save Settings & Chapter Names
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      {/* ORDER INSPECTION MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                  {selectedOrder.id}
                </span>
                <h3 className="font-heading font-black text-xl text-white">
                  Order Verification Review
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Name</span>
                <span className="font-bold text-white">{selectedOrder.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">WhatsApp</span>
                <span className="font-semibold text-white">{selectedOrder.whatsapp}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">UTR ID</span>
                <span className="font-mono font-bold text-amber-300">{selectedOrder.utrId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Status</span>
                <span className="font-bold text-white">{selectedOrder.status}</span>
              </div>
            </div>

            {/* Screenshot Preview */}
            <div>
              <span className="text-xs font-bold uppercase text-slate-400 block mb-2">
                Payment Screenshot Proof:
              </span>
              {selectedOrder.screenshotDataUrl ? (
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-black max-h-72 flex items-center justify-center">
                  <img
                    src={selectedOrder.screenshotDataUrl}
                    alt="Payment screenshot proof"
                    className="max-h-72 object-contain"
                  />
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-950 rounded-xl">
                  No image attached for this mock order.
                </div>
              )}
            </div>

            {/* OCR Diagnostics Notes */}
            {selectedOrder.ocrResult && (
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-2 text-xs">
                <span className="font-bold text-blue-300 block">
                  Automated Security & OCR Analysis:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {selectedOrder.ocrResult.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              {selectedOrder.status === 'APPROVED' && selectedOrder.accessKey && onViewOrderAccess && (
                <button
                  onClick={() => {
                    onViewOrderAccess(selectedOrder);
                    setSelectedOrder(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Student Success Page</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {selectedOrder.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleApprove(selectedOrder.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    ✓ APPROVE ORDER
                  </button>
                )}

                {selectedOrder.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleOpenReject(selectedOrder)}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 cursor-pointer"
                  >
                    ✕ REJECT ORDER
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectionModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-red-500/40 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading font-black text-lg text-white">
              Reject Order {rejectionModalOrder.id}
            </h3>
            <p className="text-xs text-slate-400">
              Provide a reason to display to the customer:
            </p>

            <textarea
              rows={3}
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectionModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
