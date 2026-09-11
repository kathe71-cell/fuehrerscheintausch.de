import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Schnellzugriff Fristen-Check" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black text-white leading-tight">Frist 2026 prüfen</p>
            <p className="text-[10px] text-slate-400">Anlage 8e FeV *</p>
          </div>
        </div>

        <a
          href="#rechner"
          className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <span>Zum Rechner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
