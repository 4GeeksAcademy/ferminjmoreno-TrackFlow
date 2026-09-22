'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const CandidateFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || '';
  const currentStage = searchParams.get('stage') || '';
  const currentSearch = searchParams.get('search') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reiniciar a página 1 al filtrar
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(currentStatus || currentStage || currentSearch);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
      {/* Campo de búsqueda reactiva */}
      <div className="flex-1 relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 1114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={currentSearch}
          onChange={(e) => updateParam('search', e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
        />
      </div>

      {/* Filtro de Estado */}
      <div className="w-full md:w-48">
        <select
          value={currentStatus}
          onChange={(e) => updateParam('status', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors text-slate-700 cursor-pointer"
        >
          <option value="">Todos los Estados</option>
          <option value="received">Recibida</option>
          <option value="in_progress">En Proceso</option>
          <option value="selected">Seleccionado</option>
          <option value="discarded">Descartado</option>
        </select>
      </div>

      {/* Filtro de Etapa */}
      <div className="w-full md:w-56">
        <select
          value={currentStage}
          onChange={(e) => updateParam('stage', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors text-slate-700 cursor-pointer"
        >
          <option value="">Todas las Etapas</option>
          <option value="pending">Pendiente</option>
          <option value="review">Revisión CV</option>
          <option value="personal_interview">Entrevista Personal</option>
          <option value="technical_interview">Entrevista Técnica</option>
          <option value="offer_presented">Oferta Presentada</option>
        </select>
      </div>

      {/* Botón limpiar */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};
