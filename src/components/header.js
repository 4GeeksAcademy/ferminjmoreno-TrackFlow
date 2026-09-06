export const Header = () => `
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-3 focus:bg-secondary-emerald focus:text-white focus:rounded-lg focus:font-semibold">
    Saltar al contenido principal
  </a>

  <header class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-smooth">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-2" aria-label="TrackFlow inicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" class="h-12 sm:h-14 w-auto transition-smooth" aria-hidden="true">
          <g stroke-linecap="round" stroke-linejoin="round">
            <path d="M5,24 C5,39 45,39 45,24 M37,16 L45,24 L37,32" stroke="#2563EB" stroke-width="4.5" fill="none" />
            <polygon points="25,9 37,15 25,21 13,15" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
            <polygon points="13,15 13,32 25,38 25,21" fill="#F1F5F9" stroke="#059669" stroke-width="2" />
            <polygon points="25,21 25,38 37,32 37,15" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
            <line x1="19" y1="12" x2="31" y2="18" stroke="#2563EB" stroke-width="2" />
            <line x1="25" y1="21" x2="25" y2="38" stroke="#2563EB" stroke-width="2" />
            <polygon points="28,24 33,26 33,29 28,27" fill="#059669" stroke="none" />
          </g>
          <text x="52" y="33" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="21" fill="#0F172A">
            Track<tspan fill="#059669">Flow</tspan>
          </text>
        </svg>
      </a>

      <nav class="hidden md:flex items-center gap-8" aria-label="Navegacion principal">
        <a href="#services" class="text-sm font-medium text-slate-600 hover:text-primary-navy transition-colors">Servicios</a>
        <a href="#coverage" class="text-sm font-medium text-slate-600 hover:text-primary-navy transition-colors">Cobertura</a>
        <a href="#why-us" class="text-sm font-medium text-slate-600 hover:text-primary-navy transition-colors">Por que TrackFlow</a>
        <a href="#contact" class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-secondary-emerald text-white hover:bg-emerald-700 transition-colors shadow-sm">Solicitar info</a>
      </nav>

      <button id="hamburger-btn" type="button" class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100" aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menu">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" id="hamburger-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" id="close-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white" aria-label="Navegacion movil">
      <div class="px-4 pt-2 pb-4 space-y-1">
        <a href="#services" class="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-navy transition-colors">Servicios</a>
        <a href="#coverage" class="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-navy transition-colors">Cobertura</a>
        <a href="#why-us" class="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-navy transition-colors">Por que TrackFlow</a>
        <a href="#contact" class="block w-full text-center px-4 py-2.5 mt-2 rounded-lg bg-secondary-emerald text-white text-base font-semibold hover:bg-emerald-700 transition-colors shadow-sm">Solicitar info</a>
      </div>
    </nav>
  </header>
`;
