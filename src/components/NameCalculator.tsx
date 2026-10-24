import React, { useState } from 'react';
import { Heart, Sparkles, Download, RotateCcw, ArrowRight, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { NameCalculationResult } from '../types';
import { calculateNameCompatibility } from '../utils/nameAlgorithm';
import { generateNamePdf } from '../utils/pdfGenerator';
import { saveToHistory } from '../utils/storage';

interface NameCalculatorProps {
  onStartQuestionnaire: (name1?: string, name2?: string) => void;
  onNavigateTab: (tab: any) => void;
  onSaveResult?: (result: NameCalculationResult) => void;
}

export const NameCalculator: React.FC<NameCalculatorProps> = ({
  onStartQuestionnaire,
  onNavigateTab,
  onSaveResult,
}) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [result, setResult] = useState<NameCalculationResult | null>(null);
  const [hasSavedHistory, setHasSavedHistory] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean1 = name1.trim();
    const clean2 = name2.trim();

    if (!clean1 && !clean2) {
      setErrorMessage('Por favor, introduce los dos nombres para calcular la afinidad.');
      return;
    }
    if (!clean1) {
      setErrorMessage('Falta el nombre de la primera persona.');
      return;
    }
    if (!clean2) {
      setErrorMessage('Falta el nombre de la segunda persona.');
      return;
    }

    setErrorMessage(null);
    setIsCalculating(true);

    // Pequeño retardo deliberado para que la animación se perciba natural y profesional
    setTimeout(() => {
      const calcResult = calculateNameCompatibility(clean1, clean2);
      setResult(calcResult);
      setIsCalculating(false);

      // Guardar en historial local si el usuario lo tiene activo
      const saved = saveToHistory({
        id: calcResult.id,
        type: 'names',
        timestamp: calcResult.timestamp,
        dateFormatted: calcResult.dateFormatted,
        title: `${calcResult.name1} & ${calcResult.name2}`,
        subtitle: `Compatibilidad por nombres: ${calcResult.percentage}%`,
        score: calcResult.percentage,
        data: calcResult,
      });
      setHasSavedHistory(saved);
      if (onSaveResult) onSaveResult(calcResult);
    }, 400);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setErrorMessage(null);
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    try {
      setIsGeneratingPdf(true);
      await generateNamePdf(result);
    } catch (err) {
      console.error('Error al generar PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero & Formulario principal */}
      <section className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 sm:p-10 transition-all">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Herramienta reflexiva y recreativa</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Calculadora de Amor: <br className="hidden sm:inline" />
            <span className="text-rose-600 font-serif-accent font-normal italic">
              Compatibilidad por Nombres
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Descubre la afinidad fonética y estructural entre dos nombres mediante nuestro algoritmo determinista. Explora la resonancia de vuestros nombres y reflexiona con serenidad sobre las áreas esenciales de vuestra relación.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs text-stone-500 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% privado en tu navegador
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Algoritmo determinista reproducible</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Informe PDF descargable</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="max-w-xl mx-auto mt-8">
          <form onSubmit={handleCalculate} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name1-input" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Nombre de la primera persona <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name1-input"
                    type="text"
                    value={name1}
                    onChange={(e) => {
                      setName1(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Ej. Carmen"
                    autoComplete="off"
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name2-input" className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Nombre de la segunda persona <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name2-input"
                    type="text"
                    value={name2}
                    onChange={(e) => {
                      setName2(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Ej. Alejandro"
                    autoComplete="off"
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all text-base"
                    required
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div 
                role="alert" 
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in"
              >
                <Info className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.99] shadow-md shadow-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analizando compatibilidad nominal...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-white/20" />
                    <span>Calcular compatibilidad de amor</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Acceso a evaluación por preguntas */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>¿Buscas una evaluación más completa y profunda?</span>
            </div>
            <button
              onClick={() => onStartQuestionnaire(name1, name2)}
              className="text-rose-700 font-semibold hover:text-rose-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Realizar cuestionario de 8 áreas
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tarjeta de Resultados */}
      {result && (
        <section 
          id="resultado-nombres" 
          className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300"
          aria-live="polite"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Cabecera del resultado */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-100">
              <div className="text-center md:text-left space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-700">
                  Resultado de afinidad nominal
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  {result.name1} <span className="text-rose-500 font-serif-accent font-normal">&</span> {result.name2}
                </h2>
                <p className="text-sm text-stone-600 font-medium">
                  {result.summary}
                </p>
              </div>

              {/* Medidor circular / Indicador de porcentaje */}
              <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-tr from-rose-50 to-pink-50 border-4 border-rose-200/80 shadow-inner shrink-0">
                <span className="text-4xl font-extrabold text-rose-700 tracking-tight">
                  {result.percentage}%
                </span>
                <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider mt-0.5">
                  Afinidad
                </span>
              </div>
            </div>

            {/* Desglose de componentes */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Desglose de métricas fonéticas y estructurales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                    <span>Resonancia de vocales</span>
                    <span className="text-rose-700 font-bold">{result.breakdown.vowelResonance}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.breakdown.vowelResonance}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Simetría en los sonidos de vocales compartidas entre ambos nombres.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                    <span>Armonía de caracteres</span>
                    <span className="text-rose-700 font-bold">{result.breakdown.characterHarmony}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.breakdown.characterHarmony}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Frecuencia de consonantes y letras compartidas en el abecedario.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                    <span>Equilibrio métrico</span>
                    <span className="text-rose-700 font-bold">{result.breakdown.rhythmBalance}%</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${result.breakdown.rhythmBalance}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Equilibrio de longitud silábica y cadencia rítmica al pronunciarse.
                  </p>
                </div>
              </div>
            </div>

            {/* Interpretación constructiva */}
            <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-100 space-y-3">
              <h3 className="text-sm font-bold text-stone-900">
                Interpretación de la compatibilidad nominal
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {result.interpretation}
              </p>
            </div>

            {/* Pautas para dialogar */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900">
                Pautas recomendadas para cultivar vuestra conexión:
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nota de límites */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-700 block mb-0.5">Nota metodológica y límites del cálculo:</strong>
                Este resultado es una estimación recreativa obtenida mediante un algoritmo determinista sobre los nombres de {result.name1} y {result.name2}. No pretende medir sentimientos reales, predecir el futuro sentimental ni sustituir una reflexión consciente sobre los valores, la confianza y la comunicación en la pareja.
              </div>
            </div>

            {/* Acciones principales */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                      <span>Generando PDF A4...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Descargar informe en PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Otro cálculo</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onStartQuestionnaire(result.name1, result.name2)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Evaluar mediante cuestionario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Sección informativa de contenido SEO natural y pedagógico */}
      <section className="border-t border-stone-200 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-600 text-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">
            ¿Cómo funciona la calculadora de amor por nombres?
          </h2>
          <p className="leading-relaxed">
            Nuestra calculadora de amor analiza la estructura de los nombres introducidos de forma determinista y reproducible: calcula la armonía de vocales compartidas, la frecuencia de consonantes y el equilibrio métrico silábico. Siempre que introduzcas el mismo par de nombres, obtendrás exactamente el mismo porcentaje.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">
            ¿Qué significa el porcentaje de amor obtenido?
          </h2>
          <p className="leading-relaxed">
            El porcentaje refleja una afinidad nominal matemática orientada al entretenimiento y a suscitar conversaciones sanas. No representa una predicción psicológica de éxito ni mide sentimientos reales, ya que el amor verdadero se construye mediante el respeto, el apoyo mutuo y la escucha.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">
            Diferencia con el cuestionario de compatibilidad
          </h2>
          <p className="leading-relaxed">
            Mientras que el cálculo por nombres es una dinámica recreativa y lúdica, la evaluación mediante preguntas analiza 8 pilares clave de la vida en pareja: comunicación, confianza, respeto, gestión de conflictos, afecto, valores y autonomía personal.
          </p>
          <button
            onClick={() => onNavigateTab('metodologia')}
            className="text-xs font-semibold text-rose-700 hover:underline inline-block pt-1 cursor-pointer"
          >
            Conocer la metodología completa →
          </button>
        </div>
      </section>
    </div>
  );
};
