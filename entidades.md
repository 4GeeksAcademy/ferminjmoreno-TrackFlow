# Entidades de dominio de TrackFlow

## Alcance confirmado

TrackFlow opera exclusivamente entre el hub de Los Angeles, Estados Unidos, y el hub de Zaragoza, Espana. Mexico queda fuera del dominio.

La primera version modela captacion comercial, tasacion logistica y trazabilidad operativa. No incluye todavia pedidos, facturacion, inventario ni usuarios internos como entidades persistentes.

## Convenciones de nombres

- `PascalCase`: interfaces y tipos (`Company`, `ShipmentManifest`, `Checkpoint`).
- `camelCase`: propiedades, funciones y variables (`companyName`, `calculateBillableWeight`).
- Uniones literales: estados y catalogos controlados (`'inTransit' | 'delivered'`).
- Identificadores: `string` no vacio; el formato concreto queda abierto.
- Fechas: cadenas ISO 8601 con zona horaria (`string`); se evitara `Date` en los contratos serializables.

## Entidades iniciales

### `Company`

Empresa cliente que solicita servicios de TrackFlow.

| Propiedad            | Tipo                 | Validacion                                               |
| -------------------- | -------------------- | -------------------------------------------------------- |
| `id`                 | `EntityId`           | Obligatorio y no vacio.                                  |
| `name`               | `string`             | Obligatorio, minimo 2 caracteres tras recortar espacios. |
| `website`            | `string`             | Opcional; URL valida si se informa.                      |
| `operatingCountries` | `OperatingCountry[]` | Al menos un pais; solo `US` o `ES`.                      |
| `productType`        | `ProductType`        | Obligatorio y perteneciente al catalogo.                 |
| `monthlyVolume`      | `MonthlyVolume`      | Obligatorio y perteneciente al catalogo.                 |
| `createdAt`          | `IsoDateString`      | Obligatorio y fecha ISO valida.                          |

### `Contact`

Persona asociada a una empresa cliente.

| Propiedad   | Tipo       | Validacion                                        |
| ----------- | ---------- | ------------------------------------------------- |
| `id`        | `EntityId` | Obligatorio y no vacio.                           |
| `companyId` | `EntityId` | Obligatorio.                                      |
| `fullName`  | `string`   | Debe contener nombre y apellido.                  |
| `email`     | `string`   | Email corporativo valido.                         |
| `phone`     | `string`   | Debe incluir codigo de pais y al menos 7 digitos. |

### `Lead`

Solicitud comercial recibida desde el formulario de TrackFlow.

| Propiedad          | Tipo               | Validacion                       |
| ------------------ | ------------------ | -------------------------------- |
| `id`               | `EntityId`         | Obligatorio y no vacio.          |
| `companyId`        | `EntityId`         | Obligatorio.                     |
| `contactId`        | `EntityId`         | Obligatorio.                     |
| `serviceIds`       | `EntityId[]`       | Al menos un servicio solicitado. |
| `current3plStatus` | `Current3plStatus` | `yes`, `no` o `evaluating`.      |
| `comments`         | `string`           | Opcional; maximo 500 caracteres. |
| `privacyAccepted`  | `boolean`          | Debe ser `true`.                 |
| `status`           | `LeadStatus`       | Estado comercial controlado.     |
| `createdAt`        | `IsoDateString`    | Fecha ISO valida.                |

### `LogisticService`

Servicio que TrackFlow ofrece y que puede ser solicitado en un lead o cotizacion.

| Propiedad     | Tipo          | Validacion                                             |
| ------------- | ------------- | ------------------------------------------------------ |
| `id`          | `EntityId`    | Obligatorio y no vacio.                                |
| `type`        | `ServiceType` | `storageFulfillment`, `lastMile` o `reverseLogistics`. |
| `name`        | `string`      | Obligatorio y no vacio.                                |
| `description` | `string`      | Obligatoria y no vacia.                                |
| `isActive`    | `boolean`     | Obligatorio.                                           |

### `Address`

Direccion postal asociada a un punto operativo o cliente.

