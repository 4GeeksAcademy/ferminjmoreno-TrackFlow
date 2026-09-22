import {
  Candidate,
  CandidateCreate,
  CandidatePatch,
  CandidateFilters,
  CandidatesResponse,
  CandidateNote,
  NotesResponse,
} from '@/types/candidate';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://playground.4geeks.com/tracker/api/v1';

/**
 * Helper para manejar peticiones fetch con gestión centralizada de errores
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorMsg = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMsg = errorData.detail.map((e: { msg: string }) => e.msg).join(', ');
          } else if (typeof errorData.detail === 'string') {
            errorMsg = errorData.detail;
          }
        }
      } catch {
        // En caso de que no sea json
      }
      throw new Error(errorMsg);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Error inesperado de red o servidor');
  }
}

/**
 * Obtener listado de candidaturas con filtros y búsqueda reactiva
 */
export async function getCandidates(
  filters: CandidateFilters = {}
): Promise<CandidatesResponse> {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.stage) params.append('stage', filters.stage);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<CandidatesResponse>(`/records${query}`);
}

/**
 * Obtener el detalle de una candidatura por su ID
 */
export async function getCandidateById(id: string): Promise<Candidate> {
  return fetchAPI<Candidate>(`/records/${id}`);
}

/**
 * Registrar una nueva candidatura (POST /records)
 */
export async function createCandidate(
  data: CandidateCreate
): Promise<Candidate> {
  return fetchAPI<Candidate>('/records', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Actualizar los datos completos de una candidatura (PUT /records/:id)
 */
export async function updateCandidate(
  id: string,
  data: CandidateCreate
): Promise<Candidate> {
  return fetchAPI<Candidate>(`/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Actualizar el estado o etapa de un candidato con un solo click (PATCH /records/:id)
 */
export async function patchCandidate(
  id: string,
  patch: CandidatePatch
): Promise<Candidate> {
  return fetchAPI<Candidate>(`/records/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

/**
 * Obtener notas asociadas a un candidato (GET /records/:id/notes)
 */
export async function getCandidateNotes(
  recordId: string
): Promise<CandidateNote[]> {
  const res = await fetchAPI<NotesResponse>(`/records/${recordId}/notes`);
  return res.data || [];
}

/**
 * Añadir una nota interna (POST /records/:id/notes)
 */
export async function addCandidateNote(
  recordId: string,
  content: string
): Promise<CandidateNote> {
  return fetchAPI<CandidateNote>(`/records/${recordId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

/**
 * Eliminar una nota interna (DELETE /records/:id/notes/:note_id)
 */
export async function deleteCandidateNote(
  recordId: string,
  noteId: string
): Promise<void> {
  await fetchAPI<void>(`/records/${recordId}/notes/${noteId}`, {
    method: 'DELETE',
  });
}
