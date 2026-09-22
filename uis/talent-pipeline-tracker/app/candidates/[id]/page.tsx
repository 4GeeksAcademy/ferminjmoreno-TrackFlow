'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  Candidate,
  CandidateNote,
  CandidateStatus,
  CandidateStage,
  CandidateCreate,
} from '@/types/candidate';
import {
  getCandidateById,
  getCandidateNotes,
  patchCandidate,
  updateCandidate,
  addCandidateNote,
  deleteCandidateNote,
} from '@/lib/api';
import { Navbar } from '@/components/ui/Navbar';
import { DetailHeader } from '@/components/candidate-detail/DetailHeader';
import { DetailInfo } from '@/components/candidate-detail/DetailInfo';
import { NotesSection } from '@/components/candidate-detail/NotesSection';
import { CandidateModal } from '@/components/candidates/CandidateModal';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { FeedbackToast } from '@/components/ui/FeedbackToast';

export default function CandidateDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal de edición de datos
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const [candData, notesData] = await Promise.all([
        getCandidateById(id),
        getCandidateNotes(id).catch(() => []),
      ]);
      setCandidate(candData);
      setNotes(notesData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al cargar la información del candidato';
      setError(msg);
      showToast('error', msg);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Actualización reactiva de estado (PATCH)
  const handleStatusChange = async (newStatus: CandidateStatus) => {
    if (!id || !candidate) return;
    try {
      const updated = await patchCandidate(id, { status: newStatus });
      setCandidate((prev) => (prev ? { ...prev, status: updated.status } : null));
      showToast('success', `Estado actualizado a "${newStatus}" con éxito.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar el estado';
      showToast('error', msg);
    }
  };

  // Actualización reactiva de etapa (PATCH)
  const handleStageChange = async (newStage: CandidateStage) => {
    if (!id || !candidate) return;
    try {
      const updated = await patchCandidate(id, { stage: newStage });
      setCandidate((prev) => (prev ? { ...prev, stage: updated.stage } : null));
      showToast('success', `Etapa actualizada a "${newStage}" con éxito.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar la etapa';
      showToast('error', msg);
    }
  };

  // Edición de datos generales (PUT)
  const handleSaveEdit = async (data: CandidateCreate) => {
    if (!id) return;
    try {
      const updated = await updateCandidate(id, data);
      setCandidate((prev) => (prev ? { ...prev, ...updated } : null));
      showToast('success', 'Datos del candidato actualizados correctamente.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar datos';
      showToast('error', msg);
      throw err;
    }
  };

  // Añadir nota (POST)
  const handleAddNote = async (content: string) => {
    if (!id) return;
    try {
      const newNote = await addCandidateNote(id, content);
      setNotes((prev) => [newNote, ...prev]);
      setCandidate((prev) => (prev ? { ...prev, notes_count: (prev.notes_count || 0) + 1 } : null));
      showToast('success', 'Nota interna registrada con éxito.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al añadir la nota';
      showToast('error', msg);
      throw err;
    }
  };

  // Eliminar nota (DELETE)
  const handleDeleteNote = async (noteId: string) => {
    if (!id) return;
    try {
      await deleteCandidateNote(id, noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      setCandidate((prev) =>
        prev ? { ...prev, notes_count: Math.max(0, (prev.notes_count || 1) - 1) } : null
      );
      showToast('success', 'Nota eliminada del historial.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al eliminar la nota';
      showToast('error', msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <LoadingState message="Cargando expediente del candidato..." />
        ) : error || !candidate ? (
          <ErrorMessage
            message={error || 'No se encontró la candidatura solicitada.'}
            onRetry={loadData}
          />
        ) : (
          <>
            <DetailHeader
              candidate={candidate}
              onStatusChange={handleStatusChange}
              onStageChange={handleStageChange}
              onEdit={() => setIsEditModalOpen(true)}
            />

            <DetailInfo candidate={candidate} />

            <NotesSection
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          </>
        )}
      </main>

      {/* Modal de edición */}
      {candidate && (
        <CandidateModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          candidateToEdit={candidate}
          onSubmit={handleSaveEdit}
        />
      )}

      {/* Toast Feedback */}
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
