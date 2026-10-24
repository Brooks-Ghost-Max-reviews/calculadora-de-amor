/**
 * Sistema de puntuación transparente, balanceado y documentado
 * para el Cuestionario de Compatibilidad de Pareja.
 */

import {
  CategoryResult,
  QuestionnaireAnswers,
  QuestionnaireResult,
} from '../types';
import { ANSWER_OPTIONS, QUESTIONNAIRE_CATEGORIES } from './questionnaireData';

/**
 * Calcula los resultados para una evaluación individual o de pareja
 */
export function calculateQuestionnaireResults(
  person1Name: string,
  person1Answers: QuestionnaireAnswers,
  mode: 'individual' | 'pareja' = 'individual',
  person2Name?: string,
  person2Answers?: QuestionnaireAnswers
): QuestionnaireResult {
  const cleanName1 = person1Name.trim() || 'Persona 1';
  const cleanName2 = person2Name ? person2Name.trim() : 'Persona 2';

  let totalQuestionsCount = 0;
  let totalAnsweredCount = 0;
  let accumulatedCategoryPercentages = 0;
  let evaluatedCategoriesCount = 0;

  const categoriesResults: CategoryResult[] = [];

  for (const category of QUESTIONNAIRE_CATEGORIES) {
    let catMaxPoints = 0;
    let catEarnedPoints = 0;
    let catAnswered = 0;

    for (const q of category.questions) {
      totalQuestionsCount++;
      const val1 = person1Answers[q.id];

      // En modo pareja, promediamos las respuestas de ambas partes si ambas respondieron
      if (mode === 'pareja' && person2Answers) {
        const val2 = person2Answers[q.id];
        const validValues: number[] = [];
        if (typeof val1 === 'number' && val1 >= 0) validValues.push(val1);
        if (typeof val2 === 'number' && val2 >= 0) validValues.push(val2);

        if (validValues.length > 0) {
          const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length;
          catEarnedPoints += avg;
          catMaxPoints += 4; // Escala máxima es 4
          catAnswered++;
          totalAnsweredCount++;
        }
      } else {
        // Modo individual
        if (typeof val1 === 'number' && val1 >= 0) {
          catEarnedPoints += val1;
          catMaxPoints += 4;
          catAnswered++;
          totalAnsweredCount++;
        }
      }
    }

    const unansweredCount = category.questions.length - catAnswered;
    let categoryScore = 70; // Puntuación neutra por defecto si no hubo respuestas

    if (catMaxPoints > 0) {
      categoryScore = Math.round((catEarnedPoints / catMaxPoints) * 100);
      accumulatedCategoryPercentages += categoryScore;
      evaluatedCategoriesCount++;
    }

    let level: 'alta' | 'moderada' | 'por_desarrollar' = 'moderada';
    if (categoryScore >= 75) level = 'alta';
    else if (categoryScore < 55) level = 'por_desarrollar';

    const { interpretation, dialoguePrompt } = getCategoryFeedback(category.id, categoryScore);

    categoriesResults.push({
      categoryId: category.id,
      categoryTitle: category.title,
      score: categoryScore,
      answeredCount: catAnswered,
      totalQuestions: category.questions.length,
      unansweredCount,
      level,
      interpretation,
      dialoguePrompt,
    });
  }

  // Índice global: promedio de las categorías con respuestas
  const globalScore = evaluatedCategoriesCount > 0
    ? Math.round(accumulatedCategoryPercentages / evaluatedCategoriesCount)
    : 70;

  // Marcador provisional si falta más del 25% de las preguntas
  const isProvisional = totalAnsweredCount < (totalQuestionsCount * 0.75);

  // Extraer puntos fuertes (sintonía) y puntos a dialogar
  const harmonyPoints: string[] = [];
  const talkingPoints: string[] = [];

  for (const cat of categoriesResults) {
    if (cat.score >= 75) {
      harmonyPoints.push(`${cat.categoryTitle} (${cat.score}%): Muestra una base consolidada y natural.`);
    } else if (cat.score < 60) {
      talkingPoints.push(`${cat.categoryTitle} (${cat.score}%): Área con margen de mejora o contrastes que conviene conversar con empatía.`);
    }
  }

  if (harmonyPoints.length === 0) {
    harmonyPoints.push('Disposición mutua a explorar la relación y dedicar tiempo a la reflexión conjunta.');
  }
  if (talkingPoints.length === 0) {
    talkingPoints.push('Mantenimiento del equilibrio a largo plazo y prevención del desgaste de la rutina.');
  }

  // Recomendaciones prácticas contextuales
  const recommendations = generateRecommendations(categoriesResults, mode);

  // Preguntas sugeridas para conversar
  const discussionQuestions = generateDiscussionQuestions(categoriesResults);

  // Comparativa si es modo pareja
  let comparisonData: QuestionnaireResult['comparison'] = undefined;
  if (mode === 'pareja' && person2Answers) {
    let coincidencesCount = 0;
    let divergencesCount = 0;
    const detailedDifferences: {
      questionTitle: string;
      categoryTitle: string;
      person1Label: string;
      person2Label: string;
      differenceLevel: 'leve' | 'significativa';
      dialogueIdea: string;
    }[] = [];

    for (const cat of QUESTIONNAIRE_CATEGORIES) {
      for (const q of cat.questions) {
        const a1 = person1Answers[q.id];
        const a2 = person2Answers[q.id];

        if (typeof a1 === 'number' && typeof a2 === 'number' && a1 >= 0 && a2 >= 0) {
          const diff = Math.abs(a1 - a2);
          if (diff <= 1) {
            coincidencesCount++;
          } else {
            divergencesCount++;
            const l1 = ANSWER_OPTIONS.find(o => o.value === a1)?.label || '';
            const l2 = ANSWER_OPTIONS.find(o => o.value === a2)?.label || '';
            detailedDifferences.push({
              questionTitle: q.title,
              categoryTitle: cat.title,
              person1Label: l1,
              person2Label: l2,
              differenceLevel: diff >= 2 ? 'significativa' : 'leve',
              dialogueIdea: `¿Cómo percibe cada uno esta situación en el día a día? ¿Hay algún ejemplo reciente que ayude a entender el punto de vista del otro?`,
            });
          }
        }
      }
    }

    comparisonData = {
      coincidencesCount,
      divergencesCount,
      detailedDifferences,
    };
  }

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  return {
    id: `eval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    dateFormatted,
    mode,
    person1Name: cleanName1,
    person2Name: mode === 'pareja' ? cleanName2 : undefined,
    globalScore,
    isProvisional,
    categories: categoriesResults,
    harmonyPoints,
    talkingPoints,
    recommendations,
    discussionQuestions,
    comparison: comparisonData,
  };
}

function getCategoryFeedback(categoryId: string, score: number): {
  interpretation: string;
  dialoguePrompt: string;
} {
  if (score >= 75) {
    return {
      interpretation: 'Presenta una base sólida y saludable. Existe un grado notable de entendimiento y comodidad en este ámbito.',
      dialoguePrompt: '¿Qué es lo que más agradecéis de cómo gestionáis este aspecto juntos?',
    };
  }
  if (score >= 55) {
    return {
      interpretation: 'Nivel equilibrado con momentos positivos y ocasiones en las que surgen pequeñas discrepancias normales en toda convivencia.',
      dialoguePrompt: '¿Qué pequeño ajuste facilitaría que ambos os sintieseis aún más comprendidos en esta dimensión?',
    };
  }
  return {
    interpretation: 'Área sensible con margen de desarrollo. Puede indicar percepciones dispares o necesidad de dedicar tiempo a clarificar expectativas.',
    dialoguePrompt: '¿Qué emoción suele surgir cuando abordáis este tema y cómo podemos crear un clima seguro para hablarlo con calma?',
  };
}

function generateRecommendations(categories: CategoryResult[], mode: 'individual' | 'pareja'): string[] {
  const recs: string[] = [];
  const lowCategories = categories.filter(c => c.score < 60);

  if (lowCategories.some(c => c.categoryId === 'comunicacion')) {
    recs.push('Practicar pausas activas: cuando una conversación empiece a tensarse, acordad un receso de 15 minutos antes de retomar el tema serenamente.');
  }
  if (lowCategories.some(c => c.categoryId === 'confianza')) {
    recs.push('Reforzar la coherencia cotidiana: dar prioridad al cumplimiento de pequeños acuerdos diarios para nutrir la seguridad emocional mutua.');
  }
  if (lowCategories.some(c => c.categoryId === 'respeto')) {
    recs.push('Validar las diferencias: aceptar que cada integrante tiene ritmos emocionales y necesidades de espacio individual legítimas.');
  }
  if (lowCategories.some(c => c.categoryId === 'conflictos')) {
    recs.push('Enfocar las discrepancias como un equipo frente a un problema común, en vez de una contienda entre dos personas.');
  }
  if (lowCategories.some(c => c.categoryId === 'valores')) {
    recs.push('Crear una velada para compartir planes y prioridades personales sin juzgar, buscando los puntos de encuentro vitales.');
  }
  if (lowCategories.some(c => c.categoryId === 'afecto')) {
    recs.push('Dedicar al menos un momento semanal sin dispositivos electrónicos orientado exclusivamente al disfrute y la cercanía.');
  }
  if (lowCategories.some(c => c.categoryId === 'independencia')) {
    recs.push('Celebrar la autonomía mutua: el cuidado de las aficiones y amistades propias fortalece la relación en vez de debilitarla.');
  }

  // Recomendación general transversal
  if (recs.length < 3) {
    recs.push('Establecer revisiones periódicas afectivas: dedicar unos minutos cada mes para preguntaros cómo os habéis sentido y qué agradecéis.');
    recs.push('Fomentar la curiosidad constructiva: sustituir las suposiciones por preguntas directas y cariñosas sobre lo que necesita la otra persona.');
  }

  return recs.slice(0, 4);
}

function generateDiscussionQuestions(categories: CategoryResult[]): string[] {
  const questions: string[] = [];
  
  // Seleccionar preguntas de las categorías más representativas
  const sorted = [...categories].sort((a, b) => a.score - b.score);
  
  if (sorted.length > 0) {
    questions.push(`Sobre ${sorted[0].categoryTitle}: ${sorted[0].dialoguePrompt}`);
  }
  if (sorted.length > 1) {
    questions.push(`Sobre ${sorted[1].categoryTitle}: ${sorted[1].dialoguePrompt}`);
  }
  const highest = sorted[sorted.length - 1];
  if (highest) {
    questions.push(`Sobre vuestra fortaleza en ${highest.categoryTitle}: ${highest.dialoguePrompt}`);
  }
  questions.push('¿Qué podemos hacer esta semana para que ambos nos sintamos un poco más cuidados y valorados?');

  return questions;
}
