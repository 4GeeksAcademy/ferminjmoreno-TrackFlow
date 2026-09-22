'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Candidate, CandidateCreate } from '@/types/candidate';
import {
  getCandidates,
  createCandidate,
  updateCandidate,
} from '@/lib/api';
import { Navbar } from '@/components/ui/Navbar';
import { CandidateFilters } from '@/components/candidates/CandidateFilters';
import { CandidateTable } from '@/components/candidates/CandidateTable';
import { CandidateModal } from '@/components/candidates/CandidateModal';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { FeedbackToast } from '@/components/ui/FeedbackToast';

function CandidatePipelineContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') || '';
  const stageParam = searchParams.get('stage') || '';
  const searchParam = searchParams.get('search') || '';

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadCandidates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getCandidates({
        status: statusParam || undefined,
        stage: stageParam || undefined,
        search: searchParam || undefined,
        limit: 100, // Cargar amplio para el pipeline de Zaragoza
      });
      setCandidates(res.data || []);
      setTotalCount(res.total || (res.data ? res.data.length : 0));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con la API de candidaturas';
      setError(msg);
      showToast('error', msg);
    } finally {
      setIsLoading(false);
    }
  }, [statusParam, stageParam, searchParam]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  const handleOpenCreate = () => {
    setEditingCandidate(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleSaveCandidate = async (data: CandidateCreate, id?: string) => {
    try {
      if (id) {
        const updated = await updateCandidate(id, data);
        setCandidates((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
        );
        showToast('success', `Candidatura de "${data.full_name}" actualizada con éxito.`);
      } else {
        const created = await createCandidate(data);
        setCandidates((prev) => [created, ...prev]);
        setTotalCount((prev) => prev + 1);
        showToast('success', `Candidatura de "${data.full_name}" registrada en el pipeline.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar la candidatura';
      showToast('error', msg);
      throw err;
    }
  };

  // Métricas rápidas
  const inProgressCount = candidates.filter((c) => c.status === 'in_progress').length;
  const selectedCount = candidates.filter((c) => c.status === 'selected').length;
  const discardedCount = candidates.filter((c) => c.status === 'discarded').length;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Navbar onNewCandidate={handleOpenCreate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Encabezado y Métricas */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Pipeline de Selección · Zaragoza
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Gestión centralizada de postulaciones para Asistente de Dirección
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white border border-slate-200/80 px-3 py-2 rounded-xl text-center shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total
              </span>
              <span className="text-base font-extrabold text-slate-800">{totalCount}</span>
            </div>
            <div className="bg-white border border-amber-200/80 px-3 py-2 rounded-xl text-center shadow-xs bg-amber-50/20">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                En Proceso
              </span>
              <span className="text-base font-extrabold text-amber-700">{inProgressCount}</span>
            </div>
            <div className="bg-white border border-emerald-200/80 px-3 py-2 rounded-xl text-center shadow-xs bg-emerald-50/20">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                Seleccionados
              </span>
              <span className="text-base font-extrabold text-emerald-700">{selectedCount}</span>
            </div>
            <div className="bg-white border border-rose-200/80 px-3 py-2 rounded-xl text-center shadow-xs bg-rose-50/20">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                Descartados
              </span>
              <span className="text-base font-extrabold text-rose-700">{discardedCount}</span>
            </div>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <CandidateFilters />

        {/* Estado Asíncrono de UI */}
        {isLoading ? (
          <LoadingState message="Consultando candidaturas en el backend de TrackFlow..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadCandidates} />
        ) : (
          <CandidateTable candidates={candidates} onEdit={handleOpenEdit} />
        )}
      </main>

      {/* Modal de Crear / Editar */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidateToEdit={editingCandidate}
        onSubmit={handleSaveCandidate}
      />

      {/* Toast de Feedback */}
      {toast && (
        <FeedbackToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function CandidatePipelinePage() {
  return (
    <Suspense fallback={<LoadingState message="Iniciando Talent Pipeline Tracker..." />}>
      <CandidatePipelineContent />
    </Suspense>
  );
}
