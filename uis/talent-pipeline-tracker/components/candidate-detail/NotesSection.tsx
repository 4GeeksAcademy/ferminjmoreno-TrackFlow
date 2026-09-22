'use client';

import React, { useState } from 'react';
import { CandidateNote } from '@/types/candidate';

interface NotesSectionProps {
  notes: CandidateNote[];
  onAddNote: (content: string) => Promise<void>;
  onDeleteNote: (noteId: string) => Promise<void>;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Escribe el contenido de la nota antes de guardar.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onAddNote(content.trim());
      setContent('');
    } catch {
      setError('No se pudo guardar la nota.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!window.confirm('¿Confirmas que deseas eliminar esta nota de la candidatura?')) {
      return;
    }
    try {
      setDeletingId(noteId);
      await onDeleteNote(noteId);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Notas de Entrevistas y Seguimiento
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro interno para llamadas, impresiones y evaluaciones del equipo
          </p>
        </div>
        <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
          {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
        </span>
      </div>

      {/* Formulario para añadir nota */}
      <form onSubmit={handleAdd} className="mb-8">
        <div className="mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Añade notas de la llamada o entrevista (ej. 'Excelente comunicación, experiencia en ERP')..."
            rows={3}
            className="w-full p-3.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
          >
            {isSubmitting ? 'Guardando nota...' : '+ Añadir Nota'}
          </button>
        </div>
      </form>

      {/* Listado de notas */}
      {notes.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-xs text-slate-400 font-medium">
            No hay notas registradas para esta candidatura todavía.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
                <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                  {formatDate(note.created_at)}
                </span>
              </div>
              <button
                onClick={() => handleDelete(note.id)}
                disabled={deletingId === note.id}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
                title="Eliminar esta nota"
              >
                {deletingId === note.id ? 'Borrando...' : 'Eliminar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
