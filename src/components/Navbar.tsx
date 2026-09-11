import React, { useState } from 'react';
import { Shield, Clock, FileCheck, HelpCircle, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    if (path !== currentPath) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-center items-center h-16 md:gap-8 lg:gap-12 relative">
          {/* Logo */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 font-black shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-slate-900 tracking-tight">fuehrerschein<span className="text-amber-600">tausch</span>.de</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">Gesetzlicher Pflichtumtausch</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('/', 'rechner')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4 text-amber-600" />
              Fristen-Rechner
            </button>

            <button
              onClick={() => handleNav('/', 'stufenplan')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              Stufenplan
            </button>

            <button
              onClick={() => handleNav('/', 'checkliste')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4 text-slate-500" />
              Checkliste
            </button>

            <button
              onClick={() => handleNav('/', 'faq')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              FAQ
            </button>

            <div className="h-5 w-px bg-slate-200 mx-2" />

            <button
              onClick={() => handleNav('/', 'rechner')}
              className="ml-1 px-4 py-2 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Frist jetzt prüfen
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNav('/', 'rechner')}
            className="w-full text-left px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Clock className="w-5 h-5 text-amber-600" />
            Fristen-Rechner
          </button>
          <button
            onClick={() => handleNav('/', 'stufenplan')}
            className="w-full text-left px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 text-slate-500" />
            Stufenplan
          </button>
          <button
            onClick={() => handleNav('/', 'checkliste')}
            className="w-full text-left px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <FileCheck className="w-5 h-5 text-slate-500" />
            Unterlagen-Checkliste
          </button>
          <button
            onClick={() => handleNav('/', 'faq')}
            className="w-full text-left px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-slate-500" />
            Häufige Fragen (FAQ)
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('/', 'rechner')}
              className="w-full py-3 text-center text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm"
            >
              Frist jetzt prüfen
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
