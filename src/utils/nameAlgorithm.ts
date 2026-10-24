/**
 * Algoritmo determinista y conmutativo para la Calculadora de Amor por Nombres
 * 
 * Reglas esenciales:
 * 1. Mismo par de nombres => Mismo resultado reproducible en cualquier momento.
 * 2. Conmutatividad: calc(A, B) === calc(B, A).
 * 3. Rango exacto: 1% a 100%.
 * 4. Tratamiento riguroso de caracteres del español (á, é, í, ó, ú, ü, ñ).
 * 5. 100% determinista, sin Math.random() ni llamadas a servidores.
 */

import { NameCalculationResult } from '../types';

/**
 * Normaliza una cadena para el análisis algorítmico sin modificar la presentación visual.
 * Convierte a minúsculas, transforma tildes y diéresis conservando la 'ñ'.
 */
export function normalizeNameForAlgorithm(name: string): string {
  if (!name) return '';
  return name
    .trim()
    .toLowerCase()
    // Reemplazos explícitos de vocales con tildes y diéresis comunes en español
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    // Conservamos explícitamente a-z y ñ
    .replace(/[^a-zñ]/g, '');
}

/**
 * Función hash polinomial determinista
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Calcula la afinidad fonética de vocales compartidas (0 a 100)
 */
function calculateVowelResonance(norm1: string, norm2: string): number {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const count1: { [key: string]: number } = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  const count2: { [key: string]: number } = { a: 0, e: 0, i: 0, o: 0, u: 0 };

  for (const c of norm1) if (vowels.includes(c)) count1[c]++;
  for (const c of norm2) if (vowels.includes(c)) count2[c]++;

  let sharedVowels = 0;
  let totalVowels = 0;

  for (const v of vowels) {
    const min = Math.min(count1[v], count2[v]);
    const max = Math.max(count1[v], count2[v]);
    sharedVowels += min;
    totalVowels += max;
  }

  if (totalVowels === 0) return 60;
  const ratio = sharedVowels / totalVowels;
  // Escalar a un rango agradable de 40 a 98
  return Math.round(40 + ratio * 58);
}

/**
 * Calcula la armonía alfabética (frecuencia de caracteres comunes) (0 a 100)
 */
function calculateCharacterHarmony(norm1: string, norm2: string): number {
  const set1 = new Set(norm1.split(''));
  const set2 = new Set(norm2.split(''));

  let intersectionCount = 0;
  for (const char of set1) {
    if (set2.has(char)) {
      intersectionCount++;
    }
  }

  const unionSize = new Set([...set1, ...set2]).size;
  if (unionSize === 0) return 50;

  const jaccard = intersectionCount / unionSize;
  return Math.round(35 + jaccard * 63);
}

/**
 * Calcula el equilibrio rítmico y de longitud métrica entre los dos nombres (0 a 100)
 */
function calculateRhythmBalance(norm1: string, norm2: string): number {
  const len1 = norm1.length;
  const len2 = norm2.length;
  const diff = Math.abs(len1 - len2);
  const maxLen = Math.max(len1, len2, 1);

  const balanceRatio = 1 - diff / maxLen;
  return Math.round(45 + balanceRatio * 53);
}

/**
 * Calcula el porcentaje global determinista y conmutativo
 */
