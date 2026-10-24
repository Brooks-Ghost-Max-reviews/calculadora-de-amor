/**
 * Definiciones de tipos para la Calculadora de Amor y Compatibilidad de Pareja
 */

export type NavigationTab = 
  | 'calculadora' 
  | 'cuestionario' 
  | 'informe' 
  | 'historial' 
  | 'metodologia' 
  | 'preguntas-frecuentes' 
  | 'privacidad';

export interface NameCalculationResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  name1: string;
  name2: string;
  percentage: number;
  breakdown: {
    vowelResonance: number;      // Resonancia vocal (0-100)
    characterHarmony: number;    // Armonía alfabética (0-100)
    rhythmBalance: number;       // Equilibrio métrico (0-100)
  };
  summary: string;
  interpretation: string;
  recommendations: string[];
}

export type AnswerOptionValue = 4 | 3 | 2 | 1 | 0 | -1;

export interface QuestionOption {
  value: AnswerOptionValue;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  questions: Question[];
}

export interface CategoryResult {
  categoryId: string;
  categoryTitle: string;
  score: number;           // 0 - 100
  answeredCount: number;
  totalQuestions: number;
  unansweredCount: number;
  level: 'alta' | 'moderada' | 'por_desarrollar';
  interpretation: string;
  dialoguePrompt: string;
}

export interface QuestionnaireAnswers {
  [questionId: string]: AnswerOptionValue;
}

export interface QuestionnaireResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  mode: 'individual' | 'pareja';
  person1Name: string;
  person2Name?: string;
  globalScore: number;     // 0 - 100
  isProvisional: boolean;  // Si faltan respuestas
  categories: CategoryResult[];
  harmonyPoints: string[];
  talkingPoints: string[];
  recommendations: string[];
  discussionQuestions: string[];
  // Comparativa si es modo pareja
  comparison?: {
    coincidencesCount: number;
    divergencesCount: number;
    detailedDifferences: {
      questionTitle: string;
      categoryTitle: string;
      person1Label: string;
      person2Label: string;
      differenceLevel: 'leve' | 'significativa';
      dialogueIdea: string;
    }[];
  };
}

export interface HistoryItem {
  id: string;
  type: 'names' | 'questionnaire';
  timestamp: number;
  dateFormatted: string;
  title: string;
  subtitle: string;
  score: number;
  data: NameCalculationResult | QuestionnaireResult;
}
