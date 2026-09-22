'use client';

import React, { useState, useEffect } from 'react';
import { Candidate, CandidateCreate } from '@/types/candidate';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateToEdit?: Candidate | null;
  onSubmit: (data: CandidateCreate, id?: string) => Promise<void>;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  isOpen,
  onClose,
  candidateToEdit,
  onSubmit,
}) => {
  const isEditing = Boolean(candidateToEdit);

  const [formData, setFormData] = useState<CandidateCreate>({
    full_name: '',
    email: '',
    phone: '',
    position: 'Asistente de Dirección',
    experience_years: 0,
    linkedin_url: '',
    cv_url: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (candidateToEdit) {
      setFormData({
        full_name: candidateToEdit.full_name || '',
        email: candidateToEdit.email || '',
        phone: candidateToEdit.phone || '',
        position: candidateToEdit.position || 'Asistente de Dirección',
        experience_years: candidateToEdit.experience_years || 0,
        linkedin_url: candidateToEdit.linkedin_url || '',
        cv_url: candidateToEdit.cv_url || '',
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        position: 'Asistente de Dirección',
        experience_years: 0,
        linkedin_url: '',
        cv_url: '',
      });
    }
    setErrors({});
  }, [candidateToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio.';
    if (!formData.position.trim()) newErrors.position = 'El puesto es obligatorio.';
    if (formData.experience_years === undefined || formData.experience_years < 0) {
      newErrors.experience_years = 'Indica los años de experiencia (mínimo 0).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData, candidateToEdit?.id);
      onClose();
    } catch {
      // Error handled by parent toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-up">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            {isEditing ? 'Editar Candidatura' : 'Registrar Nueva Candidatura'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                errors.full_name
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-600'
              }`}
              placeholder="Ej. Carmen Navarro"
            />
            {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-600'
                }`}
                placeholder="carmen@ejemplo.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teléfono *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-600'
                }`}
                placeholder="+34 600 000 000"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Puesto *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
              />
              {errors.position && <p className="text-xs text-red-500 mt-1">{errors.position}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Años de Experiencia *
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.experience_years}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience_years: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
              />
              {errors.experience_years && (
                <p className="text-xs text-red-500 mt-1">{errors.experience_years}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Perfil de LinkedIn (URL)
            </label>
            <input
              type="url"
              value={formData.linkedin_url || ''}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
              placeholder="https://linkedin.com/in/usuario"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enlace al CV (URL o Documento)
            </label>
            <input
              type="url"
              value={formData.cv_url || ''}
              onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
              placeholder="https://storage.ejemplo.com/cv.pdf"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-200 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting
                ? 'Guardando...'
                : isEditing
                ? 'Actualizar Candidato'
                : 'Crear Candidato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
