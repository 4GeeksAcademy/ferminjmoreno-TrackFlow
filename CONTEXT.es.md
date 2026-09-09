# Contexto de TrackFlow

## Identidad

- **Nombre:** TrackFlow
- **Tipo de empresa:** operador logístico especializado en e-commerce.
- **Propuesta:** ayudar a tiendas online a almacenar productos y gestionar sus envíos entre Estados Unidos y España desde una operación logística coordinada.
- **Sitio:** `https://trackflow.com/` (URL de ejemplo hasta confirmar el dominio de producción).
- **Idioma principal del sitio:** español.
- **Tono:** profesional, claro, directo y orientado a resultados operativos. Evitar promesas absolutas o lenguaje técnico innecesario.

## Cobertura y operación

- **Estados Unidos:** hub en Los Ángeles, con cobertura nacional mediante acuerdos de transporte.
- **España:** hub en Zaragoza, con cobertura peninsular e insular.
- **Servicios de transporte mencionados en la web:** UPS, FedEx, DHL, MRW y SEUR.
- La información de teléfonos, email, acuerdos y URLs del sitio es demostrativa y debe verificarse antes de una publicación comercial.

## Servicios

1. **Almacenaje y fulfillment:** recepción, almacenamiento y preparación de pedidos para e-commerce.
2. **Última milla:** entrega del pedido al cliente final mediante la red de transporte disponible en cada región.
3. **Logística inversa:** gestión de devoluciones y reintegros de mercancía.

## Audiencia y objetivo del sitio

El sitio está dirigido a empresas de e-commerce que necesitan externalizar o mejorar su operación logística entre Estados Unidos y España. Su objetivo principal es captar solicitudes de información cualificadas mediante el formulario de contacto.

## Formulario de contacto

El formulario usa estos nombres de campo:

| Campo                  | Nombre                | Requerido | Restricción                                 |
| ---------------------- | --------------------- | --------- | ------------------------------------------- |
| Empresa                | `company_name`        | Sí        | Mínimo 2 caracteres                         |
| Persona de contacto    | `contact_person`      | Sí        | Mínimo 2 caracteres                         |
| Email corporativo      | `contact_email`       | Sí        | Formato de email válido                     |
| Teléfono               | `contact_phone`       | Sí        | Mínimo 7 caracteres                         |
| Sitio web              | `company_website`     | No        | URL válida si se proporciona                |
| País de operación      | `company_country`     | Sí        | `US`, `ES` o `BOTH`                         |
| Tipo de producto       | `product_type`        | Sí        | `moda`, `electronica`, `cosmetica` u `otro` |
| Volumen mensual        | `monthly_volume`      | Sí        | `0-100`, `101-500`, `501-2000` o `2000+`    |
| Servicios de interés   | `services`            | Sí        | Al menos una opción                         |
| Otro operador 3PL      | `current_3pl`         | Sí        | `si`, `no` o `evaluando`                    |
| Comentarios            | `additional_comments` | No        | Máximo 500 caracteres                       |
| Política de privacidad | `privacy_agreement`   | Sí        | Debe estar aceptada                         |

La validación se ejecuta al escribir, al perder el foco, al cambiar controles y al enviar. Los errores deben ser comprensibles, accesibles y no deben exponer datos personales en logs públicos.

## SEO y accesibilidad

- El título y la descripción deben mencionar TrackFlow, logística para e-commerce y la cobertura Estados Unidos-España sin repetir palabras de forma artificial.
- Mantener `lang="es"`, URL canónica, Open Graph y datos estructurados coherentes con la identidad de TrackFlow.
- Todos los controles del formulario deben tener `label` asociado, mensajes de error vinculados mediante `aria-describedby` y estado `aria-invalid` actualizado durante la validación.
- Los elementos decorativos deben permanecer ocultos para lectores de pantalla con `aria-hidden="true"`.

## Restricciones del proyecto

- Mantener la implementación frontend en `src/` y respetar los componentes existentes.
- Usar JavaScript modular compatible con Vite.
- No presentar como reales los teléfonos, acuerdos, URLs o métricas que todavía sean datos de ejemplo.
- No añadir servicios, sedes o funcionalidades que no estén respaldados por este contexto o por una decisión documentada del proyecto.
