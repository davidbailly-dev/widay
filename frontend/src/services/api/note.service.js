import { apiClient } from '@/services/api/client';

export const noteService = {
    get: (dateStart, dateEnd, limit, search) => apiClient(`/api/notes?dateStart=${dateStart}&dateEnd=${dateEnd}&limit=${limit}&search=${search}`),
    create: (data) => apiClient('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};