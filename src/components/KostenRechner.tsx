import React, { useState } from 'react';
import { Coins, Truck, Zap, Camera, ShieldCheck } from 'lucide-react';

export const KostenRechner: React.FC = () => {
  const [includeFoto, setIncludeFoto] = useState(true);
  const [includeVersand, setIncludeVersand] = useState(true);
  const [includeExpress, setIncludeExpress] = useState(false);

  // Prices
  const baseFee = 25.30;
  const fotoFee = includeFoto ? 10.00 : 0.00;
  const versandFee = includeVersand ? 5.10 : 0.00;
  const expressFee = includeExpress ? 25.00 : 0.00;

  const total = (baseFee + fotoFee + versandFee + expressFee).toFixed(2);

  return (
    <div id="kosten" className="scroll-mt-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            Transparente Kostenübersicht
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Führerschein umtauschen: Was kostet der Umtausch?
          </h2>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
            Was kostet es, den alten Führerschein umzutauschen? Die behördlichen Grundgebühren richten sich nach der GebOSt. Berechnen Sie hier die Gesamtkosten inklusive Passbild und Zusatzoptionen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Configurator */}
          <div className="lg:col-span-7 space-y-4">
            {/* Base Fee */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-200 text-slate-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Behördliche Grundgebühr</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">Fest</span>
                  </div>
                  <p className="text-xs text-slate-500">Gemäß GebOSt (Gebührenordnung für Maßnahmen im Straßenverkehr)</p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900">ca. 25,30 €</span>
            </div>

            {/* Biometric Photo */}
            <div
              onClick={() => setIncludeFoto(!includeFoto)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                includeFoto ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${includeFoto ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Biometrisches Passbild</span>
                    {includeFoto && <span className="text-[10px] font-bold text-amber-700">Ausgewählt</span>}
                  </div>
                  <p className="text-xs text-slate-500">Fotoautomat im Bürgeramt oder Foto-App (ca. 8–12 €)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">+ 10,00 €</span>
                <span className="block text-[10px] text-slate-400">Richtwert</span>
              </div>
            </div>

            {/* Direct Shipping to Home */}
            <div
              onClick={() => setIncludeVersand(!includeVersand)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                includeVersand ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${includeVersand ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Direktversand nach Hause</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Spart 2. Termin</span>
                  </div>
                  <p className="text-xs text-slate-500">Zustellung per Einwurf-Einschreiben durch die Bundesdruckerei</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">+ 5,10 €</span>
                <span className="block text-[10px] text-slate-400">Bundesdruckerei</span>
              </div>
            </div>

            {/* Express Manufacturing */}
            <div
              onClick={() => setIncludeExpress(!includeExpress)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                includeExpress ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${includeExpress ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Express-Herstellung</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">Ca. 3–5 Werktage</span>
                  </div>
                  <p className="text-xs text-slate-500">Wenn es besonders eilig ist (z. B. bevorstehende Auslandsreise)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">+ 25,00 €</span>
                <span className="block text-[10px] text-slate-400">Optional</span>
              </div>
            </div>
          </div>

          {/* Total Calculation Display Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-1">
              Geschätzte Gesamtkosten
            </h3>
            <p className="text-xs text-slate-400 mb-6">Basierend auf Ihrer Zusammenstellung</p>

            <div className="text-4xl font-black text-white tracking-tight mb-4 flex items-baseline gap-1">
              <span>{total.replace('.', ',')}</span>
              <span className="text-2xl text-amber-400">€</span>
            </div>

            <div className="space-y-2 py-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Grundgebühr Behörde:</span>
                <span className="font-mono">{baseFee.toFixed(2).replace('.', ',')} €</span>
              </div>
              {includeFoto && (
                <div className="flex justify-between">
                  <span>Passfoto (geschätzt):</span>
                  <span className="font-mono">{fotoFee.toFixed(2).replace('.', ',')} €</span>
                </div>
              )}
              {includeVersand && (
                <div className="flex justify-between">
                  <span>Direktversand:</span>
                  <span className="font-mono">{versandFee.toFixed(2).replace('.', ',')} €</span>
                </div>
              )}
              {includeExpress && (
                <div className="flex justify-between text-amber-300 font-medium">
                  <span>Express-Aufschlag:</span>
                  <span className="font-mono">{expressFee.toFixed(2).replace('.', ',')} €</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="#rechner"
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs text-center block transition-all shadow-sm"
              >
                Persönliche Umtauschfrist berechnen
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer for Calculation */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed">
          * Modellrechnung. Die tatsächliche Gebührenhöhe richtet sich nach der Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt) sowie allfälligen Auslagen und Hebesätzen Ihrer örtlichen Fahrerlaubnisbehörde.
        </div>
      </div>
    </div>
  );
};
