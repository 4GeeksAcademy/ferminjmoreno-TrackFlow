import React from 'react';
import Link from 'next/link';
import { Candidate } from '@/types/candidate';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StageBadge } from '@/components/ui/StageBadge';

interface CandidateRowProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
}

export const CandidateRow: React.FC<CandidateRowProps> = ({
  candidate,
  onEdit,
}) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
      {/* Nombre y Contacto */}
      <td className="py-4 px-4 sm:px-6">
        <Link
          href={`/candidates/${candidate.id}`}
          className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors block text-sm"
        >
          {candidate.full_name}
        </Link>
        <span className="text-xs text-slate-500 block truncate max-w-[200px]">
          {candidate.email}
        </span>
      </td>

      {/* Puesto y Experiencia */}
      <td className="py-4 px-4 text-sm text-slate-700">
        <div className="font-medium text-slate-800 text-xs sm:text-sm">
          {candidate.position}
        </div>
        <div className="text-[11px] text-slate-500">
          {candidate.experience_years} {candidate.experience_years === 1 ? 'año' : 'años'} exp.
        </div>
      </td>

      {/* Estado Actual */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge status={candidate.status} />
      </td>

      {/* Etapa Actual */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StageBadge stage={candidate.stage} />
      </td>

      {/* Notas */}
      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 text-center">
        <span className="inline-flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
          💬 {candidate.notes_count || 0}
        </span>
      </td>

      {/* Acciones */}
      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap space-x-2">
        <button
          onClick={() => onEdit(candidate)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
        >
          Editar
        </button>
        <Link
          href={`/candidates/${candidate.id}`}
          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          Ver Ficha →
        </Link>
      </td>
    </tr>
  );
};
