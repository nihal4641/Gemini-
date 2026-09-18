import React, { useState } from 'react';
import { Menu, X, BookOpen, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { ProductConfig, AppView } from '../types';

interface NavbarProps {
  config: ProductConfig;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  currentView,
  onNavigate,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-[#090e1f] rounded-[10px] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black tracking-tight text-lg text-white">
                ALL EXAM <span className="text-blue-400">BOOST</span>
              </span>
              <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              1500 Objective Questions Bank
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            id="nav-home-btn"
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            id="nav-inside-btn"
            onClick={() => scrollToSection('whats-inside')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            What's Inside
          </button>
          <button
            id="nav-steps-btn"
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            id="nav-faq-btn"
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Right Action CTA & Admin Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-admin-btn"
            onClick={onOpenAdmin}
            title="Admin Portal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            id="nav-buy-btn"
            onClick={() => onNavigate('payment')}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>GET PDF — {config.currency}{config.price}</span>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-quick-buy-btn"
            onClick={() => onNavigate('payment')}
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg shadow-md shadow-blue-600/30"
          >
            ₹{config.price}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#090f22]/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 transition-all">
          <button
            id="mobile-nav-home"
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2.5 text-base font-medium text-slate-200 hover:text-blue-400 border-b border-white/5"
          >
            Home
          </button>
          <button
            id="mobile-nav-inside"
            onClick={() => scrollToSection('whats-inside')}
            className="block w-full text-left py-2.5 text-base font-medium text-slate-200 hover:text-blue-400 border-b border-white/5"
          >
            What's Inside (5 Chapters)
          </button>
          <button
            id="mobile-nav-steps"
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2.5 text-base font-medium text-slate-200 hover:text-blue-400 border-b border-white/5"
          >
            How It Works (Scan & Pay)
          </button>
          <button
            id="mobile-nav-faq"
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2.5 text-base font-medium text-slate-200 hover:text-blue-400 border-b border-white/5"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-3 space-y-2.5">
            <button
              id="mobile-nav-get-pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('payment');
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>GET THE PDF — {config.currency}{config.price} ONLY</span>
            </button>

            <button
              id="mobile-nav-admin"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700/60"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Dashboard & Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