| Propiedad         | Tipo               | Validacion                                |
| ----------------- | ------------------ | ----------------------------------------- |
| `id`              | `EntityId`         | Obligatorio y no vacio.                   |
| `addressLine1`    | `string`           | Obligatoria y no vacia.                   |
| `addressLine2`    | `string`           | Opcional; si existe no puede estar vacia. |
| `city`            | `string`           | Obligatoria.                              |
| `stateOrProvince` | `string`           | Opcional.                                 |
| `country`         | `OperatingCountry` | Solo `US` o `ES`.                         |
| `postalCode`      | `string`           | Obligatorio y no vacio.                   |

### `Carrier`

Transportista que participa en uno o varios tramos logisticos.

| Propiedad          | Tipo                 | Validacion                                    |
| ------------------ | -------------------- | --------------------------------------------- |
| `id`               | `EntityId`           | Obligatorio y no vacio.                       |
| `name`             | `CarrierName`        | Uno de `UPS`, `FedEx`, `DHL`, `MRW` o `SEUR`. |
| `coveredCountries` | `OperatingCountry[]` | Al menos un pais cubierto.                    |
| `isActive`         | `boolean`            | Obligatorio.                                  |

### `Location`

Ubicacion de un hub o punto de trazabilidad.

| Propiedad | Tipo               | Validacion                                       |
| --------- | ------------------ | ------------------------------------------------ |
| `id`      | `EntityId`         | Obligatorio y no vacio.                          |
| `name`    | `string`           | Obligatorio.                                     |
| `city`    | `LocationCity`     | Solo `Los Angeles` o `Zaragoza` en esta version. |
| `country` | `OperatingCountry` | Debe corresponder con la ciudad.                 |
| `type`    | `LocationType`     | `hub`, `customer` o `checkpoint`.                |

### `Package`

Unidad fisica incluida en un manifiesto y usada para la tasacion.

| Propiedad                         | Tipo       | Validacion                                          |
| --------------------------------- | ---------- | --------------------------------------------------- |
| `id`                              | `EntityId` | Obligatorio y no vacio.                             |
| `weightKg`                        | `number`   | Mayor que cero.                                     |
| `lengthCm`, `widthCm`, `heightCm` | `number`   | Mayores que cero.                                   |
| `volumetricWeightKg`              | `number`   | Igual a volumen dividido por el factor configurado. |
| `billableWeightKg`                | `number`   | Mayor o igual que peso real y volumetrico.          |
| `quantity`                        | `number`   | Entero positivo.                                    |

### `ShipmentManifest`

Representacion principal del envio que TrackFlow gestiona y comunica al cliente.

| Propiedad               | Tipo                   | Validacion                                      |
| ----------------------- | ---------------------- | ----------------------------------------------- |
| `id`                    | `EntityId`             | Obligatorio y no vacio.                         |
| `reference`             | `string`               | Obligatoria y unica dentro de TrackFlow.        |
| `companyId`             | `EntityId`             | Obligatorio.                                    |
| `contactId`             | `EntityId`             | Obligatorio.                                    |
| `originLocationId`      | `EntityId`             | Obligatorio.                                    |
| `destinationLocationId` | `EntityId`             | Obligatorio y diferente del origen.             |
| `packageIds`            | `EntityId[]`           | Al menos un paquete.                            |
| `carrierId`             | `EntityId`             | Obligatorio.                                    |
| `publicStatus`          | `PublicShipmentStatus` | Debe corresponder al ultimo checkpoint visible. |
| `estimatedDeliveryAt`   | `IsoDateString`        | Fecha ISO; no puede ser anterior a `createdAt`. |
| `createdAt`             | `IsoDateString`        | Obligatorio y fecha ISO valida.                 |

### `Checkpoint`

Registro interno de la traza operativa del manifiesto. Puede o no generar informacion visible para el cliente.

| Propiedad             | Tipo                       | Validacion                                         |
| --------------------- | -------------------------- | -------------------------------------------------- |
| `id`                  | `EntityId`                 | Obligatorio y no vacio.                            |
| `manifestId`          | `EntityId`                 | Obligatorio.                                       |
| `status`              | `InternalCheckpointStatus` | Obligatorio y perteneciente al catalogo.           |
| `locationId`          | `EntityId`                 | Obligatorio.                                       |
| `occurredAt`          | `IsoDateString`            | Obligatorio.                                       |
| `carrierId`           | `EntityId`                 | Opcional cuando el evento es interno de TrackFlow. |
| `notes`               | `string`                   | Opcional; maximo 500 caracteres.                   |
| `isVisibleToCustomer` | `boolean`                  | Obligatorio.                                       |

