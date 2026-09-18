import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ProductConfig } from '../types';

interface FaqSectionProps {
  config: ProductConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How many questions are included?',
      a: `The PDF contains exactly ${config.questionsCount} objective questions.`,
    },
    {
      q: 'How many chapters?',
      a: `${config.chaptersCount} chapters.`,
    },
    {
      q: 'What is the price?',
      a: `${config.currency}${config.price} only.`,
    },
    {
      q: 'How do I pay?',
      a: `Scan the UPI QR shown on the payment page and pay ${config.currency}${config.price}.`,
    },
    {
      q: 'What should my payment screenshot show?',
      a: `The screenshot should clearly show the payment amount and recipient name "${config.recipientName}".`,
    },
    {
      q: 'When will I receive the PDF?',
      a: 'After successful payment verification.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative bg-[#070b14] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Answers to Common Queries
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about the 1500 Questions PDF and instant verification.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx + 1}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-500/5'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
