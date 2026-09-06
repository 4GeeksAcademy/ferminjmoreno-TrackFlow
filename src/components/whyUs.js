const points = [
  {
    title: 'Operacion binacional',
    text: 'Equipos propios y procesos estandarizados en USA y Espana.',
  },
  {
    title: 'Equipo experto',
    text: 'Especialistas en fulfillment, transporte y mejora continua.',
  },
  {
    title: 'Tecnologia propia',
    text: 'Panel unico para inventario, pedidos y estados de entrega.',
  },
  {
    title: 'Verticales focus',
    text: 'Experiencia real en moda, tecnologia y cosmetica.',
  },
];

export const WhyUs = () => `
  <section id="why-us" class="py-20 lg:py-28 bg-white" aria-labelledby="why-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <h2 id="why-heading" class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-title">La ventaja de TrackFlow</h2>
        <p class="text-base sm:text-lg text-neutral-text">Marcas internacionales confian en un modelo operativo medible y escalable.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${points
          .map(
            (point) => `
          <article class="space-y-2">
            <h3 class="text-lg font-bold text-neutral-title">${point.title}</h3>
            <p class="text-sm text-neutral-text leading-relaxed">${point.text}</p>
          </article>
        `,
          )
          .join('')}
      </div>
    </div>
  </section>
`;
