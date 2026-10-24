# Calculadora de Amor y Compatibilidad de Pareja

Herramienta web profesional desarrollada en **React 19**, **TypeScript** y **Tailwind CSS**, diseñada para evaluar la afinidad nominal y la compatibilidad reflexiva de parejas en 8 dimensiones clave, con generación instantánea de informes PDF descargables y privacidad 100% en el cliente.

🔗 **Integrado con:** [UnderstandShe.com](https://www.understandshe.com/p/calculadora-de-amor-edad-y-tiempo.html)

---

## 🚀 Características Principales

1. **Calculadora por Nombres (Algoritmo Determinista):**
   - Análisis conmutativo y reproducible (`calc(A, B) === calc(B, A)`).
   - Tratamiento de tildes (`á, é, í, ó, ú`), diéresis (`ü`) y letra `ñ`.
   - Desglose en 3 métricas fonéticas: Resonancia de vocales, Armonía de caracteres y Equilibrio métrico.
   - Puntuación delimitada entre 1% y 100%.

2. **Cuestionario Reflexivo de Pareja:**
   - 24 preguntas estructuradas en 8 dimensiones: Comunicación, Confianza, Respeto, Valores, Conflictos, Afecto, Independencia y Expectativas.
   - Modalidad **Individual** o **En pareja** (con comparativa de respuestas).
   - Regla transparente de puntuación: las preguntas omitidas no penalizan negativamente.

3. **Informes PDF Profesionales:**
   - Generación A4 en tiempo real con `jspdf`.
   - Enlace interactivo clicable obligatorio hacia UnderstandShe.com.
   - Diseño editorial con tablas, barras métricas y recomendaciones personalizadas.

4. **Privacidad por Diseño:**
   - Procesamiento 100% en el navegador (Client-side).
   - Historial local opcional con `localStorage`.
   - Sin recopilación de datos personales ni cookies de terceros.

5. **SEO y Accesibilidad:**
   - Optimizado para palabras clave principales: *calculadora de amor, compatibilidad por nombres, test de pareja*.
   - Schema.org JSON-LD structured data (`WebApplication`).
   - Meta tags OpenGraph, Twitter Cards, `robots.txt` y `sitemap.xml`.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** React 19 + TypeScript + Vite 8
- **Estilos:** Tailwind CSS v4
- **Iconografía:** Lucide React
- **Documentos:** jsPDF
- **Despliegue:** Optimizado para Vercel, Netlify, Cloudflare Pages o Cloud Run

---

## 📦 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/calculadora-de-amor.git

# 2. Entrar al directorio
cd calculadora-de-amor

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

## 📄 Licencia

Código disponible bajo licencia Apache-2.0. Desarrollado con rigor y propósito reflexivo para UnderstandShe.
