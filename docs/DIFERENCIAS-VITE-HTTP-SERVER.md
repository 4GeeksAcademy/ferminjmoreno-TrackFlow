# Diferencias entre Vite y http-server

## Comandos de ejecución

| Aspecto     | Vite                                                      | http-server                            |
| ----------- | --------------------------------------------------------- | -------------------------------------- |
| **Comando** | `node ./node_modules/vite/bin/vite.js --port 3001 --host` | `npx http-server . -p 3000 -a 0.0.0.0` |
| **URL**     | `http://localhost:3001/`                                  | `http://localhost:3000/`               |

## Diferencias técnicas

| Característica                                     | Vite                               | http-server                             |
| -------------------------------------------------- | ---------------------------------- | --------------------------------------- |
| **Procesa Tailwind CSS** (`@import "tailwindcss"`) | ✅ Sí, mediante PostCSS            | ❌ No. Requiere Tailwind CDN en el HTML |
| **Hot Reload** (recarga automática al editar)      | ✅ Sí                              | ❌ No. Hay que recargar manualmente     |
| **Módulos JS (type="module")**                     | ✅ Soporte nativo                  | ✅ También soporta                      |
| **Tipo de servidor**                               | Servidor de desarrollo con bundler | Servidor estático simple                |
| **Ideal para**                                     | Desarrollo activo con Tailwind v4  | Producción o demos sin procesamiento    |
| **Dependencias necesarias**                        | Vite + Tailwind CSS instalados     | Ninguna (usa npx)                       |
| **Complejidad**                                    | Media (necesita configuración)     | Baja (un solo comando)                  |

## Resumen

- **Vite** es más potente para desarrollo porque procesa Tailwind CSS v4, recarga automática y maneja módulos ES.
- **http-server** es más simple pero requiere usar Tailwind mediante CDN externo (`cdn.tailwindcss.com`), lo que significa modificar el `index.html` para eliminar el `@import` y agregar el script del CDN.
