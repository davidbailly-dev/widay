import { apiClient } from '@/services/api/client';

export const noteService = {
    get: (dateStart, dateEnd, limit, search, page) => apiClient(`/api/notes?dateStart=${dateStart}&dateEnd=${dateEnd}&limit=${limit}&search=${search}&page=${page}`),
    create: (data) => apiClient('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    delete: (id) => apiClient(`/api/notes/${id}`, {
        method: 'DELETE',
    }),
    update: (id, data) => apiClient(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),
};  