import React from 'react';
import { BookOpen, CheckCircle, ShieldAlert, Cpu, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';

export const MethodologyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Portada */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Transparencia y rigor</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Metodología y Fundamentos del Cálculo
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
          Nuestra herramienta busca ofrecer una experiencia honesta, clara y responsable. Distinguimos de manera nítida entre un cálculo recreativo basado en nombres y una evaluación estructurada basada en preguntas de autoconocimiento.
        </p>
      </section>

      {/* Modalidad 1: Nombres */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Modalidad A</span>
            <h2 className="text-xl font-bold text-stone-900">
              Algoritmo Determinista de Compatibilidad por Nombres
            </h2>
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          El cálculo por nombres opera mediante un método matemático propio, reproducible y de código abierto en el cliente. No recurre a números aleatorios (<code>Math.random</code>) ni a servidores remotos:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 font-bold block text-sm">1. Resonancia de Vocales</strong>
            <p className="text-stone-600 leading-relaxed">
              Analiza la distribución y similitud de vocales compartidas entre ambos nombres como metáfora de fluidez fonética.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 font-bold block text-sm">2. Armonía Alfabética</strong>
            <p className="text-stone-600 leading-relaxed">
              Compara la intersección de caracteres y consonantes según el coeficiente de Jaccard sobre el alfabeto español.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 font-bold block text-sm">3. Conmutatividad Estricta</strong>
            <p className="text-stone-600 leading-relaxed">
              Los nombres se ordenan alfabéticamente antes del cómputo para garantizar que <em>A + B</em> genere exactamente el mismo resultado que <em>B + A</em>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Límite ético esencial:</strong> Este cálculo es una propuesta lúdica y recreativa. Ningún algoritmo informático puede medir los sentimientos, la lealtad o la afinidad humana real a partir de las letras de un nombre de pila.
          </p>
        </div>
      </section>

      {/* Modalidad 2: Cuestionario */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Modalidad B</span>
            <h2 className="text-xl font-bold text-stone-900">
              Evaluación Estructurada de Compatibilidad por Respuestas
            </h2>
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          Esta modalidad permite evaluar la relación a través de 24 preguntas organizadas en 8 dimensiones universales identificadas en la literatura sobre relaciones interpersonales saludables:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Comunicación</strong>
            <span className="text-stone-500">Expresión emocional y escucha activa</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Confianza</strong>
            <span className="text-stone-500">Seguridad mutua y coherencia</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Respeto</strong>
            <span className="text-stone-500">Límites y aceptación de diferencias</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Valores</strong>
            <span className="text-stone-500">Planes futuros y prioridades éticas</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Conflictos</strong>
            <span className="text-stone-500">Reparación y búsqueda de soluciones</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Afecto</strong>
            <span className="text-stone-500">Ternura, calidez y tiempo compartido</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Independencia</strong>
            <span className="text-stone-500">Autonomía y amistades propias</span>
          </div>
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50">
            <strong className="text-stone-900 block font-semibold">Expectativas</strong>
            <span className="text-stone-500">Nivel de compromiso y acuerdos</span>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
          <h3 className="font-bold text-stone-900 text-sm">Reglas del sistema de puntuación:</h3>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Cada opción puntúa en una escala de 0 a 4 puntos (Nunca: 0, Rara vez: 1, A veces: 2, A menudo: 3, Casi siempre: 4).</li>
            <li>Las preguntas con <em>"Prefiero no responder"</em> no se convierten en ceros: se descuentan de la base para no penalizar artificialmente el resultado.</li>
            <li>En la modalidad de pareja, las diferencias de respuestas no se catalogan como fallos, sino como matices para abrir una conversación constructiva.</li>
          </ul>
        </div>
      </section>

      {/* Enlace y CTA */}
      <section className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">¿Deseas profundizar en las dinámicas de pareja?</h3>
          <p className="text-xs text-stone-300">Explora artículos y calculadoras complementarias en UnderstandShe.</p>
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
