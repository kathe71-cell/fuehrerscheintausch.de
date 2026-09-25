import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Scale } from 'lucide-react';

interface ImpressumProps {
  navigate: (path: string) => void;
}

export const Impressum: React.FC<ImpressumProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 mb-6 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Impressum
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Rechtliche Pflichtangaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 MStV
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Angaben nach § 5 DDG */}
          <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs text-slate-500">
              Angaben gemäß § 5 DDG
            </h2>
            <div className="space-y-2 text-slate-800">
              <p className="font-extrabold text-base">Jens Kathe</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Hansastraße 6, 34119 Kassel, Deutschland</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href="mailto:jens@kathe.org" className="text-amber-700 hover:underline">jens@kathe.org</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href="tel:+491786652623" className="text-amber-700 hover:underline">+49 178 6652623</a>
              </div>
            </div>
          </section>

          {/* Verantwortlich nach MStV */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV
            </h2>
            <p>
              Jens Kathe<br />
              Hansastraße 6<br />
              34119 Kassel<br />
              Deutschland
            </p>
          </section>

          {/* Verbraucherschlichtung */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Verbraucherstreitbeilegung & Online-Streitbeilegung
            </h2>
            <p className="mb-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter folgendem Link finden:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:underline break-all"
              >
                https://ec.europa.eu/consumers/odr
              </a>.
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Portalhinweis / Transparenz */}
          <section className="bg-amber-50/60 p-5 rounded-xl border border-amber-200/80">
            <h2 className="text-sm font-bold text-amber-950 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Unabhängigkeit & Behördenhinweis
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>fuehrerscheintausch.de</strong> ist ein privates, unabhängiges Informationsportal. Dieses Angebot steht in keinem gesellschaftsrechtlichen, amtlichen oder behördlichen Verhältnis zu Fahrerlaubnisbehörden, Kommunen oder Ministerien der Bundesrepublik Deutschland. Alle Angaben zu Fristen und Gebühren beruhen auf öffentlich zugänglichen Gesetzestexten (insb. Fahrerlaubnis-Verordnung FeV und GebOSt).
            </p>
          </section>

          {/* Haftung für Inhalte & Links */}
          <section className="text-xs text-slate-500 space-y-3 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-700">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <h3 className="font-bold text-slate-700">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
