import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database, Trash2, ArrowRight } from 'lucide-react';
import { clearAllHistory } from '../utils/storage';
import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';

export const PrivacyView: React.FC = () => {
  const handleClear = () => {
    if (window.confirm('¿Deseas borrar de forma irreversible todos los datos locales almacenados en este navegador?')) {
      clearAllHistory();
      alert('Se han eliminado todos los datos locales correctamente.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Cabecera */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacidad por diseño</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Política de Privacidad y Tratamiento de Datos
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          En la Calculadora de Amor y Compatibilidad consideramos la privacidad un derecho fundamental. Hemos diseñado toda la arquitectura para que tus reflexiones personales permanezcan exclusivamente bajo tu control.
        </p>
      </section>

      {/* Principios rectores */}
      <section className="space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 shrink-0">
            <EyeOff className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-stone-900">
              Procesamiento 100% en el cliente
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Tanto el algoritmo de nombres como la puntuación del cuestionario se ejecutan íntegramente mediante JavaScript en tu navegador. Ningún nombre, respuesta o resultado se envía a servidores de análisis o bases de datos externas.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-stone-900">
              Sin registro obligatorio ni correos electrónicos
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No exigimos crear una cuenta, iniciar sesión ni facilitar un correo electrónico para calcular la compatibilidad o descargar los informes en PDF. El acceso a la herramienta es libre y sin barreras.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-stone-900">
              Almacenamiento local opcional (localStorage)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              El historial de resultados permanece desactivado de forma predeterminada. Si decides activarlo, los datos se guardarán exclusivamente en el almacenamiento local de tu navegador. Puedes desactivarlo o vaciarlo en cualquier momento.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar inmediatamente todos los datos locales</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recurso externo UnderstandShe */}
      <section className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">¿Deseas más información sobre relaciones conscientes?</h3>
          <p className="text-xs text-stone-300">Visita UnderstandShe.com para descubrir más guías y análisis.</p>
        </div>
        <a
          href={PDF_CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <span>{PDF_CTA_TEXT}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
};
