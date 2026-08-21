import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection({ title = "Frequently Asked Questions", subtitle = "Common inquiries before starting a residential project", faqs = [] }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-[#0e0e0e] text-white py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#141414] border-amber-400/50 shadow-xl'
                    : 'bg-[#111111] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold font-syne text-white tracking-tight">
                    {faq.q}
                  </span>
                  <span className="p-2 rounded-full bg-white/5 border border-white/10 text-amber-300 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-white/5 mt-2 pt-4">
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
}
