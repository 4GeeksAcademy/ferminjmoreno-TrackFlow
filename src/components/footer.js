export const Footer = () => `
  <footer class="bg-primary-navy text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div class="flex items-center gap-2" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="h-9 w-9 transition-smooth" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5,24 C5,39 45,39 45,24 M37,16 L45,24 L37,32" stroke="#94A3B8" stroke-width="4" fill="none" />
          <polygon points="25,9 37,15 25,21 13,15" fill="#334155" stroke="#94A3B8" stroke-width="2" />
          <polygon points="13,15 13,32 25,38 25,21" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />
          <polygon points="25,21 25,38 37,32 37,16" fill="#334155" stroke="#94A3B8" stroke-width="2" />
          <line x1="19" y1="12" x2="31" y2="18" stroke="#94A3B8" stroke-width="2" />
          <line x1="25" y1="21" x2="25" y2="38" stroke="#94A3B8" stroke-width="2" />
        </svg>
        <span class="font-semibold text-white">Track<span class="text-slate-500">Flow</span></span>
      </div>
      <p>&copy; 2026 TrackFlow. Todos los derechos reservados.</p>
      <nav class="flex items-center gap-4">
        <a href="#" class="hover:text-white transition-colors">Privacidad</a>
        <a href="#" class="hover:text-white transition-colors">Cookies</a>
      </nav>
    </div>
  </footer>
`;
