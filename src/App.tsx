import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FristenRechner } from './components/FristenRechner';
import { FristenTabelle } from './components/FristenTabelle';
import { Checkliste } from './components/Checkliste';
import { KostenRechner } from './components/KostenRechner';
import { SchritteGuide } from './components/SchritteGuide';
import { FaqSection } from './components/FaqSection';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Impressum } from './pages/Impressum';
import ProjektuebernahmePage from './pages/ProjektuebernahmePage';
import { Datenschutz } from './pages/Datenschutz';
import { RechnerEmbed } from './pages/RechnerEmbed';
import { ScrollToTop } from './components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { VercelAnalyticsDashboard } from './components/analytics/VercelAnalyticsDashboard';
import { Shield, Clock, FileCheck, CheckCircle2, ArrowRight, Copy, Check, Code2, BookOpen } from 'lucide-react';

export const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    // Track SPA route changes in Vercel Analytics
    if (typeof window !== 'undefined') {
      const w = window as unknown as { va?: (event: string, data: { route: string }) => void };
      if (w.va) {
        w.va('pageview', { route: currentPath });
      }
    }

    // Dynamic Canonical URL update for GSC
    const canonicalUrl = `https://www.fuehrerscheintausch.de${currentPath === '/' ? '/' : currentPath}`;
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmbedCode = () => {
    const code = `<iframe src="https://www.fuehrerscheintausch.de/rechner-embed" width="100%" height="680" style="border:none; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" title="Führerschein Fristenrechner"></iframe>\n<p style="font-size:12px; color:#64748b; text-align:center;">Fristenrechner bereitgestellt von <a href="https://www.fuehrerscheintausch.de" target="_blank" rel="noopener" style="color:#b45309; text-decoration:underline;">fuehrerscheintausch.de</a></p>`;
    navigator.clipboard.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  if (currentPath === '/rechner-embed') {
    return (
      <>
        <RechnerEmbed />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (currentPath === '/analytics' || currentPath === '/dashboard') {
    return (
      <>
        <VercelAnalyticsDashboard onBackToHome={() => navigate('/')} />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar currentPath={currentPath} navigate={navigate} />

      <main className="flex-1">
        {currentPath === '/projektuebernahme' ? (
          <ProjektuebernahmePage />
        ) : currentPath === '/impressum' ? (
          <Impressum navigate={navigate} />
        ) : currentPath === '/datenschutz' ? (
          <Datenschutz navigate={navigate} />
        ) : (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200">
              {/* Background ambient accents */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-100/30 via-emerald-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Nächste reguläre Staffel: Scheckkarten 2002–2004 (Frist: 19.01.2027)</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-amber-700 font-bold">Anlage 8e FeV</span>
                  </div>
                </div>

                {/* Hero Title & Pitch */}
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                    Führerschein umtauschen: <br className="hidden sm:inline" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-700">
                      Fristen, Rechner &amp; Unterlagen 2026
                    </span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Wann müssen Sie Ihren alten Führerschein umtauschen? Ermitteln Sie in wenigen Sekunden Ihre Umtauschfrist nach Ihren Angaben (Anlage 8e FeV), berechnen Sie die amtlichen Kosten und nutzen Sie die Checkliste für den Termin.
                  </p>

                  {/* Primary & Secondary Action */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                    <a
                      href="#rechner"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <Clock className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                      <span>Frist jetzt kostenlos prüfen</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#checkliste"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                    >
                      <FileCheck className="w-4 h-4 text-slate-600" />
                      <span>Unterlagen-Checkliste ansehen</span>
                    </a>
                  </div>

                  {/* Trust Pillars */}
                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 text-left">
                    <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Voller Besitzstandsschutz</p>
                        <p className="text-[11px] text-slate-500">Keine Fahrprüfung & kein Sehtest für reguläre PKW-Klassen nötig.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Stufenplan bis 2033</p>
                        <p className="text-[11px] text-slate-500">Bundesweit gestaffelte Fristen zur Vermeidung von Behördenstaus.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Unabhängig & Sicher</p>
                        <p className="text-[11px] text-slate-500">Reines Informationsportal nach § 5 DDG ohne verdeckte Gebühren.</p>
                      </div>
                    </div>
                  </div>

                  {/* Position-0 Featured Snippet Definition Box */}
                  <div className="mt-8 text-left bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-5 rounded-r-xl bg-white shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-900">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>Definition & Rechtsgrundlage (Position-0)</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                      Der <strong className="text-slate-950 font-bold">Führerschein-Pflichtumtausch</strong> in Deutschland regelt den stufenweisen Umtausch aller vor dem 19. Januar 2013 ausgestellten Dokumente in den fälschungssicheren EU-Kartenführerschein gemäß <strong className="text-slate-950 font-bold">Anlage 8e zu § 24a Abs. 2 FeV</strong>. Die gesetzlichen Fristen sind nach Geburtsjahr (Papier bis 1998) bzw. Ausstellungsjahr (Scheckkarten 1999–2013) gestaffelt. Die Fahrerlaubnis selbst bleibt uneingeschränkt gültig; nur das Trägerdokument ist auf 15 Jahre befristet.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
              {/* 1. FristenRechner Component */}
              <FristenRechner />

              {/* Embed Code Widget Box for Webmasters */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
                      <Code2 className="w-3.5 h-3.5" />
                      Kostenloses Widget für Webmaster & Redaktionen
                    </div>
                    <h3 className="text-xl font-black text-white">Führerschein-Fristenrechner auf Ihrer Website einbinden</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Integrieren Sie unseren interaktiven Rechner per responsivem iFrame – ideal für Fahrschulen, Kfz-Portale und Fachblogs.
                    </p>
                  </div>
                  <button
                    onClick={copyEmbedCode}
                    className="self-start md:self-center px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer shrink-0"
                  >
                    {copiedEmbed ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmbed ? 'Code kopiert!' : 'Embed-Code kopieren'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800/80">
                  <code>{`<iframe src="https://fuehrerscheintausch.de/rechner-embed" width="100%" height="680" style="border:none; border-radius:12px;" title="Führerschein Fristenrechner"></iframe>\n<p style="font-size:12px; color:#64748b; text-align:center;">Bereitgestellt von <a href="https://fuehrerscheintausch.de" target="_blank" rel="noopener">fuehrerscheintausch.de</a></p>`}</code>
                </div>
              </div>

              {/* 2. Schritte Guide */}
              <SchritteGuide />

              {/* 3. FristenTabelle Matrix */}
              <FristenTabelle />

              {/* 4. Checkliste Component */}
              <Checkliste />

              {/* 5. KostenRechner Component */}
              <KostenRechner />

              {/* 6. FAQ Section */}
              <FaqSection />

              {/* E-E-A-T Editorial Trust Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-lg shrink-0">
                    §
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Fachredaktion fuehrerscheintausch.de</h4>
                    <p className="text-xs text-slate-500">Rechtsstand: September 2026 • Prüfstand: Anlage 8e zu § 24a Abs. 2 Fahrerlaubnis-Verordnung (FeV)</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div>
                    <strong className="block text-slate-900 mb-1">Offizielle Gesetzestexte</strong>
                    <p>Abgleich mit den Veröffentlichungen des Bundesgesetzblatts (BGBl.) und des Bundesministeriums für Digitales und Verkehr (BMDV).</p>
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Transparenz & Neutralität</strong>
                    <p>Unabhängiges Fachportal ohne Behördenauftrag. Keine Erhebung gebührenpflichtiger Vermittlungsentgelte.</p>
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Besitzstandswahrung</strong>
                    <p>Alle erworbenen Fahrerlaubnisklassen bleiben gemäß EG-Richtlinie 2006/126/EG im bisherigen Umfang erhalten.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ScrollToTop />
      <StickyMobileBar />
      <Footer navigate={navigate} />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};
