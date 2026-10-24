/**
 * Generador de informes PDF profesionales descargables en tamaño A4
 * Cumple estrictamente con:
 * - Carga asíncrona diferida de jsPDF (sin bloquear la carga inicial)
 * - Enlace interactivo real mediante doc.link() con la URL centralizada PDF_CTA_URL
 * - Formato editorial cuidado, márgenes, cabeceras, tablas y paginación
 * - Manejo correcto de tildes y caracteres en español
 */

import { PDF_CTA_TEXT, PDF_CTA_URL } from '../constants/config';
import { NameCalculationResult, QuestionnaireResult } from '../types';

/**
 * Función auxiliar para añadir el CTA obligatorio con enlace interactivo clicable
 */
function addInteractiveCta(doc: any, yPosition: number, pageWidth: number): number {
  const boxWidth = pageWidth - 30;
  const boxHeight = 22;
  const boxX = 15;
  const boxY = yPosition;

  // Fondo suave para el bloque de acción
  doc.setFillColor(254, 242, 242); // Rose 50
  doc.setDrawColor(254, 205, 211); // Rose 200
  doc.setLineWidth(0.5);
  doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 3, 3, 'FD');

  // Texto explicativo sutil
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 113, 108); // Stone 500
  doc.text('¿Deseas profundizar con más herramientas y reflexiones para parejas?', pageWidth / 2, boxY + 7, { align: 'center' });

  // Texto del enlace clicable con estilo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(190, 24, 93); // Rose 700
  const linkText = PDF_CTA_TEXT;
  doc.text(linkText, pageWidth / 2, boxY + 15, { align: 'center' });

  // Añadir la anotación de enlace interactivo nativo sobre toda el área del botón
  doc.link(boxX, boxY, boxWidth, boxHeight, { url: PDF_CTA_URL });

  return boxY + boxHeight + 10;
}

/**
 * Añade encabezado editorial común
 */
function addHeader(doc: any, title: string, subtitle: string, pageWidth: number) {
  // Franja superior de marca
  doc.setFillColor(159, 18, 57); // Rose 900
  doc.rect(0, 0, pageWidth, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(28, 25, 23); // Stone 900
  doc.text(title, 15, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(120, 113, 108); // Stone 500
  doc.text(subtitle, 15, 24);

  // Línea divisoria elegante
  doc.setDrawColor(231, 229, 228); // Stone 200
  doc.setLineWidth(0.5);
  doc.line(15, 28, pageWidth - 15, 28);
}

/**
 * Añade pie de página con numeración y fecha
 */
function addFooter(doc: any, pageNum: number, totalPages: number, pageWidth: number, pageHeight: number) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(168, 162, 158); // Stone 400
  doc.line(15, pageHeight - 14, pageWidth - 15, pageHeight - 14);

  doc.text('Calculadora de Amor y Compatibilidad · UnderstandShe.com', 15, pageHeight - 9);
  doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - 15, pageHeight - 9, { align: 'right' });
}

/**
 * Genera y descarga el PDF de compatibilidad por nombres
 */
