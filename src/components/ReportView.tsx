import React, { useState } from 'react';
import { 
  Download, RotateCcw, Heart, CheckCircle2, AlertCircle, MessageCircle, 
  HelpCircle, Sparkles, ArrowRight, ShieldCheck, FileText, Check, Users 
} from 'lucide-react';
import { QuestionnaireResult } from '../types';
import { generateQuestionnairePdf } from '../utils/pdfGenerator';
import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';

interface ReportViewProps {
  result: QuestionnaireResult;
  onNewEvaluation: () => void;
  onGoToNames: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  result,
  onNewEvaluation,
  onGoToNames,
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generateQuestionnairePdf(result);
    } catch (err) {
      console.error('Error al generar PDF del informe:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const isCouple = result.mode === 'pareja' && !!result.person2Name;

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Encabezado del informe */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Informe de Evaluación de Pareja</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500 font-normal">{result.dateFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {isCouple ? `${result.person1Name} & ${result.person2Name}` : `Evaluación de ${result.person1Name}`}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Modalidad: {isCouple ? 'Evaluación comparativa conjunta' : 'Evaluación reflexiva individual'}
            </p>
          </div>

          {/* Cuadro de índice global */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 shrink-0 self-start md:self-auto">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex flex-col items-center justify-center shadow-xs">
              <span className="text-2xl font-black">{result.globalScore}%</span>
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                Índice Global de Armonía
              </span>
              <span className="text-[11px] text-stone-500 block">
                {result.isProvisional ? 'Resultado provisional (faltan respuestas)' : 'Promedio balanceado de 8 dimensiones'}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de acciones rápidas */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            {isGeneratingPdf ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando PDF A4...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar informe completo en PDF</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNewEvaluation}
              className="px-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nueva evaluación</span>
            </button>
            <button
              type="button"
              onClick={onGoToNames}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
            >
              Calculadora por nombres
            </button>
          </div>
        </div>
      </section>

      {/* Fortalezas y Áreas de conversación en paralelo */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2>Fortalezas y puntos de coincidencia</h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {result.harmonyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <MessageCircle className="w-5 h-5 text-amber-600" />
            <h2>Áreas para conversar con serenidad</h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {result.talkingPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <span className="text-amber-700 font-bold">ℹ</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Resultados detallados por las 8 categorías */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="text-lg font-bold text-stone-900">
            Desglose de resultados por las 8 dimensiones evaluadas
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Cada área analiza aspectos prácticos y cotidianos de la relación con una escala homogénea.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.categories.map((cat) => {
            const badgeBg = cat.level === 'alta' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : cat.level === 'moderada' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200';
            const levelLabel = cat.level === 'alta' ? 'Base sólida' : cat.level === 'moderada' ? 'Equilibrio constructivo' : 'Área por cultivar';

            return (
              <div 
                key={cat.categoryId}
                className="p-5 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors space-y-3 bg-stone-50/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      {cat.categoryTitle}
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      {cat.answeredCount} de {cat.totalQuestions} respondidas
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-stone-900">{cat.score}%</span>
                    <span className={`block text-[10px] font-semibold px-2 py-0.5 rounded-md border mt-0.5 ${badgeBg}`}>
                      {levelLabel}
                    </span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.score >= 75 ? 'bg-emerald-500' : cat.score >= 55 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {cat.interpretation}
                </p>

                <div className="pt-2 border-t border-stone-200/60 text-[11px] text-stone-500 italic">
                  <strong>Pregunta facilitadora:</strong> "{cat.dialoguePrompt}"
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sección comparativa si es modo pareja */}
      {isCouple && result.comparison && (
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700">
              <Users className="w-4 h-4" />
              <span>Comparativa entre {result.person1Name} y {result.person2Name}</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1">
              Coincidencias y perspectivas diferenciadas
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Las diferencias no son signos de incompatibilidad: representan estilos y sensibilidades individuales que merecen ser escuchadas con empatía.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-2xl font-black text-emerald-800 block">
                {result.comparison.coincidencesCount}
              </span>
              <span className="text-xs text-emerald-900 font-medium">
                Preguntas con respuesta idéntica o muy cercana
              </span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 text-center">
              <span className="text-2xl font-black text-amber-800 block">
                {result.comparison.divergencesCount}
              </span>
              <span className="text-xs text-amber-900 font-medium">
                Puntos con percepciones diferentes para conversar
              </span>
            </div>
          </div>

          {result.comparison.detailedDifferences.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Detalle de los temas con mayor contraste de respuestas:
              </h3>
              <div className="space-y-3">
                {result.comparison.detailedDifferences.map((diff, i) => (
                  <div key={i} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">{diff.questionTitle}</span>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider">{diff.categoryTitle}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                      <div className="p-2 bg-white rounded-lg border border-stone-200">
                        <span className="font-semibold text-stone-900">{result.person1Name}: </span>
                        <span>{diff.person1Label}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-stone-200">
                        <span className="font-semibold text-stone-900">{result.person2Name}: </span>
                        <span>{diff.person2Label}</span>
                      </div>
                    </div>

                    <p className="text-stone-500 text-[11px] italic pt-1">
                      💡 <strong>Sugerencia de diálogo:</strong> {diff.dialogueIdea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Recomendaciones personalizadas y aplicables */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-stone-900">
          Recomendaciones prácticas adaptadas a vuestras respuestas
        </h2>
        <ul className="space-y-3">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3 text-xs sm:text-sm text-stone-700">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Preguntas para una conversación de pareja */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-stone-900">
          Preguntas para iniciar un diálogo constructivo y enriquecedor
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {result.discussionQuestions.map((q, i) => (
            <div key={i} className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 text-xs sm:text-sm text-stone-800 flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Banner de llamada a la acción hacia UnderstandShe.com */}
      <section className="bg-gradient-to-tr from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
            Recursos adicionales para la relación
          </span>
          <h2 className="text-xl font-bold">
            Explora más herramientas de amor y tiempo en UnderstandShe
          </h2>
          <p className="text-xs text-stone-300 max-w-lg">
            Visita nuestra guía completa para parejas con análisis de tiempo juntos, edad y compatibilidad emocional.
          </p>
        </div>

        <a
          href={PDF_CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold whitespace-nowrap shadow-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{PDF_CTA_TEXT}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
};