export function calculateNameCompatibility(rawName1: string, rawName2: string): NameCalculationResult {
  const cleanName1 = rawName1.trim();
  const cleanName2 = rawName2.trim();

  const norm1 = normalizeNameForAlgorithm(cleanName1);
  const norm2 = normalizeNameForAlgorithm(cleanName2);

  // Para asegurar la conmutatividad f(A, B) === f(B, A), ordenamos alfabéticamente las versiones normalizadas
  const [firstSorted, secondSorted] = [norm1, norm2].sort();

  // 1. Componentes estructurales
  const vowelResonance = calculateVowelResonance(firstSorted, secondSorted);
  const characterHarmony = calculateCharacterHarmony(firstSorted, secondSorted);
  const rhythmBalance = calculateRhythmBalance(firstSorted, secondSorted);

  // 2. Hash combinado de la pareja ordenada
  const combinedPair = `${firstSorted}#${secondSorted}`;
  const pairHash = hashString(combinedPair);

  // 3. Ponderación determinista:
  // Componente semántico/lingüístico (60%) + dispersión determinista (40%)
  const linguisticScore = (vowelResonance * 0.35) + (characterHarmony * 0.40) + (rhythmBalance * 0.25);
  
  // Usamos una función pseudoaleatoria determinista basada en el número áureo (phi) y el hash
  const pseudoSeed = (pairHash * 2654435761) % 4294967296;
  const deterministicOffset = ((pseudoSeed % 60) - 30); // Desviación controlada entre -30 y +30

  let rawPercentage = Math.round(linguisticScore + (deterministicOffset * 0.45));

  // Acotar estrictamente entre 1 y 100
  let finalPercentage = Math.max(1, Math.min(100, rawPercentage));

  // Si da 0 o negativo por algún caso extremo, fijar en 1 mínimo
  if (isNaN(finalPercentage) || finalPercentage < 1) finalPercentage = 42;

  // Interpretación textual profesional según el rango
  const { summary, interpretation, recommendations } = getInterpretationByScore(finalPercentage, cleanName1, cleanName2);

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  return {
    id: `calc_${Date.now()}_${pairHash.toString(36)}`,
    timestamp: Date.now(),
    dateFormatted,
    name1: cleanName1,
    name2: cleanName2,
    percentage: finalPercentage,
    breakdown: {
      vowelResonance,
      characterHarmony,
      rhythmBalance,
    },
    summary,
    interpretation,
    recommendations,
  };
}

/**
 * Devuelve interpretaciones realistas, empáticas y constructivas en español de España
 */
function getInterpretationByScore(score: number, n1: string, n2: string): {
  summary: string;
  interpretation: string;
  recommendations: string[];
} {
  if (score >= 85) {
    return {
      summary: `Afinidad nominal muy elevada (${score}%)`,
      interpretation: `Los nombres de ${n1} y ${n2} presentan una notable simetría en su estructura fonética y patrón de vocales. En este método recreativo, esto simboliza una resonancia fluida y una cadencia compartida armoniosa.`,
      recommendations: [
        'Aprovechad esta sintonía para mantener conversaciones sinceras sobre vuestras metas y proyectos.',
        'Recordad que la verdadera afinidad se cultiva día a día mediante la escucha activa y el apoyo mutuo.',
        'Explorad juntos nuevas actividades compartidas manteniendo siempre vuestro espacio personal.',
      ],
    };
  }

  if (score >= 70) {
    return {
      summary: `Afinidad equilibrada y constructiva (${score}%)`,
      interpretation: `Existe un balance interesante entre las coincidencias de caracteres y la diversidad rítmica entre ${n1} y ${n2}. Sugiere una combinación donde los puntos en común facilitan el entendimiento y los contrastes enriquecen la relación.`,
      recommendations: [
        'Celebrad vuestras coincidencias y aprended con curiosidad de vuestras diferencias.',
        'Fomentad espacios de diálogo regular para expresar agradecimiento y resolver dudas a tiempo.',
        'Estableced acuerdos claros y realistas sobre vuestras expectativas de convivencia y tiempo juntos.',
      ],
    };
  }

  if (score >= 50) {
    return {
      summary: `Afinidad dinámica con diversidad de ritmos (${score}%)`,
      interpretation: `Los nombres de ${n1} y ${n2} muestran estructuras lingüísticas con matices complementarios más que idénticos. En una relación, los contrastes pueden aportar perspectivas frescas si existe voluntad de escucha y respeto.`,
      recommendations: [
        'Preguntad con interés genuino por la forma en que cada uno prefiere comunicarse en momentos difíciles.',
        'No deis por sentadas las interpretaciones del otro; contrastad con amabilidad cualquier duda.',
        'Dedicad tiempo de calidad sin pantallas para estrechar el vínculo afectivo de forma relajada.',
      ],
    };
  }

  return {
    summary: `Afinidad singular con contrastes fonéticos (${score}%)`,
    interpretation: `Las estructuras de ${n1} y ${n2} poseen ritmos muy diferenciados en este algoritmo. Recordad que este cálculo es meramente recreativo: en la vida real, parejas con estilos y orígenes muy distintos construyen relaciones sólidas basadas en la empatía y los valores compartidos.`,
    recommendations: [
      'Prestad especial atención a escuchar las razones del otro antes de sacar conclusiones precipitadas.',
      'Valorad la singularidad de cada uno como una oportunidad de crecimiento mutuo.',
      'Os invitamos a realizar el cuestionario reflexivo para evaluar la relación en dimensiones humanas reales.',
    ],
  };
}
