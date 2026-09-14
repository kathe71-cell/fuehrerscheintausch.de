import React from 'react';
import { Calendar, Search, MapPin, Award, ArrowRight } from 'lucide-react';

export const SchritteGuide: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Frist & Pflichtstichtag ermitteln',
      description: 'Prüfen Sie anhand Ihres Geburtsjahres (Papier) oder Ausstellungsjahres (Scheckkarte), bis zu welchem Datum Ihr Dokument spätestens getauscht sein muss.',
      icon: Calendar,
      badge: 'Schritt 1'
    },
    {
      number: '02',
      title: 'Karteikartenabschrift klären',
      description: 'Haben Sie Ihren Führerschein damals bei einer anderen Behörde gemacht als an Ihrem heutigen Wohnort? Fordern Sie telefonisch oder online kostenlos einen Registerauszug an.',
      icon: Search,
      badge: 'Schritt 2'
    },
    {
      number: '03',
      title: 'Termin buchen & Foto anfertigen',
      description: 'Vereinbaren Sie einen Termin bei Ihrer Fahrerlaubnisbehörde oder dem Bürgeramt. Bringen Sie Ausweis, Alt-Führerschein und ein aktuelles biometrisches Passbild mit.',
      icon: MapPin,
      badge: 'Schritt 3'
    },
    {
      number: '04',
      title: 'Neuen EU-Führerschein erhalten',
      description: 'Nach 2 bis 4 Wochen erhalten Sie den fälschungssicheren Kartenführerschein (Gültigkeit: 15 Jahre). Auf Wunsch erhalten Sie Ihren alten Schein entwertet zurück.',
      icon: Award,
      badge: 'Schritt 4'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
          Einfacher Leitfaden
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Führerschein umtauschen: In 4 einfachen Schritten
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          So einfach können Sie Ihren Führerschein umtauschen: Für normale PKW- und Motorradfahrer ist der Pflichtumtausch ein reiner Verwaltungsakt ohne Fahrprüfung oder Gesundheitstests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-slate-200 font-mono">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                <span>{step.badge}</span>
                {idx < 3 && <ArrowRight className="w-4 h-4 text-slate-300 hidden lg:block" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
