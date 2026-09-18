import React from 'react';
import { BookOpen, Lock, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { ProductConfig, AppView } from '../types';

interface FooterProps {
  config: ProductConfig;
  onNavigate: (view: AppView) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenAdmin }) => {
  const scrollTo = (id: string) => {
    onNavigate('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t border-white/10 bg-[#050813] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                ALL EXAM <span className="text-blue-400">BOOST</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium italic">
              "Free Competitive Exam Preparation + Premium Practice Material"
            </p>
            <p className="text-xs text-slate-400 max-w-md">
              Helping students master objective questions across technical, police, and general competitive examinations with structured practice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('whats-inside')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  What's Inside
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-400">
              For order assistance or WhatsApp support:
            </p>
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20ALL%20EXAM%20BOOST,%20I%20have%20a%20query%20regarding%20the%201500%20Questions%20PDF`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {config.whatsappNumber}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="pt-2">
              <button
                id="footer-admin-login-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()} ALL EXAM BOOST. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Payment: UPI QR ({config.recipientName})</span>
            <span>•</span>
            <span>Price: {config.currency}{config.price}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
