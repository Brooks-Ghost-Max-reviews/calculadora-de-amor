import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Qué es una calculadora de amor?',
    answer: 'Una calculadora de amor es una herramienta digital diseñada para estimar de forma amena y reflexiva el grado de afinidad y sintonía entre dos personas. Nuestra aplicación combina una modalidad recreativa basada en los nombres con un cuestionario exhaustivo que evalúa 8 áreas vitales de una relación.',
  },
  {
    question: '¿Cómo funciona una calculadora de amor por nombres?',
    answer: 'Nuestra calculadora emplea un algoritmo determinista y reproducible: analiza la estructura de los nombres normalizados (eliminando tildes de forma interna), evalúa la resonancia de vocales compartidas, la armonía de letras y el balance rítmico silábico. No depende de números aleatorios ni de servidores externos, por lo que el mismo par de nombres siempre arroja el mismo porcentaje.',
  },
  {
    question: '¿Qué significa el porcentaje de compatibilidad?',
    answer: 'En la modalidad de nombres, el porcentaje es una aproximación simbólica y lúdica. En la evaluación mediante cuestionario, el porcentaje refleja el promedio balanceado de vuestras respuestas sobre aspectos reales como la comunicación, el respeto, la confianza y la gestión de desacuerdos.',
  },
  {
    question: '¿La calculadora de amor puede determinar si dos personas están destinadas a estar juntas?',
    answer: 'No. Ninguna herramienta informática ni fórmula matemática puede determinar el destino ni la viabilidad de una relación. El éxito de una pareja se construye día a día mediante el compromiso mutuo, el cariño, la madurez emocional y la voluntad de apoyarse en momentos difíciles.',
  },
  {
    question: '¿En qué se diferencia el cálculo por nombres de la evaluación mediante preguntas?',
    answer: 'El cálculo por nombres es una dinámica puramente recreativa basada en letras. En cambio, la evaluación mediante preguntas es un ejercicio reflexivo sobre 24 situaciones cotidianas de pareja que permite identificar fortalezas consolidadas y temas que convendría conversar con serenidad.',
  },
  {
    question: '¿Puedo descargar los resultados en PDF?',
    answer: 'Sí. Tanto la compatibilidad por nombres como la evaluación de cuestionario cuentan con la opción de generar y descargar al instante un informe completo en PDF tamaño A4, con diseño editorial limpio, gráficos de puntuación y recomendaciones prácticas.',
  },
  {
    question: '¿Se guardan los nombres y las respuestas?',
    answer: 'Por defecto, nada se guarda y todos los cálculos se realizan localmente en tu propio navegador. Si deseas conservar tus resultados, puedes activar voluntariamente la opción de "Historial local" en la pestaña correspondiente; los datos se almacenan exclusivamente en tu dispositivo (localStorage) y nunca viajan a servidores externos.',
  },
  {
    question: '¿Cómo puedo volver a consultar un resultado anterior?',
    answer: 'Si tienes activado el "Historial local", basta con dirigirte a la pestaña de Historial en el menú superior. Desde allí podrás consultar la fecha, el porcentaje y volver a abrir el informe detallado de cualquier evaluación guardada.',
  },
];

export const FaqView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Encabezado */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Resolución de dudas</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Preguntas Frecuentes
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
          Respuestas transparentes y directas sobre el funcionamiento de la calculadora, el tratamiento de datos y la interpretación de los informes.
        </p>
      </section>

      {/* Acordeón de preguntas */}
      <section className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  {faq.question}
                </span>
                <span className="p-1 rounded-lg bg-stone-100 text-stone-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Recurso externo UnderstandShe */}
      <section className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">¿Deseas saber más sobre la relación y el tiempo juntos?</h3>
          <p className="text-xs text-stone-300">Descubre artículos y recursos en UnderstandShe.com.</p>
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
