import React from 'react';
import { Candidate } from '@/types/candidate';
import { CandidateRow } from './CandidateRow';

interface CandidateTableProps {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  onEdit,
}) => {
  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
        <div className="w-12 h-12 mx-auto mb-3 text-slate-300 flex items-center justify-center rounded-full bg-slate-100">
          🔍
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          No se encontraron candidaturas
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Intenta ajustar los filtros de búsqueda o registra un nuevo candidato en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Candidato / Contacto</th>
              <th className="py-3.5 px-4">Puesto / Exp.</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4">Etapa</th>
              <th className="py-3.5 px-4 text-center">Notas</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {candidates.map((candidate) => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
