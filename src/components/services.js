const cards = [
  {
    title: 'Gestion de almacenes',
    body: 'Almacenamiento, picking y packing con inventario en tiempo real desde hubs en Los Angeles y Zaragoza.',
    tag: 'Moda, electronica y cosmetica',
    image: '/src/assets/cards/warehouse.svg',
    alt: 'Gestion de almacenes',
  },
  {
    title: 'Entregas de ultima milla',
    body: 'Integracion con carriers certificados y seguimiento unificado para reducir incidencias de transporte.',
    tag: 'Carriers auditados',
    image: '/src/assets/cards/last-mile.svg',
    alt: 'Entregas de ultima milla',
  },
  {
    title: 'Logistica inversa',
    body: 'Devoluciones automatizadas, inspeccion, reacondicionamiento y reingreso a stock con API directa.',
    tag: 'Operacion automatizada',
    image: '/src/assets/cards/returns.svg',
    alt: 'Logistica inversa',
  },
];

export const Services = () => `
  <section id="services" class="py-20 lg:py-28 bg-white" aria-labelledby="services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <h2 id="services-heading" class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-title">Servicios logisticos especializados</h2>
        <p class="text-base sm:text-lg text-neutral-text">Soluciones modulares para acelerar operaciones de e-commerce en dos continentes.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${cards
          .map(
            (card) => `
          <article class="bg-neutral-bg p-8 rounded-2xl border border-slate-200/80 card-shadow card-shadow-hover flex flex-col justify-between gap-4">
            <img src="${card.image}" alt="${card.alt}" class="w-12 h-12 object-contain" loading="lazy" />
            <h3 class="text-xl font-bold text-neutral-title">${card.title}</h3>
            <p class="text-sm leading-relaxed text-neutral-text">${card.body}</p>
            <span class="text-xs font-semibold text-accent-blue uppercase tracking-wider">${card.tag}</span>
          </article>
        `,
          )
          .join('')}
      </div>
    </div>
  </section>
`;
