/**
 * Cuestionario estructurado de compatibilidad de pareja
 * 8 categorías fundamentales con 3 preguntas reflexivas cada una (24 en total).
 * Redacción inclusiva, respetuosa y natural en español de España.
 */

import { Category, QuestionOption } from '../types';

export const ANSWER_OPTIONS: QuestionOption[] = [
  { value: 4, label: 'Casi siempre', description: 'Ocurre de manera habitual y espontánea' },
  { value: 3, label: 'A menudo', description: 'Es la tónica común en la mayoría de ocasiones' },
  { value: 2, label: 'A veces', description: 'Depende del momento o de las circunstancias' },
  { value: 1, label: 'Rara vez', description: 'Cuesta que suceda o genera cierta tensión' },
  { value: 0, label: 'Nunca', description: 'No se da o representa una dificultad marcada' },
  { value: -1, label: 'Prefiero no responder', description: 'No se penaliza ni computa en la puntuación' },
];

export const QUESTIONNAIRE_CATEGORIES: Category[] = [
  {
    id: 'comunicacion',
    title: 'Comunicación',
    description: 'Capacidad de expresar emociones, escucharse activamente y abordar desacuerdos con serenidad.',
    iconName: 'MessageSquare',
    questions: [
      {
        id: 'com_1',
        categoryId: 'comunicacion',
        title: 'Facilidad para hablar de sentimientos',
        subtitle: '¿Sientes libertad y tranquilidad para compartir tus emociones más íntimas con la otra persona?',
      },
      {
        id: 'com_2',
        categoryId: 'comunicacion',
        title: 'Capacidad para escuchar sin interrumpir',
        subtitle: 'Cuando uno de los dos habla de algo importante, ¿el otro atiende de verdad sin juzgar ni adelantarse?',
      },
      {
        id: 'com_3',
        categoryId: 'comunicacion',
        title: 'Posibilidad de expresar desacuerdos con respeto',
        subtitle: '¿Es posible discrepar abiertamente sin que la conversación derive en reproches o silencios incómodos?',
      },
    ],
  },
  {
    id: 'confianza',
    title: 'Confianza',
    description: 'Sensación de seguridad psicológica, predictibilidad y sinceridad mutua en la relación.',
    iconName: 'ShieldCheck',
    questions: [
      {
        id: 'conf_1',
        categoryId: 'confianza',
        title: 'Sensación de seguridad en la relación',
        subtitle: '¿Sientes calma emocional y certeza de que el vínculo es sólido y constructivo?',
      },
      {
        id: 'conf_2',
        categoryId: 'confianza',
        title: 'Coherencia entre palabras y acciones',
        subtitle: '¿Los compromisos acordados y las intenciones manifestadas se ven reflejados en el día a día?',
      },
      {
        id: 'conf_3',
        categoryId: 'confianza',
        title: 'Capacidad para hablar de preocupaciones sin miedo',
        subtitle: '¿Puedes expresar dudas, miedos o vulnerabilidades sin temor a ser juzgado o menospreciado?',
      },
    ],
  },
  {
    id: 'respeto',
    title: 'Respeto',
    description: 'Valoración de la dignidad personal, aceptación de las diferencias y preservación de límites.',
    iconName: 'HeartHandshake',
    questions: [
      {
        id: 'resp_1',
        categoryId: 'respeto',
        title: 'Respeto por los límites personales',
        subtitle: '¿Se aceptan y respetan los "no" y los ritmos personales sin insistencias que generen malestar?',
      },
      {
        id: 'resp_2',
        categoryId: 'respeto',
        title: 'Respeto por el espacio individual',
        subtitle: '¿Se valora positivamente que cada persona disponga de momentos a solas o con su entorno?',
      },
      {
        id: 'resp_3',
        categoryId: 'respeto',
        title: 'Capacidad para aceptar diferencias',
        subtitle: '¿Se toleran de buen grado las diferencias de personalidad, opiniones o preferencias cotidianas?',
      },
    ],
  },
  {
    id: 'valores',
    title: 'Valores y expectativas',
    description: 'Sintonía en prioridades vitales, planes de futuro, ética y visión general del compromiso.',
    iconName: 'Compass',
    questions: [
      {
        id: 'val_1',
        categoryId: 'valores',
        title: 'Objetivos de futuro compartidos',
        subtitle: '¿Existe compatibilidad o coincidencia general sobre el rumbo vital que queréis seguir a medio y largo plazo?',
      },
      {
        id: 'val_2',
        categoryId: 'valores',
        title: 'Expectativas sobre el compromiso',
        subtitle: '¿Compartís una visión compatible sobre el grado de implicación y responsabilidad dentro del vínculo?',
      },
      {
        id: 'val_3',
        categoryId: 'valores',
        title: 'Prioridades personales y familiares',
        subtitle: '¿Coincidís en el peso que otorgáis a la familia, las amistades, el trabajo y el tiempo de ocio?',
      },
    ],
  },
  {
    id: 'conflictos',
    title: 'Gestión de conflictos',
    description: 'Habilidad para resolver roces, reparar el vínculo tras un enfado y cooperar en soluciones.',
    iconName: 'Scale',
    questions: [
      {
        id: 'confli_1',
        categoryId: 'conflictos',
        title: 'Capacidad para resolver desacuerdos',
        subtitle: 'Cuando surge un roce, ¿buscáis aclararlo constructivamente en lugar de dejar que se enquiste?',
      },
      {
        id: 'confli_2',
        categoryId: 'conflictos',
        title: 'Disposición para reconocer errores',
        subtitle: '¿Ambas partes son capaces de pedir disculpas con honestidad cuando reconocen haberse equivocado?',
      },
      {
        id: 'confli_3',
        categoryId: 'conflictos',
        title: 'Búsqueda de soluciones compartidas',
        subtitle: '¿Se orientan las discusiones a encontrar un acuerdo justo para los dos en vez de buscar un vencedor?',
      },
    ],
  },
  {
    id: 'afecto',
    title: 'Afecto y conexión',
    description: 'Expresión de ternura, complicidad, intimidad emocional y tiempo de disfrute compartido.',
    iconName: 'Sparkles',
    questions: [
      {
        id: 'afec_1',
        categoryId: 'afecto',
        title: 'Formas de expresar cariño',
        subtitle: '¿Sentís que la forma en que cada uno expresa el afecto (palabras, gestos, detalles) es bien recibida?',
      },
      {
        id: 'afec_2',
        categoryId: 'afecto',
        title: 'Sensación de cercanía emocional',
        subtitle: '¿Existe una sintonía cálida y de apoyo donde ambos se sienten valorados y queridos de corazón?',
      },
      {
        id: 'afec_3',
        categoryId: 'afecto',
        title: 'Tiempo de calidad compartido',
        subtitle: '¿Disfrutáis de momentos genuinos juntos, con presencia plena y disfrute mutuo sin distracciones?',
      },
    ],
  },
  {
    id: 'independencia',
    title: 'Independencia y equilibrio',
    description: 'Cuidado de la individualidad, amistades externas y autonomía personal sin dependencia excesiva.',
    iconName: 'Feather',
    questions: [
      {
        id: 'indep_1',
        categoryId: 'independencia',
        title: 'Respeto por amistades e intereses propios',
        subtitle: '¿Se alienta y apoya que cada uno mantenga sus aficiones, proyectos y amistades independientes?',
      },
      {
        id: 'indep_2',
        categoryId: 'independencia',
        title: 'Equilibrio entre tiempo personal y compartido',
        subtitle: '¿Se siente natural y cómodo repartir el tiempo sin reproches por querer ratos para uno mismo?',
      },
      {
        id: 'indep_3',
        categoryId: 'independencia',
        title: 'Capacidad para mantener la identidad propia',
        subtitle: '¿Cada persona conserva su criterio, gustos y personalidad sin mimetizarse o renunciar a quién es?',
      },
    ],
  },
  {
    id: 'expectativas',
    title: 'Expectativas de relación',
    description: 'Claridad en acuerdos afectivos, ritmo de comunicación y límites acordados.',
    iconName: 'BookmarkCheck',
    questions: [
      {
        id: 'exp_1',
        categoryId: 'expectativas',
        title: 'Nivel de compromiso deseado',
        subtitle: '¿Ambas partes se encuentran en un punto de deseo similar respecto a la profundidad y rumbo de la relación?',
      },
      {
        id: 'exp_2',
        categoryId: 'expectativas',
        title: 'Necesidad y ritmo de comunicación',
        subtitle: '¿Existe comodidad con la frecuencia y los canales con los que os comunicáis a diario?',
      },
      {
        id: 'exp_3',
        categoryId: 'expectativas',
        title: 'Expectativas sobre exclusividad o acuerdos',
        subtitle: '¿Tenéis claridad y satisfacción mutua respecto a los límites, lealtad y acuerdos del vínculo?',
      },
    ],
  },
];