export async function generateNamePdf(result: NameCalculationResult): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  addHeader(
    doc,
    'Informe de Compatibilidad por Nombres',
    `Generado el ${result.dateFormatted} · Modalidad Algorítmica Recreativa`,
    pageWidth
  );

  let cursorY = 36;

  // Tarjeta de Nombres y Porcentaje
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(244, 63, 94); // Rose 500
  doc.setLineWidth(0.8);
  doc.roundedRect(15, cursorY, pageWidth - 30, 36, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(28, 25, 23);
  doc.text(`${result.name1}  &  ${result.name2}`, 22, cursorY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(87, 83, 78);
  doc.text(result.summary, 22, cursorY + 20);

  // Cuadro con el porcentaje
  doc.setFillColor(255, 241, 242);
  doc.roundedRect(pageWidth - 52, cursorY + 6, 30, 24, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(190, 24, 93);
  doc.text(`${result.percentage}%`, pageWidth - 37, cursorY + 18, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Afinidad calculada', pageWidth - 37, cursorY + 24, { align: 'center' });

  cursorY += 44;

  // Desglose de componentes del algoritmo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('Desglose de métricas fonéticas y estructurales', 15, cursorY);
  cursorY += 6;

  const metrics = [
    { label: 'Resonancia de vocales compartidas', val: result.breakdown.vowelResonance },
    { label: 'Armonía de caracteres en común', val: result.breakdown.characterHarmony },
    { label: 'Equilibrio métrico y cadencia silábica', val: result.breakdown.rhythmBalance },
  ];

  for (const m of metrics) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(68, 64, 60);
    doc.text(m.label, 15, cursorY + 4);

    // Barra de progreso
    const barX = 100;
    const barWidth = 70;
    doc.setFillColor(245, 245, 244);
    doc.rect(barX, cursorY, barWidth, 4.5, 'F');
    doc.setFillColor(225, 29, 72);
    doc.rect(barX, cursorY, (barWidth * m.val) / 100, 4.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.text(`${m.val}%`, barX + barWidth + 5, cursorY + 3.8);
    cursorY += 9;
  }

  cursorY += 4;

  // Interpretación editorial
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('Interpretación y lectura constructiva', 15, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(68, 64, 60);
  const splitInterpretation = doc.splitTextToSize(result.interpretation, pageWidth - 30);
  doc.text(splitInterpretation, 15, cursorY);
  cursorY += splitInterpretation.length * 5 + 6;

  // Recomendaciones
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('Pautas prácticas para vuestra conversación', 15, cursorY);
  cursorY += 6;

  for (const rec of result.recommendations) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72);
    doc.text('·', 16, cursorY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(68, 64, 60);
    const splitRec = doc.splitTextToSize(rec, pageWidth - 36);
    doc.text(splitRec, 20, cursorY);
    cursorY += splitRec.length * 4.8 + 2;
  }

  cursorY += 4;

  // Nota de límites éticos y metodológicos
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(15, cursorY, pageWidth - 30, 20, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 113, 108);
  doc.text('Nota sobre los límites del cálculo:', 18, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  const limitText = 'Este porcentaje se genera a partir de un algoritmo determinista recreativo sobre los nombres. No constituye una evaluación psicológica, una predicción de futuro ni una medida de los sentimientos reales entre dos personas.';
  const splitLimit = doc.splitTextToSize(limitText, pageWidth - 36);
  doc.text(splitLimit, 18, cursorY + 11);

  cursorY += 28;

  // CTA obligatorio con enlace interactivo clicable
  addInteractiveCta(doc, cursorY, pageWidth);

  // Pie de página
  addFooter(doc, 1, 1, pageWidth, pageHeight);

  // Descarga directa
  const safeFilename = `compatibilidad_${result.name1.toLowerCase().replace(/[^a-z0-9]/g, '_')}_y_${result.name2.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  doc.save(safeFilename);
}

/**
 * Genera y descarga el PDF de evaluación mediante cuestionario
 */
export async function generateQuestionnairePdf(result: QuestionnaireResult): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Página 1: Portada, Resumen, Puntuaciones por categoría y Puntos de coincidencia
  addHeader(
    doc,
    'Informe de Compatibilidad de Pareja',
    `Evaluación basada en respuestas · Modalidad: ${result.mode === 'pareja' ? 'Comparativa en pareja' : 'Evaluación individual'} · ${result.dateFormatted}`,
    pageWidth
  );

  let cursorY = 34;

  // Tarjeta de participantes y puntuación global
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 29, 72);
  doc.setLineWidth(0.6);
  doc.roundedRect(15, cursorY, pageWidth - 30, 26, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(28, 25, 23);
  const namesDisplay = result.mode === 'pareja' && result.person2Name
    ? `${result.person1Name}  y  ${result.person2Name}`
    : `Evaluación de: ${result.person1Name}`;
  doc.text(namesDisplay, 20, cursorY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 113, 108);
  doc.text(
    result.isProvisional
      ? 'Índice global estimado (algunas preguntas sin contestar no se han penalizado)'
      : 'Índice global de armonía reflexiva en la relación',
    20,
    cursorY + 17
  );

  // Cuadro con índice
  doc.setFillColor(255, 241, 242);
  doc.roundedRect(pageWidth - 48, cursorY + 4, 28, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(190, 24, 93);
  doc.text(`${result.globalScore}%`, pageWidth - 34, cursorY + 13, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Índice general', pageWidth - 34, cursorY + 18, { align: 'center' });

  cursorY += 32;

  // Tabla con los resultados por categoría
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('Puntuación por áreas fundamentales de la relación', 15, cursorY);
  cursorY += 5;

  // Encabezado de la tabla
  doc.setFillColor(245, 245, 244);
  doc.rect(15, cursorY, pageWidth - 30, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(68, 64, 60);
  doc.text('Área de relación', 18, cursorY + 4.2);
  doc.text('Puntuación', 110, cursorY + 4.2);
  doc.text('Nivel relativo', 145, cursorY + 4.2);
  cursorY += 7;

  // Filas de las 8 categorías
  for (const cat of result.categories) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(28, 25, 23);
    doc.text(cat.categoryTitle, 18, cursorY + 3.5);

    // Barra pequeña
    doc.setFillColor(245, 245, 244);
    doc.rect(110, cursorY + 0.5, 25, 3.5, 'F');
    doc.setFillColor(cat.score >= 75 ? 16 : cat.score >= 55 ? 202 : 225, cat.score >= 75 ? 185 : cat.score >= 55 ? 138 : 29, cat.score >= 75 ? 129 : cat.score >= 55 ? 4 : 72);
    doc.rect(110, cursorY + 0.5, (25 * cat.score) / 100, 3.5, 'F');
    doc.text(`${cat.score}%`, 138, cursorY + 3.5);

    const levelText = cat.level === 'alta' ? 'Sólida' : cat.level === 'moderada' ? 'Equilibrada' : 'Por cultivar';
    doc.text(levelText, 145, cursorY + 3.5);

    doc.setDrawColor(245, 245, 244);
    doc.line(15, cursorY + 5.5, pageWidth - 15, cursorY + 5.5);
    cursorY += 6.5;
  }

  cursorY += 4;

  // Puntos de coincidencia
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(28, 25, 23);
  doc.text('Fortalezas y puntos de coincidencia', 15, cursorY);
  cursorY += 5;

  for (const p of result.harmonyPoints.slice(0, 3)) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 64, 60);
    const splitP = doc.splitTextToSize(`• ${p}`, pageWidth - 30);
    doc.text(splitP, 15, cursorY);
    cursorY += splitP.length * 4 + 1.5;
  }

  cursorY += 3;

  // Áreas con margen para conversar
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(28, 25, 23);
  doc.text('Áreas sugeridas para el diálogo conjunto', 15, cursorY);
  cursorY += 5;

  for (const t of result.talkingPoints.slice(0, 3)) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 64, 60);
    const splitT = doc.splitTextToSize(`• ${t}`, pageWidth - 30);
    doc.text(splitT, 15, cursorY);
    cursorY += splitT.length * 4 + 1.5;
  }

  // Si queda poco espacio, pasamos a Página 2
  cursorY += 4;
  if (cursorY > pageHeight - 55) {
    addFooter(doc, 1, 2, pageWidth, pageHeight);
    doc.addPage();
    addHeader(doc, 'Informe de Compatibilidad de Pareja', 'Recomendaciones prácticas y preguntas sugeridas', pageWidth);
    cursorY = 34;
  }

  // Recomendaciones personalizadas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(28, 25, 23);
  doc.text('Recomendaciones prácticas y concretas', 15, cursorY);
  cursorY += 5;

  for (const rec of result.recommendations) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 64, 60);
    const splitRec = doc.splitTextToSize(`• ${rec}`, pageWidth - 30);
    doc.text(splitRec, 15, cursorY);
    cursorY += splitRec.length * 4 + 2;
  }

  cursorY += 4;

  // Preguntas sugeridas para conversar
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(28, 25, 23);
  doc.text('Preguntas facilitadoras para un diálogo respetuoso', 15, cursorY);
  cursorY += 5;

  for (const q of result.discussionQuestions) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 64, 60);
    const splitQ = doc.splitTextToSize(`• ${q}`, pageWidth - 30);
    doc.text(splitQ, 15, cursorY);
    cursorY += splitQ.length * 4 + 2;
  }

  cursorY += 4;

  // Límites del método
  doc.setFillColor(250, 250, 249);
  doc.roundedRect(15, cursorY, pageWidth - 30, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text('Límites de la evaluación reflexiva:', 18, cursorY + 5);
  doc.setFont('helvetica', 'normal');
  const limitTxt = 'Este cuestionario resume las respuestas aportadas voluntariamente para fomentar el autoconocimiento y la comunicación. No constituye una evaluación psicológica clínica, diagnóstico ni garantía del destino de la relación.';
  const splitLim = doc.splitTextToSize(limitTxt, pageWidth - 36);
  doc.text(splitLim, 18, cursorY + 9);

  cursorY += 21;

  // Si queda poco espacio para el CTA, añadir página o dibujar
  if (cursorY > pageHeight - 40) {
    addFooter(doc, 1, 2, pageWidth, pageHeight);
    doc.addPage();
    addHeader(doc, 'Informe de Compatibilidad de Pareja', 'Continuidad y recursos para parejas', pageWidth);
    cursorY = 36;
    addInteractiveCta(doc, cursorY, pageWidth);
    addFooter(doc, 2, 2, pageWidth, pageHeight);
  } else {
    addInteractiveCta(doc, cursorY, pageWidth);
    addFooter(doc, 1, 1, pageWidth, pageHeight);
  }

  const safeFilename = `evaluacion_compatibilidad_${result.person1Name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  doc.save(safeFilename);
}
