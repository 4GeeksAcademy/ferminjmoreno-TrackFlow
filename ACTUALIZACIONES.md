# Actualizaciones de TrackFlow

## Refactorización

- Se separaron los datos de los componentes visuales:
  - `src/data/servicesData.js`: catálogo de servicios.
  - `src/data/whyUsData.js`: ventajas de TrackFlow.
- Se corrigió la carga de imágenes SVG usando imports compatibles con Vite.
- Se creó `src/features/validation.js` con validaciones reutilizables para texto, email, teléfono, selects, checkboxes y el formulario completo.
- `src/features/leadForm.js` ahora utiliza el módulo centralizado de validación.
- Se mantuvo la estructura de componentes existente y se redujo la lógica duplicada.

## Formulario de contacto

- Se añadió el botón visible **Limpiar formulario** en `src/components/contact.js`.
- El botón:
  - Vacía todos los campos.
  - Desmarca checkboxes y radios.
  - Oculta los mensajes de error.
  - Restablece el contador de comentarios a 500 caracteres.
  - Oculta el aviso de volumen bajo.
  - Limpia el mensaje de estado.

## Mejoras SEO

- Se optimizó el título de la página con términos descriptivos.
- Se amplió la meta descripción con las ubicaciones y servicios principales.
- Se añadieron:
  - `meta keywords`.
  - `meta robots` con `index, follow`.
  - URL canónica.
  - Metadatos Open Graph para redes sociales.
  - `og:type`, `og:title`, `og:description`, `og:url` y `og:locale`.
- Se conservó el marcado estructurado JSON-LD de tipo `Organization`.
- Se creó `public/robots.txt`.
- Se creó `public/sitemap.xml`.
- Se reemplazaron enlaces `href="#"`:
  - El logo ahora enlaza a `/`.
  - Privacidad enlaza a `/privacidad`.
  - Cookies enlaza a `/cookies`.
- Se añadió una etiqueta accesible al menú legal del footer.

## Verificación

- El diagnóstico del editor no reportó errores en `src`.
- El build de producción terminó correctamente con Vite.
- Se verificó que `robots.txt` y `sitemap.xml` se copian a `dist/`.
- Servidor de desarrollo utilizado:

```bash
node ./node_modules/vite/bin/vite.js --port 3001 --host
```

URL local:

```text
http://localhost:3001/
```

## Evaluación SEO futura

Para comprobar el SEO en Chrome:

1. Ejecutar la aplicación con el servidor de desarrollo.
2. Abrir `http://localhost:3001/`.
3. Abrir DevTools con `F12`.
4. Entrar en la pestaña **Lighthouse**.
5. Seleccionar la categoría **SEO**.
6. Generar el reporte.
7. Revisar las auditorías fallidas y aplicar la recomendación indicada.

También se puede automatizar desde terminal si Lighthouse está instalado:

```bash
npx lighthouse http://localhost:3001/ --only-categories=seo --output=html --output-path=./lighthouse-seo.html
```

## Checklist para próximas evaluaciones

- [ ] El `<title>` es único, descriptivo y breve.
- [ ] La meta descripción explica claramente el servicio.
- [ ] Existe una URL canónica correcta para producción.
- [ ] `robots.txt` permite rastrear las páginas públicas.
- [ ] `sitemap.xml` contiene las URLs públicas reales.
- [ ] Todas las imágenes tienen texto alternativo `alt`.
- [ ] Los enlaces tienen destinos reales y texto descriptivo.
- [ ] Los encabezados siguen una jerarquía lógica: `h1`, `h2`, `h3`.
- [ ] La página funciona en móvil.
- [ ] Los datos estructurados JSON-LD son válidos.
- [ ] Se vuelve a ejecutar Lighthouse después de cada cambio SEO.

> Nota: `https://trackflow.com/`, `/privacidad` y `/cookies` son URLs de producción de ejemplo. Deben sustituirse por las URLs reales antes de publicar.
