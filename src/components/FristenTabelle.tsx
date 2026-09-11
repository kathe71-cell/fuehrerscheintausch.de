import React, { useState } from 'react';
import { Calendar, FileText, CheckCircle, Clock } from 'lucide-react';
import { PAPIER_STAFFELN, SCHECKKARTEN_STAFFELN } from '../data/fristenData';

export const FristenTabelle: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheckkarte' | 'papier'>('scheckkarte');

  return (
    <div id="stufenplan" className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          Bundesweiter Stufenplan
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Vollständige Fristen-Matrix (Anlage 8e FeV)
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Um die Behörden vor Überlastung zu schützen, erfolgt der Umtausch schrittweise in zwei großen Blöcken: Zunächst nach Geburtsjahrgang, anschließend nach Ausstellungsjahr.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-200/70 p-1.5 rounded-xl inline-flex gap-1">
          <button
            onClick={() => setActiveTab('scheckkarte')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'scheckkarte'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Staffel II: Scheckkarten (1999–2013)
          </button>
          <button
            onClick={() => setActiveTab('papier')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'papier'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Staffel I: Papier (bis 1998)
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {activeTab === 'scheckkarte' && (
          <div>
            <div className="bg-slate-100/70 px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Kartenführerscheine (Ausstellung 01.01.1999 bis 18.01.2013)
                </h3>
                <p className="text-xs text-slate-500">
                  Maßgeblich ist das Ausstellungsdatum auf der Vorderseite in Feld 4a.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                Staffel II läuft aktuell
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-6">Ausstellungsjahr (Feld 4a)</th>
                    <th className="py-3 px-6">Umtauschfrist</th>
                    <th className="py-3 px-6">Status & Dringlichkeit</th>
                    <th className="py-3 px-6">Hinweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SCHECKKARTEN_STAFFELN.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        row.status === 'aktuell' ? 'bg-amber-50/50 font-medium' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {row.ausstellungsjahr}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        {row.frist}
                      </td>
                      <td className="py-4 px-6">
                        {row.status === 'aktuell' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 border border-amber-500">
                            <Clock className="w-3 h-3 text-slate-950" />
                            Aktuelle Frist
                          </span>
                        )}
                        {row.status === 'zukunft' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Ausstehend
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs max-w-xs">
                        {row.hinweis}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'papier' && (
          <div>
            <div className="bg-slate-100/70 px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Papierführerscheine (Ausstellung bis 31.12.1998, grau oder rosa)
                </h3>
                <p className="text-xs text-slate-500">
                  Maßgeblich ist das Geburtsjahr des Führerscheininhabers.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold">
                Staffel I weitgehend abgelaufen
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-6">Geburtsjahrgang</th>
                    <th className="py-3 px-6">Umtauschfrist</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Hinweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PAPIER_STAFFELN.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        row.status === 'abgelaufen' ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {row.geburtsjahr}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        {row.frist}
                      </td>
                      <td className="py-4 px-6">
                        {row.status === 'abgelaufen' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            Frist abgelaufen
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Gültig bis 2033
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs max-w-xs">
                        {row.hinweis}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="p-4 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-200">
          Rechtliche Grundlage: Anlage 8e zu § 24a Absatz 2 der Fahrerlaubnis-Verordnung (FeV). Angaben ohne Gewähr.
        </div>
      </div>
    </div>
  );
};
