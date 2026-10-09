import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      {/* Top Banner / Disclaimer */}
      <div className="border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Wichtiger rechtlicher Hinweis:</strong> fuehrerscheintausch.de ist ein unabhängiges Informations- und Ratgeberportal. Dieses Angebot steht in keinem gesellschaftsrechtlichen, amtlichen oder behördlichen Verhältnis zu Fahrerlaubnisbehörden, Städten, Landkreisen oder Bundesministerien. Alle Fristen beruhen auf der Anlage 8e zu § 24a Abs. 2 der Fahrerlaubnis-Verordnung (FeV).
            </p>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0 self-end md:self-center font-mono">
            Stand: 2026
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Col 1: About Portal */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Shield className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                fuehrerschein<span className="text-amber-400">tausch</span>.de
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-md">
              Der bundesweite Leitfaden für den gesetzlichen Führerschein-Pflichtumtausch. Wir informieren Autofahrer verständlich, neutral und kostenlos über Fristen, notwendige Unterlagen, Gebühren und die Vorbereitung Ihres Behördentermins.
            </p>
            <p className="text-[11px] text-slate-400">
              * Mit Sternchen (*) gekennzeichnete Verweise sind Partnerlinks / Werbelinks. Bei Abschluss erhalten wir ggf. eine geringe Provision, ohne dass für Sie Mehrkosten entstehen.
            </p>
          </div>

          {/* Col 2: Navigation & Tools */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Ratgeber & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('rechner')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Fristen-Rechner 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('stufenplan')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Stufenplan nach FeV
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('checkliste')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Unterlagen-Checkliste
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('kosten')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Kosten & Gebühren
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Häufige Fragen (FAQ)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} fuehrerscheintausch.de • Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/impressum')} className="hover:text-white transition-colors">
              Impressum
            </button>
            <span>•</span>
            <button onClick={() => navigate('/datenschutz')} className="hover:text-white transition-colors">
              Datenschutz
            </button>
            <span>•</span>
            <button onClick={() => navigate('/analytics')} className="hover:text-amber-400 text-slate-300 font-semibold transition-colors inline-flex items-center gap-1">
              <span>▲</span> Analytics Hub
            </button>
            <span>•</span>
            <span className="text-slate-400">100% DSGVO-konform (Zero-CDN)</span>
          </div>
        </div>
      </div>
    
            <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
              <span className="font-bold text-white block mb-1">Projektübernahme</span>
              <p className="mb-2">Interesse an der Übernahme von fuehrerscheintausch.de inklusive Projekt?</p>
              <a href="/projektuebernahme" className="text-blue-400 hover:text-blue-300 font-medium">
                Mehr erfahren &rarr;
              </a>
            </div>

</footer>
  );
};
