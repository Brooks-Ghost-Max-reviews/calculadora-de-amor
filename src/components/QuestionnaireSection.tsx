import React, { useState } from 'react';
import { 
  Users, User, ChevronRight, ChevronLeft, Check, Sparkles, AlertCircle, RotateCcw, 
  HelpCircle, MessageSquare, ShieldCheck, HeartHandshake, Compass, Scale, Feather, BookmarkCheck 
} from 'lucide-react';
import { QuestionnaireAnswers, QuestionnaireResult } from '../types';
import { ANSWER_OPTIONS, QUESTIONNAIRE_CATEGORIES } from '../utils/questionnaireData';
import { calculateQuestionnaireResults } from '../utils/scoring';
import { saveToHistory } from '../utils/storage';

interface QuestionnaireSectionProps {
  initialName1?: string;
  initialName2?: string;
  onFinish: (result: QuestionnaireResult) => void;
  onCancel: () => void;
}

export const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({
  initialName1 = '',
  initialName2 = '',
  onFinish,
  onCancel,
}) => {
  const [mode, setMode] = useState<'individual' | 'pareja'>('individual');
  const [person1Name, setPerson1Name] = useState(initialName1 || 'Persona 1');
  const [person2Name, setPerson2Name] = useState(initialName2 || 'Persona 2');
  
  // En modo pareja: fase 'person1', luego pantalla 'transition', luego fase 'person2'
  const [activePartnerStep, setActivePartnerStep] = useState<'p1' | 'transition' | 'p2'>('p1');
  
  // Respuestas almacenadas
  const [person1Answers, setPerson1Answers] = useState<QuestionnaireAnswers>({});
  const [person2Answers, setPerson2Answers] = useState<QuestionnaireAnswers>({});
  
  // Categoría activa (0 a 7)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const currentCategory = QUESTIONNAIRE_CATEGORIES[currentCategoryIndex];
  const activeAnswers = activePartnerStep === 'p2' ? person2Answers : person1Answers;
  const currentPersonName = activePartnerStep === 'p2' ? person2Name : person1Name;

  // Iconos para cada categoría
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-rose-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-amber-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-purple-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'Feather': return <Feather className="w-5 h-5 text-cyan-600" />;
      case 'BookmarkCheck': return <BookmarkCheck className="w-5 h-5 text-indigo-600" />;
      default: return <Sparkles className="w-5 h-5 text-rose-600" />;
    }
  };

  const handleSelectAnswer = (questionId: string, value: any) => {
    if (activePartnerStep === 'p2') {
      setPerson2Answers(prev => ({ ...prev, [questionId]: value }));
    } else {
      setPerson1Answers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  // Calcular porcentaje completado de la persona activa
  const totalQuestions = QUESTIONNAIRE_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);
  const currentAnsweredCount = Object.keys(activeAnswers).length;
  const progressPercent = Math.round((currentAnsweredCount / totalQuestions) * 100);

  // Navegación entre categorías
  const handleNextCategory = () => {
    if (currentCategoryIndex < QUESTIONNAIRE_CATEGORIES.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else {
      // Ha llegado al final de las 8 categorías
      if (mode === 'pareja' && activePartnerStep === 'p1') {
        setActivePartnerStep('transition');
      } else {
        finalizeEvaluation();
      }
    }
  };

  const handlePrevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => prev - 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleStartPartner2 = () => {
    setCurrentCategoryIndex(0);
    setActivePartnerStep('p2');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const finalizeEvaluation = () => {
    const finalResult = calculateQuestionnaireResults(
      person1Name,
      person1Answers,
      mode,
      mode === 'pareja' ? person2Name : undefined,
      mode === 'pareja' ? person2Answers : undefined
    );

    // Guardar en historial local si está habilitado
    saveToHistory({
      id: finalResult.id,
      type: 'questionnaire',
      timestamp: finalResult.timestamp,
      dateFormatted: finalResult.dateFormatted,
      title: mode === 'pareja' ? `${finalResult.person1Name} & ${finalResult.person2Name}` : `Evaluación de ${finalResult.person1Name}`,
      subtitle: `Evaluación de pareja: ${finalResult.globalScore}%`,
      score: finalResult.globalScore,
      data: finalResult,
    });

    onFinish(finalResult);
  };

  // Pantalla intermedia de transición en modo pareja
  if (activePartnerStep === 'transition') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
            Paso 1 completado
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            ¡Primera parte completada por {person1Name}!
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mx-auto">
            Para garantizar la sinceridad de la evaluación comparativa, ahora es el turno de <strong>{person2Name}</strong> de responder al cuestionario con total privacidad e independencia.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 max-w-md mx-auto text-left space-y-1.5">
          <div className="font-semibold text-stone-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Privacidad entre respuestas:
          </div>
          <p>
            Ninguna respuesta individual de {person1Name} será mostrada durante el turno de {person2Name}. Al finalizar, podréis ver juntos las coincidencias y áreas para dialogar constructivamente.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleStartPartner2}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors cursor-pointer"
          >
            Comenzar respuestas de {person2Name} →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Selector de modo y nombres */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
              Evaluación reflexiva de 8 dimensiones
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              Cuestionario de Compatibilidad de Pareja
            </h1>
          </div>

          {/* Selector de modo individual / pareja */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setMode('individual');
                setActivePartnerStep('p1');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                mode === 'individual'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individual</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('pareja')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                mode === 'pareja'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>En pareja</span>
            </button>
          </div>
        </div>

        {/* Nombres de los participantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {mode === 'pareja' ? 'Nombre de la primera persona' : 'Tu nombre'}
            </label>
            <input
              type="text"
              value={person1Name}
              onChange={(e) => setPerson1Name(e.target.value)}
              placeholder="Ej. Sofía"
              maxLength={40}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          {mode === 'pareja' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nombre de la segunda persona
              </label>
              <input
                type="text"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                placeholder="Ej. Lucas"
                maxLength={40}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>
          )}
        </div>

        {/* Indicador de turno en modo pareja */}
        {mode === 'pareja' && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
            <span className="font-semibold">
              Turno actual respondiendo: <span className="underline">{currentPersonName}</span>
            </span>
            <span className="text-rose-700">
              {activePartnerStep === 'p1' ? 'Paso 1 de 2' : 'Paso 2 de 2'}
            </span>
          </div>
        )}
      </section>

      {/* Pestañas de categorías / Progreso */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="space-y-3">
          {/* Barra de progreso */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium">
              Categoría {currentCategoryIndex + 1} de {QUESTIONNAIRE_CATEGORIES.length}: <strong className="text-stone-900">{currentCategory.title}</strong>
            </span>
            <span>
              {currentAnsweredCount} de {totalQuestions} respondidas ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-rose-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Chips horizontales de categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {QUESTIONNAIRE_CATEGORIES.map((cat, idx) => {
              const isCurrent = idx === currentCategoryIndex;
              const answeredInCat = cat.questions.filter(q => typeof activeAnswers[q.id] === 'number').length;
              const isAllAnswered = answeredInCat === cat.questions.length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategoryIndex(idx)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-stone-900 text-white font-semibold'
                      : isAllAnswered
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                  }`}
                >
                  <span>{cat.title}</span>
                  {isAllAnswered && <Check className="w-3 h-3 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Encabezado de la categoría actual */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white border border-stone-200 shadow-xs shrink-0">
            {getCategoryIcon(currentCategory.iconName)}
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900">
              {currentCategory.title}
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              {currentCategory.description}
            </p>
          </div>
        </div>

        {/* Lista de preguntas de la categoría */}
        <div className="space-y-6">
          {currentCategory.questions.map((question, qIndex) => {
            const selectedVal = activeAnswers[question.id];

            return (
              <div
                key={question.id}
                className="p-5 rounded-xl border border-stone-200/90 hover:border-stone-300 transition-colors space-y-3 bg-white"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-rose-600">
                      Pregunta {qIndex + 1}
                    </span>
                    {typeof selectedVal === 'number' && (
                      <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                        Respondida
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 mt-1">
                    {question.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    {question.subtitle}
                  </p>
                </div>

                {/* Opciones de respuesta */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
                  {ANSWER_OPTIONS.map((opt) => {
                    const isSelected = selectedVal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectAnswer(question.id, opt.value)}
                        className={`p-2.5 rounded-xl text-center text-xs transition-all flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          isSelected
                            ? 'bg-rose-600 text-white font-semibold shadow-xs ring-2 ring-rose-600 ring-offset-1'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        <span className="font-medium">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Barra de navegación inferior */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevCategory}
            disabled={currentCategoryIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Categoría anterior</span>
          </button>

          <div className="flex items-center gap-2">
            {currentCategoryIndex === QUESTIONNAIRE_CATEGORIES.length - 1 ? (
              <button
                type="button"
                onClick={handleNextCategory}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                {mode === 'pareja' && activePartnerStep === 'p1' ? (
                  <>
                    <span>Pasar al turno de {person2Name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Finalizar y generar informe</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextCategory}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Siguiente categoría</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Regla transparente para preguntas sin responder */}
      <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200/80 text-xs text-stone-600 space-y-1">
        <div className="font-semibold text-stone-800 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
          <span>Regla de puntuación transparente para preguntas sin responder:</span>
        </div>
        <p>
          Las preguntas marcadas como <em>"Prefiero no responder"</em> o dejadas en blanco no se penalizan como respuestas negativas: simplemente se excluyen del denominador en la categoría correspondiente. Si se responde a menos del 75% del cuestionario, el informe indicará que los resultados son provisionales.
        </p>
      </div>
    </div>
  );
};
