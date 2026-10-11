import React from 'react';
import { KostenRechner } from '../components/KostenRechner';
import { Coins, Home, ChevronRight, Clock, FileCheck, ArrowRight } from 'lucide-react';

interface PageProps {
  navigate: (path: string) => void;
}

export const KostenPage: React.FC<PageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Startseite</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-amber-700 font-bold">Kosten &amp; Gebühren</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            Gebührenordnung GebOSt
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Führerschein umtauschen: Kosten &amp; Gebührenrechner
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Wie teuer ist der Führerschein-Pflichtumtausch? Berechnen Sie die behördlichen Gebühren nach der GebOSt, Passbildkosten sowie optionale Zusatzleistungen wie Direktversand oder Express-Herstellung.
          </p>
        </div>

        {/* KostenRechner Component */}
        <div className="space-y-12">
          <KostenRechner />

          {/* Cross-linking navigation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-8 border-t border-slate-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Fristen-Rechner</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prüfen Sie, bis wann Ihr Dokument spätestens getauscht sein muss.
                </p>
              </div>
              <button
                onClick={() => navigate('/rechner')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Zur Fristenprüfung</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Checkliste mitbringen</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Alle Unterlagen für den Termin bei Ihrer Führerscheinstelle prüfen.
                </p>
              </div>
              <button
                onClick={() => navigate('/checkliste')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Zur Checkliste</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
