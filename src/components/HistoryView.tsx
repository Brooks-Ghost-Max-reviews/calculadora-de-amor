import React, { useState, useEffect } from 'react';
import { History, Trash2, ExternalLink, ShieldCheck, AlertCircle, ToggleLeft, ToggleRight, ArrowRight } from 'lucide-react';
import { HistoryItem, NameCalculationResult, QuestionnaireResult } from '../types';
import { 
  getHistory, 
  getStoragePreferences, 
  setStoragePreferences, 
  deleteHistoryItem, 
  clearAllHistory, 
  isLocalStorageAvailable 
} from '../utils/storage';

interface HistoryViewProps {
  onOpenNameResult: (result: NameCalculationResult) => void;
  onOpenQuestionnaireResult: (result: QuestionnaireResult) => void;
  onNavigateTab: (tab: any) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onOpenNameResult,
  onOpenQuestionnaireResult,
  onNavigateTab,
}) => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [historyEnabled, setHistoryEnabled] = useState(false);
  const [storageSupported, setStorageSupported] = useState(true);

  useEffect(() => {
    const supported = isLocalStorageAvailable();
    setStorageSupported(supported);
    if (supported) {
      const prefs = getStoragePreferences();
      setHistoryEnabled(prefs.historyEnabled);
      setItems(getHistory());
    }
  }, []);

  const handleToggleHistory = () => {
    const nextState = !historyEnabled;
    setHistoryEnabled(nextState);
    setStoragePreferences({ historyEnabled: nextState });
    if (!nextState) {
      // Si el usuario desactiva, mantenemos la lista actual o la limpian si desean
    }
  };

  const handleDeleteItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setItems(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('¿Seguro que deseas eliminar todos los resultados guardados en este navegador?')) {
      clearAllHistory();
      setItems([]);
    }
  };

  const handleOpenItem = (item: HistoryItem) => {
    if (item.type === 'names') {
      onOpenNameResult(item.data as NameCalculationResult);
      onNavigateTab('calculadora');
    } else {
      onOpenQuestionnaireResult(item.data as QuestionnaireResult);
      onNavigateTab('informe');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Cabecera y control de privacidad */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>Memoria local opcional</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mt-1">
              Historial Local de Resultados
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Guarda tus cálculos de nombres y evaluaciones exclusivamente en este dispositivo para consultarlos más adelante.
            </p>
          </div>

          {/* Toggle Activar/Desactivar */}
          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 shrink-0">
            <div className="text-right">
              <span className="text-xs font-bold text-stone-800 block">
                Historial local
              </span>
              <span className="text-[11px] text-stone-500 block">
                {historyEnabled ? 'Activado' : 'Desactivado'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleHistory}
              disabled={!storageSupported}
              className="text-stone-700 hover:text-rose-600 transition-colors cursor-pointer"
              aria-label={historyEnabled ? 'Desactivar historial' : 'Activar historial'}
            >
              {historyEnabled ? (
                <ToggleRight className="w-9 h-9 text-rose-600" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-stone-400" />
              )}
            </button>
          </div>
        </div>

        {/* Garantía de privacidad */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-semibold">Garantía estricta de privacidad:</strong>
            Los resultados se almacenan únicamente en el <code>localStorage</code> de tu navegador web. Nunca se envían a servidores externos ni se comparten con terceros. Puedes borrarlos en cualquier momento.
          </div>
        </div>

        {!storageSupported && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>El almacenamiento local no está disponible en este navegador o modo de navegación privada.</span>
          </div>
        )}
      </section>

      {/* Lista de elementos guardados */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h2 className="text-base font-bold text-stone-900">
            Resultados guardados ({items.length})
          </h2>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-rose-700 hover:text-rose-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar todo el historial</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-stone-700">
              No hay resultados guardados en este momento.
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {historyEnabled
                ? 'Los cálculos que realices a partir de ahora se guardarán automáticamente aquí mientras mantengas activada esta opción.'
                : 'Para conservar tus resultados en este navegador, activa la casilla superior de Historial local.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab('calculadora')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ir a la calculadora por nombres</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 p-2 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                      {item.type === 'names' ? 'Por nombres' : 'Cuestionario'}
                    </span>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs text-stone-500">{item.dateFormatted}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-extrabold flex items-center justify-center text-sm">
                    {item.score}%
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenItem(item)}
                    className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Ver</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Eliminar este resultado"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
