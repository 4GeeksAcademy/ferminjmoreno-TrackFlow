# Checklist de actividades del dominio TrackFlow

## 1. Identificación del dominio

- [x] Confirmar que TrackFlow es un operador logístico especializado en e-commerce.
- [x] Confirmar la operación entre Los Ángeles, Estados Unidos, y Zaragoza, España.
- [x] Descartar completamente México del dominio.
- [x] Identificar transportistas: UPS, FedEx, DHL, MRW y SEUR.
- [x] Diferenciar el manifiesto del checkpoint interno.
- [x] Identificar la trazabilidad interna y el estado público del envío.
- [x] Identificar la tasación logística por peso real, peso volumétrico, descuentos y recargos.

## 2. Entidades de negocio

- [x] `Company`
- [x] `Contact`
- [x] `Lead`
- [x] `LogisticService`
- [x] `Address`
- [x] `Carrier`
- [x] `Location`
- [x] `Package`
- [x] `ShipmentManifest`
- [x] `Checkpoint`
- [x] `Quote`
- [x] `Rate`
- [x] `Discount`
- [x] `Incident`

Total actual: **14 entidades**.

## 3. Interfaces y tipos TypeScript

- [x] Crear las interfaces de dominio en `src/types/models.ts`.
- [x] Crear tipos literales para estados, países, servicios, transportistas y catálogos.
- [x] Aplicar `PascalCase` a interfaces y tipos.
- [x] Aplicar `camelCase` a propiedades y funciones.
- [x] Crear `ShipmentReport`.
- [x] Crear `PackageWeightReport`.

## 4. Validaciones de negocio

- [x] Validar cadenas no vacías.
- [x] Validar longitudes mínimas.
- [x] Validar números positivos y no negativos.
- [x] Validar fechas ISO.
- [x] Validar emails y teléfonos internacionales.
- [x] Validar ubicaciones de Los Ángeles y Zaragoza.
- [x] Validar paquetes y pesos facturables.
- [x] Validar direcciones.
- [x] Validar servicios logísticos.
- [x] Validar leads comerciales.

Implementación: `src/utils/validations.ts`.

## 5. Utilidades de colecciones

- [x] `uniqueBy` para eliminar duplicados por clave.
- [x] `groupBy` para agrupar elementos por categoría.
- [x] `sortBy` para ordenar arrays con distintos criterios.
- [x] `filterBy` para filtrar arrays mediante predicados.

Implementación: `src/utils/collections.ts`.

## 6. Funciones de búsqueda

- [x] Implementar búsqueda lineal con `linearSearch`.
- [x] Implementar búsqueda binaria con `binarySearch`.
- [x] Mantener la búsqueda binaria basada en un comparador y un array ordenado.

Implementación: `src/utils/search.ts`.

## 7. Tasación y transformaciones

- [x] Calcular peso volumétrico.
- [x] Calcular peso facturable.
- [x] Obtener el último checkpoint.
- [x] Derivar el estado público del manifiesto.
- [x] Calcular descuentos porcentuales y fijos.
- [x] Calcular el total de una cotización.

## 8. Agregaciones y reportes

- [x] `countBy` para contar elementos por categoría.
- [x] `sumBy` para calcular totales.
- [x] `averageBy` para calcular promedios.
- [x] `maxBy` para obtener máximos.
- [x] `minBy` para obtener mínimos.
- [x] `createShipmentReport` para resumir manifiestos por estado.
- [x] `createPackageWeightReport` para resumir pesos de paquetes.

Implementación: `src/utils/transformations.ts`.

## 9. Demo y ejecución

- [x] Crear `src/demo.ts`.
- [x] Simular el recorrido Los Ángeles → Zaragoza.
- [x] Mostrar peso volumétrico y peso facturable.
- [x] Mostrar el último checkpoint.
- [x] Mostrar el estado público del envío.
- [x] Mantener el demo independiente de la interfaz visual.

## 10. Configuración y validación técnica

- [x] Añadir `tsconfig.json`.
- [x] Instalar `typescript` y `tsx`.
- [x] Añadir el script `npm run typecheck`.
- [x] Ejecutar `npm run typecheck` correctamente.
- [x] Ejecutar `npx tsc --noEmit` correctamente.
- [x] Ejecutar `npx tsx src/demo.ts` correctamente.
- [x] Ejecutar `git diff --check` correctamente.
- [x] Mantener el servidor HTTP estático separado de estos scripts.

## 11. Documentación y Git

- [x] Crear `entidades.md` con entidades, propiedades y reglas.
- [x] Ignorar `node_modules/` en `.gitignore`.
- [x] Publicar el primer bloque en `feature/domain-models`.
- [x] Commit publicado: `434294a feat: add TrackFlow domain model and utilities`.
- [ ] Crear un nuevo commit con las últimas agregaciones y `filterBy`.
- [ ] Subir ese nuevo commit a `origin/feature/domain-models`.

## Archivos principales

- `entidades.md`
- `src/types/models.ts`
- `src/utils/validations.ts`
- `src/utils/collections.ts`
- `src/utils/search.ts`
- `src/utils/transformations.ts`
- `src/demo.ts`
- `tsconfig.json`
