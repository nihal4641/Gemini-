import React, { useState } from 'react';
import { Eye, FileText, Download, CheckCircle, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { ProductConfig } from '../types';

interface ProductPreviewProps {
  config: ProductConfig;
  onGetPdf: () => void;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ config, onGetPdf }) => {
  const [activePage, setActivePage] = useState(1);

  // Sample authentic pages preview representation
  const samplePages = [
    {
      page: 1,
      title: 'Chapter 01: Wave & Oscillation (ASI Radio Mains Sample)',
      badge: 'Bilingual (Hindi & English)',
      content: [
        {
          q: 'Q1. A necessary condition for one-dimensional motion to be simple harmonic is that the restoring force should be:',
          hin: 'एक-आयामी गति को सरल आवर्त गति होने के लिए यह आवश्यक है कि प्रत्यानयन बल हो:',
          ans: 'Ans: (B) Proportional to displacement and directed towards equilibrium (F = -kx)',
        },
        {
          q: 'Q2. The differential equation d²x/dt² + 9x = 0 represents SHM having angular frequency (ω):',
          hin: 'अंतर समीकरण ẍ + 9x = 0 कोणीय आवृत्ति वाले सरल आवर्त गति को निरूपित करता है:',
          ans: 'Ans: (C) 3 rad s⁻¹ (तुलना करने पर ω² = 9 ⟹ ω = 3)',
        },
        {
          q: 'Q3. In SHM, the phase difference between displacement and acceleration is:',
          hin: 'सरल आवर्त गति (SHM) में, विस्थापन और त्वरण के बीच कलांतर होता है:',
          ans: 'Ans: (D) π rad (180°) — विस्थापन और त्वरण विपरीत दिशा में होते हैं।',
        },
      ],
    },
    {
      page: 2,
      title: 'Chapter 02: Damped & Forced Oscillations, Q-Factor',
      badge: 'High-Yield Theory & Solved MCQs',
      content: [
        {
          q: 'Q16. The equation of a viscously damped oscillator is given by:',
          hin: 'एक श्यानता-अवमंदित दोलित्र का समीकरण है:',
          ans: 'Ans: (B) m d²x/dt² + b dx/dt + kx = 0',
        },
        {
          q: 'Q17. For an underdamped oscillator, the damped angular frequency is:',
          hin: 'अल्प-अवमंदित दोलित्र के लिए, अवमंदित कोणीय आवृत्ति होती है:',
          ans: 'Ans: (C) ω_d = √(ω₀² - β²), जहाँ β = b / (2m)',
        },
        {
          q: 'Q18. Critical damping occurs when damping coefficient β and natural frequency ω₀ satisfy:',
          hin: 'क्रांतिक अवमंदन तब होता है जब:',
          ans: 'Ans: (B) β = ω₀ (सिस्टम बिना दोलन किए न्यूनतम समय में साम्यावस्था में लौटता है)',
        },
      ],
    },
    {
      page: 3,
      title: 'Chapter 03: Group Velocity, Phase Velocity & Dispersion',
      badge: 'Standard Competitive Examination Pattern',
      content: [
        {
          q: 'Q31. What does group velocity (v_g) represent in wave propagation?',
          hin: 'तरंग संचरण में समूह वेग (v_g) किसे व्यक्त करता है?',
          ans: 'Ans: (B) The velocity with which the envelope / wave packet energy propagates',
        },
        {
          q: 'Q32. For non-dispersive medium, what is the relation between v_g and v_p?',
          hin: 'अपरिक्षेपी माध्यम में कला वेग और समूह वेग का संबंध:',
          ans: 'Ans: (A) v_g = v_p (फेज वेलोसिटी और ग्रुप वेलोसिटी बराबर होती हैं)',
        },
        {
          q: 'Q33. Rayleigh dispersion formula relating phase velocity and group velocity is:',
          hin: 'रेले का परिक्षेपण सूत्र क्या है?',
          ans: 'Ans: (A) v_g = v_p - λ (dv_p / dλ)',
        },
      ],
    },
  ];

  return (
    <section id="product-preview" className="py-16 md:py-24 relative border-t border-white/5 bg-[#060913]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            Verified Sample View
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            ONE PDF. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              1500 QUESTIONS.
            </span> <br />
            {config.currency}{config.price}.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Clean typography, bilingual questions, and verified solution keys ready to practice immediately.
          </p>
        </div>

        {/* PDF Preview Mockup Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-2xl p-4 sm:p-8 backdrop-blur-2xl">
            
            {/* Top Bar of Document Previewer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {config.pdfFileName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    High Quality Vector PDF • Printable & Mobile Friendly
                  </p>
                </div>
              </div>

              {/* Page Navigator */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                  disabled={activePage === 1}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-300 px-2">
                  Sample Page {activePage} / 3
                </span>
                <button
                  onClick={() => setActivePage(Math.min(3, activePage + 1))}
                  disabled={activePage === 3}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inner Document Sheet Mockup */}
            <div className="rounded-2xl bg-[#0b1224] border border-blue-500/20 p-5 sm:p-7 shadow-inner space-y-4">
              
              {/* Document Sheet Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-500/20">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                    ALL EXAM BOOST EXCLUSIVE
                  </span>
                  <h5 className="font-heading font-black text-base sm:text-lg text-white">
                    {samplePages[activePage - 1].title}
                  </h5>
                </div>
                <span className="text-[11px] font-semibold text-sky-300 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-500/30">
                  {samplePages[activePage - 1].badge}
                </span>
              </div>

              {/* Sample Question Items */}
              <div className="space-y-4">
                {samplePages[activePage - 1].content.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                  >
                    <p className="text-xs sm:text-sm font-semibold text-slate-100">
                      {item.q}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.hin}
                    </p>
                    <div className="pt-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{item.ans}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Watermark notice */}
              <div className="pt-3 text-center border-t border-white/5">
                <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
                  ✦ Sample Preview • Full 1500 Questions Included In Final PDF ✦
                </span>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs text-slate-400 font-medium">
                  Instant digital download upon verification
                </div>
                <div className="text-lg font-black text-amber-400 font-heading">
                  {config.currency}{config.price} ONLY • LIFETIME ACCESS
                </div>
              </div>

              <button
                id="preview-get-access-btn"
                onClick={onGetPdf}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-lg shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>GET ACCESS</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
