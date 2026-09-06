export const Hero = () => `
  <section class="relative overflow-hidden py-20 lg:py-28 text-white bg-primary-navy">
    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#3b82f6,transparent_35%),radial-gradient(circle_at_80%_80%,#10b981,transparent_35%)]" aria-hidden="true"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="space-y-6 lg:col-span-7">
        <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wide border border-white/10">Logistica binacional USA - Espana</p>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Logistica que escala con tu e-commerce</h1>
        <p class="text-lg text-slate-300 max-w-2xl">Gestion de almacenes, ultima milla y devoluciones en Estados Unidos y Espana para marcas que necesitan crecer sin friccion operativa.</p>
        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <a href="#contact" class="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-lg bg-secondary-emerald text-white hover:bg-emerald-700 transition-smooth shadow-lg">Solicitar informacion</a>
          <a href="#services" class="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-lg border border-slate-600 text-slate-200 hover:text-white hover:border-slate-400 transition-smooth">Conocer servicios</a>
        </div>
      </div>
      <aside class="hero-right-panel lg:col-span-5 rounded-2xl p-6 bg-slate-900/80 border border-slate-800 shadow-2xl">
        <div class="mb-4 flex items-center justify-between">
          <p class="text-xs font-mono text-slate-400">TRACKING SERVICE: ACTIVE</p>
          <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
        </div>
        <div class="space-y-3">
          <div class="hero-right-card p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-emerald-300 font-mono text-xs px-2 py-1 rounded bg-emerald-300/10">LAX</span>
              <div>
                <h3 class="text-sm font-semibold">Centro Los Angeles</h3>
                <p class="text-xs text-slate-400">Cobertura nacional USA</p>
              </div>
            </div>
            <span class="text-emerald-400 font-mono text-xs">99.8%</span>
          </div>
          <div class="hero-right-card p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-blue-300 font-mono text-xs px-2 py-1 rounded bg-blue-300/10">ZAZ</span>
              <div>
                <h3 class="text-sm font-semibold">Centro Zaragoza</h3>
                <p class="text-xs text-slate-400">Cobertura Europa</p>
              </div>
            </div>
            <span class="text-blue-400 font-mono text-xs">99.9%</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
`;
