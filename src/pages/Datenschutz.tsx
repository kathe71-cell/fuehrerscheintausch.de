import React from 'react';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Mail } from 'lucide-react';

interface DatenschutzProps {
  navigate: (path: string) => void;
}

export const Datenschutz: React.FC<DatenschutzProps> = ({ navigate }) => {
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
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Datenschutzerklärung
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Informationen über die Verarbeitung Ihrer Daten nach Art. 13 DSGVO (Zero-CDN & datensparsam)
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Verantwortlicher */}
          <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              1. Verantwortliche Stelle
            </h2>
            <p className="text-slate-800">Verantwortlicher im Sinne der DSGVO ist der Website-Betreiber. Vollständige Kontaktdaten und ladungsfähige Anschrift siehe <a href="/impressum" className="text-amber-700 hover:underline font-semibold">Impressum</a>.</p>
          </section>

          {/* Zero CDN & Lokale Schriften */}
          <section className="bg-emerald-50/60 p-6 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-950 font-bold mb-2">
              <EyeOff className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base">2. Privatsphäre by Design: Zero-CDN & Lokale System-Schriften</h2>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Diese Website verzichtet vollständig auf externe Content-Delivery-Networks (CDNs) und lädt <strong>keine Schriftarten von Google Fonts oder sonstigen Drittanbietern</strong>. Es werden ausschließlich die auf Ihrem Endgerät bereits installierten Systemschriftarten verwendet. Beim reinen Laden dieser Seite werden keinerlei IP-Adressen an externe Schriftarten-Server oder Dritte im EU-Ausland übertragen.
            </p>
          </section>

          {/* Hosting & Server-Logs */}
          <section>
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
              <Server className="w-5 h-5 text-slate-700" />
              <h2 className="text-base">3. Hosting und Server-Log-Dateien</h2>
            </div>
            <p className="mb-3">
              Wir hosten diese Website bei der Vercel Inc. (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA). Beim Aufruf unserer Website erfasst der Webserver automatisch technische Informationen in sogenannten Server-Log-Dateien:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 mb-3">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners / anonymisierte IP-Adresse</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
            <p className="text-xs text-slate-600">
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
            </p>
          </section>

          {/* Cookies & Tracking */}
          <section>
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
              <Lock className="w-5 h-5 text-slate-700" />
              <h2 className="text-base">4. Keine Tracking-Cookies & keine Werbe-Pixel</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Auf <strong>fuehrerscheintausch.de</strong> kommen keine zustimmungspflichtigen Tracking-Cookies, Werbe-Pixel oder Web-Analyse-Tools wie Google Analytics zum Einsatz. Sie können sich vollkommen ungestört und ohne Verfolgung Ihres Surfverhaltens informieren.
            </p>
          </section>

          {/* Kontaktaufnahme */}
          <section>
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
              <Mail className="w-5 h-5 text-slate-700" />
              <h2 className="text-base">5. Kontaktaufnahme per E-Mail oder Telefon</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b und f DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          {/* Betroffenenrechte */}
          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              6. Ihre Rechte als betroffene Person
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">
              Sie haben jederzeit das Recht auf:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="text-xs text-slate-500 mt-3">
              Zudem haben Sie das Recht auf Beschwerde bei der zuständigen Datenschutzaufsichtsbehörde (für Hessen: Der Hessische Beauftragte für Datenschutz und Informationsfreiheit).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