### `Quote`

Resultado de una tasacion para un manifiesto o solicitud logistica.

| Propiedad          | Tipo            | Validacion                                  |
| ------------------ | --------------- | ------------------------------------------- |
| `id`               | `EntityId`      | Obligatorio y no vacio.                     |
| `manifestId`       | `EntityId`      | Obligatorio.                                |
| `serviceType`      | `ServiceType`   | Obligatorio.                                |
| `billableWeightKg` | `number`        | Mayor que cero.                             |
| `baseAmount`       | `Money`         | No negativo.                                |
| `discounts`        | `Discount[]`    | Cada descuento debe ser valido.             |
| `surcharges`       | `Money[]`       | No negativos.                               |
| `totalAmount`      | `Money`         | No negativo y consistente con el desglose.  |
| `validUntil`       | `IsoDateString` | Fecha ISO posterior a la fecha de creacion. |

### `Rate`

Regla tarifaria aplicable a un transportista, servicio, origen, destino y rango de peso.

| Propiedad                             | Tipo               | Validacion                                            |
| ------------------------------------- | ------------------ | ----------------------------------------------------- |
| `id`                                  | `EntityId`         | Obligatorio y no vacio.                               |
| `carrierId`                           | `EntityId`         | Obligatorio.                                          |
| `serviceType`                         | `ServiceType`      | Obligatorio.                                          |
| `originCountry`, `destinationCountry` | `OperatingCountry` | Solo `US` o `ES`; deben ser diferentes.               |
| `minWeightKg`, `maxWeightKg`          | `number`           | No negativos; el maximo debe ser mayor que el minimo. |
| `baseAmount`                          | `Money`            | No negativo.                                          |
| `validFrom`, `validUntil`             | `IsoDateString`    | Rango de vigencia valido.                             |

### `Discount`

Reduccion aplicable al precio base de una cotizacion.

| Propiedad | Tipo           | Validacion                                |
| --------- | -------------- | ----------------------------------------- |
| `id`      | `EntityId`     | Obligatorio y no vacio.                   |
| `type`    | `DiscountType` | `percentage` o `fixedAmount`.             |
| `value`   | `number`       | Mayor que cero; porcentaje entre 0 y 100. |
| `reason`  | `string`       | Obligatoria y no vacia.                   |

### `Incident`

Evento anomalo que afecta a un manifiesto sin borrar su historial de checkpoints.

| Propiedad             | Tipo             | Validacion                            |
| --------------------- | ---------------- | ------------------------------------- |
| `id`                  | `EntityId`       | Obligatorio y no vacio.               |
| `manifestId`          | `EntityId`       | Obligatorio.                          |
| `type`                | `IncidentType`   | Obligatorio.                          |
| `description`         | `string`         | Obligatoria; maximo 500 caracteres.   |
| `status`              | `IncidentStatus` | `open`, `investigating` o `resolved`. |
| `occurredAt`          | `IsoDateString`  | Obligatorio.                          |
| `isVisibleToCustomer` | `boolean`        | Obligatorio.                          |

## Reglas de dominio transversales

- Los unicos paises operativos son `US` y `ES`.
- Los hubs iniciales son Los Angeles y Zaragoza.
- El estado publico del manifiesto se deriva del ultimo checkpoint marcado como visible.
- Los checkpoints son historicos: no se actualizan para corregir la traza; se registra un nuevo evento.
- El peso facturable es el mayor entre el peso real y el peso volumetrico.
- Una cotizacion conserva el desglose de tarifa, descuentos y recargos; no solo el total.
- Un transportista puede participar en varios manifiestos, pero un manifiesto debe tener al menos un transportista asignado.

## Entidades añadidas al primer alcance

El modelo inicial incluye 14 entidades: `Company`, `Contact`, `Lead`, `LogisticService`, `Address`, `Carrier`, `Location`, `Package`, `ShipmentManifest`, `Checkpoint`, `Quote`, `Rate`, `Discount` e `Incident`.

## Fuera del primer alcance

Pedidos, clientes finales, inventario, devoluciones, facturacion, contratos, usuarios internos y reglas de impuestos quedan pendientes de confirmacion.
