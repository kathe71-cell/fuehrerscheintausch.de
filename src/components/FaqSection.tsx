import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/fristenData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div id="faq" className="scroll-mt-20 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          Häufige Fragen
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          FAQ: Häufige Fragen zum Führerschein umtauschen
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Verlässliche Antworten auf die wichtigsten Fragen: Wann muss ich meinen alten Führerschein umtauschen, welche Unterlagen sind nötig und welche Fristen gelten nach Anlage 8e FeV?
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust & Independence Callout */}
      <div className="mt-8 max-w-4xl mx-auto bg-slate-100 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
        <p>
          <strong>Rechtlicher Hinweis zur Beratung:</strong> Dieser Ratgeber stellt allgemeine, redaktionelle Informationen nach bestem Wissen bereit und ersetzt keine behördliche Auskunft oder formelle Rechtsberatung im Einzelfall. Wenden Sie sich bei Streitigkeiten oder Sonderkonstellationen direkt an Ihre örtlich zuständige Fahrerlaubnisbehörde.
        </p>
      </div>
    </div>
  );
};
