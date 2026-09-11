import React from 'react';
import { FristenRechner } from '../components/FristenRechner';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const RechnerEmbed: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-6 flex flex-col justify-between font-sans">
      <div className="max-w-4xl mx-auto w-full">
        <FristenRechner />
      </div>

      <div className="max-w-4xl mx-auto w-full mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Gesetzliche Fristen nach Anlage 8e zu § 24a Abs. 2 FeV • Geprüfter Stand 2026</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Bereitgestellt von</span>
          <a
            href="https://fuehrerscheintausch.de"
            target="_blank"
            rel="noopener"
            className="text-amber-800 font-bold hover:underline inline-flex items-center gap-0.5"
          >
            fuehrerscheintausch.de
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
