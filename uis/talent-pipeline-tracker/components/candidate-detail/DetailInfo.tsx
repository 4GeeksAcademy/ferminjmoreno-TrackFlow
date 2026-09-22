import React from 'react';
import { Candidate } from '@/types/candidate';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StageBadge } from '@/components/ui/StageBadge';

interface DetailInfoProps {
  candidate: Candidate;
}

export const DetailInfo: React.FC<DetailInfoProps> = ({ candidate }) => {
  const formatDate = (isoString?: string) => {
    if (!isoString) return 'No registrada';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
        Información de la Candidatura
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Correo Electrónico</span>
          <a
            href={`mailto:${candidate.email}`}
            className="font-semibold text-indigo-600 hover:text-indigo-800 break-all"
          >
            {candidate.email}
          </a>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Teléfono de Contacto</span>
          <a
            href={`tel:${candidate.phone}`}
            className="font-semibold text-slate-800 hover:text-indigo-600"
          >
            {candidate.phone}
          </a>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Años de Experiencia</span>
          <span className="font-semibold text-slate-800">
            {candidate.experience_years} {candidate.experience_years === 1 ? 'año' : 'años'}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">Estado y Etapa Actual</span>
          <div className="flex items-center gap-2">
            <StatusBadge status={candidate.status} />
            <StageBadge stage={candidate.stage} />
          </div>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Perfil de LinkedIn</span>
          {candidate.linkedin_url ? (
            <a
              href={candidate.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-xs"
            >
              <span>Ver perfil en LinkedIn</span>
              <span>↗</span>
            </a>
          ) : (
            <span className="text-slate-400 text-xs italic">No proporcionado</span>
          )}
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Currículum Vitae</span>
          {candidate.cv_url ? (
            <a
              href={candidate.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-xs"
            >
              <span>Descargar / Ver CV</span>
              <span>↗</span>
            </a>
          ) : (
            <span className="text-slate-400 text-xs italic">No adjuntado</span>
          )}
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Fecha de Postulación</span>
          <span className="font-medium text-slate-600 text-xs">
            {formatDate(candidate.applied_at)}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Última Actualización</span>
          <span className="font-medium text-slate-600 text-xs">
            {formatDate(candidate.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
};
