import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Info, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import { PAPIER_STAFFELN, SCHECKKARTEN_STAFFELN } from '../data/fristenData';

type LicenseType = 'papier' | 'scheckkarte' | 'neu';

export const FristenRechner: React.FC = () => {
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const typ = p.get('typ');
      if (typ === 'papier' || typ === 'scheckkarte' || typ === 'neu') {
        setLicenseType(typ);
      }
    } catch {}
  }, []);

  const shareFristLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?typ=${licenseType}`;
    navigator.clipboard.writeText(url);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  const [licenseType, setLicenseType] = useState<LicenseType>('scheckkarte');
  const [selectedPapierIndex, setSelectedPapierIndex] = useState<number>(0);
  const [selectedScheckkarteIndex, setSelectedScheckkarteIndex] = useState<number>(0);
  const [scheckkarteBornBefore1953, setScheckkarteBornBefore1953] = useState<boolean | null>(null);

  const activePapier = PAPIER_STAFFELN[selectedPapierIndex];
  const activeScheckkarte = SCHECKKARTEN_STAFFELN[selectedScheckkarteIndex];

  return (
    <div id="rechner" className="scroll-mt-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              Interaktiver Stufenplan-Rechner
            </div>
            <button
              type="button"
              onClick={shareFristLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold transition-all active:scale-95"
            >
              {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedShareLink ? 'Link kopiert!' : 'Rechner-Link kopieren'}</span>
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Führerschein umtauschen: Wann läuft Ihre Frist ab?
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Wählen Sie Ihren Führerscheintyp und Ihr Geburts- oder Ausstellungsjahr. Der Fristenrechner ermittelt sofort Ihre Umtauschfrist nach Ihren Angaben (Anlage 8e FeV).
          </p>
        </div>

        {/* Step 1: Format Selector */}
        <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Schritt 1: Welchen Führerschein besitzen Sie aktuell?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setLicenseType('papier')}
              className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                licenseType === 'papier'
                  ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 text-[10px] font-black rounded bg-amber-100 text-amber-900 mb-2">
                  Bis 31.12.1998
                </span>
                <p className="font-bold text-slate-900 text-sm">Papierführerschein</p>
                <p className="text-xs text-slate-500 mt-1">Graues oder rosafarbenes Papierdokument (alte Klasse 3, 1, 2)</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className={licenseType === 'papier' ? 'text-amber-700' : 'text-slate-400'}>
                  Maßgeblich: Geburtsjahr
                </span>
                {licenseType === 'papier' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setLicenseType('scheckkarte')}
              className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                licenseType === 'scheckkarte'
                  ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 text-[10px] font-black rounded bg-emerald-100 text-emerald-900 mb-2">
                  01.01.1999 – 18.01.2013
                </span>
                <p className="font-bold text-slate-900 text-sm">Scheckkarten-Führerschein</p>
                <p className="text-xs text-slate-500 mt-1">Plastikkarte ohne Befristungsdatum in Feld 4b</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className={licenseType === 'scheckkarte' ? 'text-amber-700' : 'text-slate-400'}>
                  Maßgeblich: Ausstellungsjahr (Feld 4a)
                </span>
                {licenseType === 'scheckkarte' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setLicenseType('neu')}
              className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                licenseType === 'neu'
                  ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 text-[10px] font-black rounded bg-slate-200 text-slate-800 mb-2">
                  Ab 19.01.2013
                </span>
                <p className="font-bold text-slate-900 text-sm">Neuer EU-Kartenführerschein</p>
                <p className="text-xs text-slate-500 mt-1">Bereits mit 15-jähriger Gültigkeitsbefristung ausgestellt</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className={licenseType === 'neu' ? 'text-amber-700' : 'text-slate-400'}>
                  Kein Stufenplan-Zwang
                </span>
                {licenseType === 'neu' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Year Selector & Dynamic Result */}
        <div className="p-6 sm:p-8 bg-white">
          {licenseType === 'papier' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Schritt 2: Ihr Geburtsjahrgang
              </label>
              <select
                value={selectedPapierIndex}
                onChange={(e) => setSelectedPapierIndex(Number(e.target.value))}
                className="w-full sm:w-80 px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm mb-6"
              >
                {PAPIER_STAFFELN.map((s, idx) => (
                  <option key={idx} value={idx}>
                    Geboren: {s.geburtsjahr}
                  </option>
                ))}
              </select>

              {/* Dynamic Result Card */}
              <div className={`rounded-2xl p-6 border ${
                activePapier.status === 'abgelaufen'
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                  <div>
                    <div className="flex items-center gap-2">
                      {activePapier.status === 'abgelaufen' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-black text-xs border border-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                          Frist abgelaufen
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Frist bis 2033
                        </span>
                      )}
                      <span className="text-xs text-slate-600 font-medium">Geburtsjahr: {activePapier.geburtsjahr}</span>
                    </div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                      Fristdatum: {activePapier.frist}
                    </div>
                  </div>

                  <a
                    href="#checkliste"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm shrink-0"
                  >
                    Unterlagen ansehen
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                </div>

                <div className="pt-4 text-xs sm:text-sm text-slate-700 space-y-2">
                  <p className="font-semibold text-slate-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{activePapier.hinweis}</span>
                  </p>
                  {activePapier.status === 'abgelaufen' && (
                    <div className="bg-white/80 p-3 rounded-lg border border-rose-100 text-xs text-slate-700 space-y-1">
                      <p><strong>Wichtig bei abgelaufener Frist:</strong> Ihre Fahrerlaubnis erlischt nicht! Das Dokument selbst verliert jedoch seine Gültigkeit. Bei Polizeikontrollen droht ein Verwarngeld von 10 €. Im Ausland oder bei Mietwagenanbietern kann die Weiterfahrt untersagt werden.</p>
                      <p className="text-slate-600">Es ist <strong>keine</strong> erneute Fahrprüfung und <strong>kein</strong> Gesundheitstest für PKW-Fahrer erforderlich.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {licenseType === 'scheckkarte' && (
            <div>
              {/* Frage: Vor 1953 geboren? (Anlage 8e Satz 3 FeV) */}
              <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50/80">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Schritt 2: Sind Sie vor 1953 geboren? (Geburtsjahrgang bis 1952)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setScheckkarteBornBefore1953(false)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border-2 transition-all text-left flex items-center justify-between ${
                      scheckkarteBornBefore1953 === false
                        ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-400/20'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span>Nein, Jahrgang 1953 oder später</span>
                    {scheckkarteBornBefore1953 === false && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheckkarteBornBefore1953(true)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border-2 transition-all text-left flex items-center justify-between ${
                      scheckkarteBornBefore1953 === true
                        ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-400/20'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span>Ja, vor 1953 geboren (Altersausnahme)</span>
                    {scheckkarteBornBefore1953 === true && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Gesetzliche Sonderregelung nach Anlage 8e FeV: Für alle vor 1953 Geborenen gilt stets die Frist 19.01.2033 – unabhängig vom Ausstellungsjahr.
                </p>
              </div>

              {/* Unselected state hint */}
              {scheckkarteBornBefore1953 === null && (
                <div className="rounded-2xl p-6 border border-slate-200 bg-slate-50 text-center">
                  <Info className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-900 text-sm">
                    Bitte wählen Sie oben Ihren Geburtszeitraum aus
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Wählen Sie „Ja“ (vor 1953) oder „Nein“ (1953 oder später), um Ihre persönliche Umtauschfrist anzuzeigen.
                  </p>
                </div>
              )}

              {/* Wenn nicht vor 1953 geboren: Ausstellungsjahr Feld 4a abfragen */}
              {scheckkarteBornBefore1953 === false && (
                <>
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Schritt 3: Ausstellungsjahr des Kartenführerscheins (siehe Feld 4a)
                    </label>
                    <select
                      value={selectedScheckkarteIndex}
                      onChange={(e) => setSelectedScheckkarteIndex(Number(e.target.value))}
                      className="w-full sm:w-80 px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                    >
                      {SCHECKKARTEN_STAFFELN.map((s, idx) => (
                        <option key={idx} value={idx}>
                          Ausgestellt: {s.ausstellungsjahr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reguläre Auswertung nach Ausstellungsjahr */}
                  <div className={`rounded-2xl p-6 border ${
                    activeScheckkarte.status === 'abgelaufen'
                      ? 'bg-rose-50/70 border-rose-200'
                      : activeScheckkarte.status === 'aktuell'
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-emerald-50/70 border-emerald-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {activeScheckkarte.status === 'abgelaufen' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-black text-xs border border-rose-300">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                              Frist abgelaufen (19.01.2026)
                            </span>
                          )}
                          {activeScheckkarte.status === 'aktuell' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs border border-amber-500">
                              <Clock className="w-3.5 h-3.5 text-slate-950" />
                              Nächste reguläre Umtauschstaffel (19.01.2027)
                            </span>
                          )}
                          {activeScheckkarte.status === 'zukunft' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              Gültig bis {activeScheckkarte.frist}
                            </span>
                          )}
                          <span className="text-xs text-slate-600 font-medium">Ausstellung: {activeScheckkarte.ausstellungsjahr}</span>
                        </div>
                        <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                          Fristdatum: {activeScheckkarte.frist}
                        </div>
                      </div>

                      <a
                        href="#checkliste"
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-sm shrink-0"
                      >
                        Unterlagen bereitstellen
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="pt-4 text-xs sm:text-sm text-slate-700 space-y-2">
                      <p className="font-semibold text-slate-900 flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{activeScheckkarte.hinweis}</span>
                      </p>

                      {activeScheckkarte.status === 'abgelaufen' && (
                        <div className="bg-white/80 p-3 rounded-lg border border-rose-100 text-xs text-slate-700 space-y-1">
                          <p><strong>Wichtig bei abgelaufener Frist:</strong> Ihre Fahrerlaubnis erlischt nicht! Das Kartendokument selbst verliert jedoch seine Gültigkeit. Bei Verkehrskontrollen droht ein Verwarnungsgeld (10 €). Bitte vereinbaren Sie zeitnah einen Termin.</p>
                        </div>
                      )}

                      {activeScheckkarte.status === 'aktuell' && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Tipp: Bei den Bürgerämtern und Fahrerlaubnisbehörden kommt es vor Stichtagen häufig zu mehrwöchigen Wartezeiten bei der Terminvergabe. Buchen Sie Ihren Termin rechtzeitig online.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Dynamic Result Card for Scheckkarte: Sonderfall Vor 1953 geboren */}
              {scheckkarteBornBefore1953 === true && (
                <div className="rounded-2xl p-6 border bg-emerald-50/70 border-emerald-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Gültig bis 2033 (Sonderregelung FeV)
                        </span>
                        <span className="text-xs text-slate-600 font-medium">Geburtsjahr: Vor 1953</span>
                      </div>
                      <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                        Fristdatum: 19. Januar 2033
                      </div>
                    </div>

                    <a
                      href="#checkliste"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm shrink-0"
                    >
                      Unterlagen ansehen
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  </div>

                  <div className="pt-4 text-xs sm:text-sm text-slate-700 space-y-2">
                    <p className="font-semibold text-slate-900 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Gesetzliche Sonderregelung nach Anlage 8e Satz 3 FeV: Fahrerlaubnisinhaber, deren Geburtsjahr vor 1953 liegt, müssen ihren Führerschein erst bis zum 19. Januar 2033 umtauschen – unabhängig vom Ausstellungsjahr des Dokuments.
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sie haben daher noch ausreichend Zeit und müssen vor 2033 nicht tätig werden, sofern Sie nicht freiwillig vorzeitig tauschen möchten.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {licenseType === 'neu' && (
            <div className="rounded-2xl p-6 bg-slate-100 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-base font-bold text-slate-900">
                  Kein Stufenplan-Pflichtumtausch notwendig
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Führerscheine, die ab dem <strong>19. Januar 2013</strong> ausgestellt wurden, besitzen bereits die europäische Standardbefristung von 15 Jahren. Ihr Führerschein muss erst zum Datum erneuert werden, das auf der Vorderseite in <strong>Feld 4b</strong> eingedruckt ist.
              </p>
            </div>
          )}

          {/* Nächster praktischer Schritt: Behördentermin */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Empfohlener nächster Schritt
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Zuständige Fahrerlaubnisbehörde finden &amp; Termin buchen
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Zuständig für Ihren Umtausch ist die Fahrerlaubnisbehörde (Führerscheinstelle) oder das Bürgeramt an Ihrem aktuellen Hauptwohnsitz. Nutzen Sie den behördlichen Suchdienst für direkte Online-Termine.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <a
                href="https://verwaltung.bund.de/portal/DE/leistung/99108003010000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
              >
                <span>Behörde &amp; Termin finden</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#checkliste"
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <span>Unterlagen prüfen</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Model Calculation & Legal Notice */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between flex-wrap gap-2">
            <span>* Umtauschfrist nach Ihren Angaben gemäß Stichtagen der Anlage 8e zu § 24a Abs. 2 FeV.</span>
            <span className="font-semibold text-slate-700">Rechtlich verbindlich sind stets die behördlichen Festlegungen.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
