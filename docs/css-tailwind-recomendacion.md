# Recomendación: mantener `src/style.css` tal como está

## Contexto

Se evaluó la posibilidad de eliminar `src/style.css` y sustituirlo por Tailwind CSS.

## Hallazgo

El proyecto **ya usa Tailwind CSS v4** (`@import "tailwindcss";` en la línea 1 de `src/style.css`). No es un CSS tradicional pendiente de migrar: son solo ~87 líneas que contienen:

1. Un bloque `@theme` con los colores de marca (necesario en Tailwind v4 para generar utilidades como `bg-primary-navy`).
2. Un puñado de clases custom (`.card-shadow`, `.form-input`, `.hero-right-panel`, `.hero-right-card`, `.form-label`, `.form-error`, `.transition-smooth`, `.card-shadow-hover`) para estilos que Tailwind no cubre limpiamente en una sola utilidad (sombras compuestas, `color-mix`, `!important` en bordes).

## Impacto de eliminarlo por completo

- Eliminar el `@theme` y mover esos colores a configuración o a valores arbitrarios (`bg-[#0f172a]`) en cada componente haría perder la ventaja de tener tokens de marca centralizados.
- Convertir las ~8 clases custom en combinaciones de utilidades repetidas en cada archivo de `src/components/` (hero.js, contact.js, etc.) aumentaría la duplicación, ya que son plantillas de string en JS (sin JSX ni autocompletado de clases).

## Conclusión

- Sustituir únicamente las clases custom por utilidades Tailwind directas en los componentes sería factible y de bajo impacto, si se quisiera hacer en el futuro.
- Eliminar también el bloque `@theme` **no se recomienda**: es la forma estándar en Tailwind v4 de declarar tokens de diseño, no CSS "de más".

**Decisión actual: dejar `src/style.css` sin modificar.**
