'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Candidate, CandidateStatus, CandidateStage } from '@/types/candidate';

interface DetailHeaderProps {
  candidate: Candidate;
  onStatusChange: (status: CandidateStatus) => Promise<void>;
  onStageChange: (stage: CandidateStage) => Promise<void>;
  onEdit: () => void;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  candidate,
  onStatusChange,
  onStageChange,
  onEdit,
}) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingStage, setIsUpdatingStage] = useState(false);

  const handleStatusSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setIsUpdatingStatus(true);
      await onStatusChange(e.target.value as CandidateStatus);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleStageSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setIsUpdatingStage(true);
      await onStageChange(e.target.value as CandidateStage);
    } finally {
      setIsUpdatingStage(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            ← Volver al Pipeline general
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {candidate.full_name}
            </h1>
            <button
              onClick={onEdit}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Editar datos
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Postulación a <span className="font-semibold text-slate-700">{candidate.position}</span> · {candidate.experience_years} años de experiencia
          </p>
        </div>

        {/* Controles de cambio en un clic */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Selector de Estado */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Estado Actual (PATCH)
            </label>
            <div className="relative">
              <select
                value={candidate.status}
                disabled={isUpdatingStatus}
                onChange={handleStatusSelect}
                className="text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer disabled:opacity-50"
              >
                <option value="received">Recibida</option>
                <option value="in_progress">En Proceso</option>
                <option value="selected">Seleccionado</option>
                <option value="discarded">Descartado</option>
              </select>
              {isUpdatingStatus && (
                <span className="absolute right-2 top-2.5 text-[10px] text-indigo-600 animate-spin">
                  ⏳
                </span>
              )}
            </div>
          </div>

          {/* Selector de Etapa */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Etapa del Proceso (PATCH)
            </label>
            <div className="relative">
              <select
                value={candidate.stage}
                disabled={isUpdatingStage}
                onChange={handleStageSelect}
                className="text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer disabled:opacity-50"
              >
                <option value="pending">Pendiente</option>
                <option value="review">Revisión CV</option>
                <option value="personal_interview">Entrevista Personal</option>
                <option value="technical_interview">Entrevista Técnica</option>
                <option value="offer_presented">Oferta Presentada</option>
              </select>
              {isUpdatingStage && (
                <span className="absolute right-2 top-2.5 text-[10px] text-indigo-600 animate-spin">
                  ⏳
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
