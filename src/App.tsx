import React, { useState } from 'react';
import { Header } from './components/Header';
import { NameCalculator } from './components/NameCalculator';
import { QuestionnaireSection } from './components/QuestionnaireSection';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { MethodologyView } from './components/MethodologyView';
import { FaqView } from './components/FaqView';
import { PrivacyView } from './components/PrivacyView';
import { Footer } from './components/Footer';
import { NavigationTab, NameCalculationResult, QuestionnaireResult } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('calculadora');
  const [activeReport, setActiveReport] = useState<QuestionnaireResult | null>(null);
  const [initialNames, setInitialNames] = useState<{ name1: string; name2: string }>({ name1: '', name2: '' });

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuestionnaire = (name1?: string, name2?: string) => {
    setInitialNames({
      name1: name1 || '',
      name2: name2 || '',
    });
    setCurrentTab('cuestionario');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuestionnaire = (result: QuestionnaireResult) => {
    setActiveReport(result);
    setCurrentTab('informe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNameResultFromHistory = (result: NameCalculationResult) => {
    setCurrentTab('calculadora');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuestionnaireResultFromHistory = (result: QuestionnaireResult) => {
    setActiveReport(result);
    setCurrentTab('informe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/70 text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Barra superior de navegación */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        hasActiveReport={!!activeReport}
      />

      {/* Contenido principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentTab === 'calculadora' && (
          <NameCalculator
            onStartQuestionnaire={handleStartQuestionnaire}
            onNavigateTab={handleSelectTab}
          />
        )}

        {currentTab === 'cuestionario' && (
          <QuestionnaireSection
            initialName1={initialNames.name1}
            initialName2={initialNames.name2}
            onFinish={handleFinishQuestionnaire}
            onCancel={() => handleSelectTab('calculadora')}
          />
        )}

        {currentTab === 'informe' && activeReport && (
          <ReportView
            result={activeReport}
            onNewEvaluation={() => {
              setInitialNames({ name1: '', name2: '' });
              handleSelectTab('cuestionario');
            }}
            onGoToNames={() => handleSelectTab('calculadora')}
          />
        )}

        {currentTab === 'informe' && !activeReport && (
          <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900">Aún no hay ningún informe generado</h2>
            <p className="text-xs text-stone-600">
              Completa el cuestionario de pareja o realiza un cálculo por nombres para ver el informe detallado aquí.
            </p>
            <button
              onClick={() => handleSelectTab('cuestionario')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Iniciar Cuestionario
            </button>
          </div>
        )}

        {currentTab === 'historial' && (
          <HistoryView
            onOpenNameResult={handleOpenNameResultFromHistory}
            onOpenQuestionnaireResult={handleOpenQuestionnaireResultFromHistory}
            onNavigateTab={handleSelectTab}
          />
        )}

        {currentTab === 'metodologia' && <MethodologyView />}

        {currentTab === 'preguntas-frecuentes' && <FaqView />}

        {currentTab === 'privacidad' && <PrivacyView />}
      </main>

      {/* Pie de página */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
