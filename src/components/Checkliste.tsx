import React, { useState } from 'react';
import { FileCheck, CheckSquare, Square, Printer, Camera, Info, ExternalLink } from 'lucide-react';

interface CheckItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  required: boolean;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: 'ausweis',
    title: 'Gültiges Ausweisdokument',
    description: 'Personalausweis oder Reisepass im Original',
    detail: 'Falls Sie einen Reisepass vorlegen, benötigen Sie zusätzlich eine aktuelle amtliche Meldebescheinigung (nicht älter als 3 Monate), da im Reisepass keine Anschrift eingetragen ist.',
    required: true,
  },
  {
    id: 'altfuehrerschein',
    title: 'Bisheriger Original-Führerschein',
    description: 'Der alte Papier- oder Kartenführerschein',
    detail: 'Das Original muss der Behörde vorgelegt werden. Auf Wunsch wird das Dokument nach Ausfertigung des neuen Kartenführerscheins entwertet und Ihnen als Andenken wieder ausgehändigt.',
    required: true,
  },
  {
    id: 'passbild',
    title: 'Aktuelles biometrisches Passfoto',
    description: 'Format 35 x 45 mm nach ICAO-Standard',
    detail: 'Frontalaufnahme, neutraler Gesichtsausdruck, gleichmäßige Ausleuchtung, ohne Kopfbedeckung (außer aus religiösen Gründen). Viele Bürgerämter bieten auch Fotoautomaten vor Ort an (~8–10 €).',
    required: true,
  },
  {
    id: 'karteikarte',
    title: 'Karteikartenabschrift (nur bei Behördenwechsel)',
    description: 'Auszug aus dem Fahrerlaubnisregister der Erstbehörde',
    detail: 'Wurde Ihr bisheriger Papierführerschein NICHT von der Führerscheinstelle Ihres aktuellen Wohnortes ausgestellt? Dann fordern Sie die Karteikartenabschrift vorab bei der Ausstellungsbehörde an (meist kostenlos per E-Mail oder Online-Formular).',
    required: false,
  },
];

export const Checkliste: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="checkliste" className="scroll-mt-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
              Behördentermin-Vorbereitung
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Führerschein umtauschen: Unterlagen-Checkliste
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Welche Unterlagen werden benötigt, um den Führerschein umzutauschen? Bringen Sie diese Dokumente vollständig zum Behördentermin mit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Checkliste drucken
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="my-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Ihr Vorbereitungsstatus</span>
            <span>{completedCount} von {CHECKLIST_ITEMS.length} Unterlagen bereit ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist List */}
        <div className="space-y-4">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    aria-label={isChecked ? 'Abgewählt' : 'Ausgewählt'}
                    className="mt-0.5 text-emerald-600 shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-sm sm:text-base font-bold ${
                        isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}>
                        {item.title}
                      </h3>
                      {item.required ? (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          Pflichtdokument
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                          Nur bei Behördenwechsel
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">{item.description}</p>
                    <p className="text-xs text-slate-500 mt-2 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      <Info className="w-3.5 h-3.5 text-slate-400 inline-block mr-1.5 -mt-0.5" />
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner / Service Callout for Biometric Photos */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-800 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Sie benötigen noch ein biometrisches Passbild?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Sparen Sie sich teure Fotografentermine: Nutzen Sie zertifizierte Foto-Apps oder Fotostationen direkt vor Ihrem Bürgeramt-Termin.
              </p>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=biometrisches+passbild+app+generator"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>Passbild-Services vergleichen</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 text-right">
          * Werbelink / Partnerlink: Unabhängige Empfehlungen zur schnellen Terminvorbereitung.
        </div>
      </div>
    </div>
  );
};
