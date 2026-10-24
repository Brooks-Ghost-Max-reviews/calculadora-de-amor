import React from 'react';
import { Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../types';
import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna de Marca */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white/20" />
              </div>
              <span className="font-bold text-stone-900 text-base">
                Calculadora de Amor y Compatibilidad
              </span>
            </div>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              Herramienta reflexiva para explorar la afinidad nominal y evaluar las 8 dimensiones clave de una relación de pareja de forma constructiva, privada y honesta.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ejecución 100% en el navegador · Sin almacenamiento oculto</span>
            </div>
          </div>

          {/* Navegación de la herramienta */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('calculadora')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Compatibilidad por Nombres
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('cuestionario')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Cuestionario de 8 Áreas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('historial')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Historial Local
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('metodologia')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Metodología de Cálculo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('preguntas-frecuentes')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Enlaces de interés / UnderstandShe */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Recursos de Pareja
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <a
                  href={PDF_CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-700 hover:text-rose-800 font-semibold flex items-center gap-1.5"
                >
                  <span>{PDF_CTA_TEXT}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('privacidad')}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Nota legal y copyright */}
        <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Calculadora de Amor y Compatibilidad de Pareja. Creado con rigor y respeto.
          </p>
          <p className="max-w-md text-[11px] text-stone-400">
            Aviso: Los resultados son de carácter lúdico y orientativo; no constituyen un diagnóstico psicológico profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};
