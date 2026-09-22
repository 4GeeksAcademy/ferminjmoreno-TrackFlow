import React from 'react';
import { CandidateStage } from '@/types/candidate';

interface StageBadgeProps {
  stage: CandidateStage;
}

const stageConfig: Record<
  CandidateStage,
  { label: string; bg: string; text: string }
> = {
  pending: {
    label: 'Pendiente',
    bg: 'bg-slate-100 border-slate-200',
    text: 'text-slate-700',
  },
  review: {
    label: 'Revisión CV',
    bg: 'bg-indigo-50 border-indigo-200',
    text: 'text-indigo-700',
  },
  personal_interview: {
    label: 'Entrevista Personal',
    bg: 'bg-purple-50 border-purple-200',
    text: 'text-purple-700',
  },
  technical_interview: {
    label: 'Entrevista Técnica',
    bg: 'bg-cyan-50 border-cyan-200',
    text: 'text-cyan-700',
  },
  offer_presented: {
    label: 'Oferta Presentada',
    bg: 'bg-teal-50 border-teal-200',
    text: 'text-teal-700',
  },
};

export const StageBadge: React.FC<StageBadgeProps> = ({ stage }) => {
  const config = stageConfig[stage] || {
    label: stage,
    bg: 'bg-gray-100 border-gray-200',
    text: 'text-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};
