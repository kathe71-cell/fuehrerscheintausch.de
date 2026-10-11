import React from 'react';
import { ArrowLeft, Briefcase, Mail, CheckCircle2 } from 'lucide-react';

interface ProjektuebernahmePageProps {
  navigate?: (path: string) => void;
}

export default function ProjektuebernahmePage({ navigate }: ProjektuebernahmePageProps) {
  const handleBack = () => {
    if (navigate) {
      navigate('/');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 mb-6 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Projektübernahme
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Informationen zur Übernahme von fuehrerscheintausch.de
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <p className="text-base text-slate-800 leading-relaxed font-medium">
            Eine Übernahme von <strong>fuehrerscheintausch.de</strong> als vollständiges Projekt ist grundsätzlich möglich.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Gegenstand einer möglichen Übernahme
            </h2>
            <ul className="space-y-2.5 text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Premium-Domain <strong>fuehrerscheintausch.de</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Vollständiges Website-Projekt &amp; Architektur</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Quellcode (React / TypeScript / Vite / SSG-Pipeline)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Bestehende redaktionelle Inhalte, FAQ &amp; Fristendatenbank</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Projektspezifische technische Komponenten (Fristenrechner, Embed-Widget, Analytics Hub)</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 bg-amber-50/60 p-6 rounded-xl border border-amber-200/80">
            <h2 className="text-base font-bold text-amber-950 mb-1">
              Interesse an einer Projektübernahme?
            </h2>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Senden Sie Ihre Anfrage bitte direkt über den folgenden Kontakt-Button.
            </p>
            <a
              href="mailto:jens@kathe.org?subject=Projekt%C3%BCbernahme%20fuehrerscheintausch.de"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Kontakt aufnehmen</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
