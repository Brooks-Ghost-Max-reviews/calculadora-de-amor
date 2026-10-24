import React, { useState } from 'react';
import { Heart, Menu, X, Shield, BookOpen, HelpCircle, History, Sparkles, FileText } from 'lucide-react';
import { NavigationTab } from '../types';
import { PDF_CTA_URL } from '../constants/config';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  hasActiveReport: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, hasActiveReport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; showBadge?: boolean }[] = [
    { id: 'calculadora', label: 'Por Nombres', icon: <Heart className="w-4 h-4" /> },
    { id: 'cuestionario', label: 'Cuestionario de Pareja', icon: <Sparkles className="w-4 h-4" /> },
    ...(hasActiveReport ? [{ id: 'informe' as NavigationTab, label: 'Informe Actual', icon: <FileText className="w-4 h-4" /> }] : []),
    { id: 'historial', label: 'Historial', icon: <History className="w-4 h-4" /> },
    { id: 'metodologia', label: 'Metodología', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'preguntas-frecuentes', label: 'Preguntas Frecuentes', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'privacidad', label: 'Privacidad', icon: <Shield className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título de marca */}
          <div 
            onClick={() => handleTabClick('calculadora')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
            title="Ir al inicio de la Calculadora de Amor"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight block leading-tight">
                Calculadora de Amor
              </span>
              <span className="text-xs text-stone-500 font-medium hidden sm:block">
                Compatibilidad por Nombres y Evaluación de Pareja
              </span>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span className={isActive ? 'text-rose-600' : 'text-stone-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}

            <div className="h-5 w-[1px] bg-stone-200 mx-2" aria-hidden="true" />

            <a
              href={PDF_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-stone-500 hover:text-rose-600 hover:underline px-2 py-1 transition-colors"
              title="Visitar UnderstandShe.com"
            >
              UnderstandShe.com
            </a>
          </nav>

          {/* Botón menú móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in duration-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <span className={isActive ? 'text-rose-600' : 'text-stone-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-100">
            <a
              href={PDF_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-xs text-stone-500 hover:text-rose-700 font-medium"
            >
              Acceder a UnderstandShe.com ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
