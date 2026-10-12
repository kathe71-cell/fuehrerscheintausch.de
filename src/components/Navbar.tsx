import React, { useState } from 'react';
import { Shield, Clock, FileCheck, HelpCircle, Menu, X, Calendar, Coins } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  const navItems = [
    { label: 'Fristen-Rechner', path: '/rechner', icon: Clock },
    { label: 'Stufenplan', path: '/stufenplan', icon: Calendar },
    { label: 'Checkliste', path: '/checkliste', icon: FileCheck },
    { label: 'Kosten', path: '/kosten', icon: Coins },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <a 
            href="/"
            onClick={(e) => handleNav('/', e)}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0 cursor-pointer"
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
          </a>

          {/* Desktop Nav with Dedicated URLs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNav(item.path, e)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-100/70 text-amber-950 font-bold border border-amber-300/60'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="h-5 w-px bg-slate-200 mx-2" />

            <a
              href="/rechner"
              onClick={(e) => handleNav('/rechner', e)}
              className="ml-1 px-4 py-2 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Frist jetzt prüfen
            </a>
          </nav>

          {/* Tablet Nav (compact) */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNav(item.path, e)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
                    isActive ? 'bg-amber-100 text-amber-950 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-700' : 'text-slate-500'}`} />
                  <span>{item.label.replace('Fristen-', '')}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown with Dedicated URLs */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNav(item.path, e)}
                className={`w-full text-left px-3 py-2.5 text-base font-semibold rounded-lg flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 text-amber-950 font-bold border border-amber-300'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-700' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="/rechner"
              onClick={(e) => handleNav('/rechner', e)}
              className="block w-full py-3 text-center text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm cursor-pointer"
            >
              Frist jetzt prüfen
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
