import { apiClient } from '@/services/api/client';

export const noteService = {
    get: (dateStart, dateEnd, limit) => apiClient(`/api/notes?dateStart=${dateStart}&dateEnd=${dateEnd}&limit=${limit}`),
    create: (data) => apiClient('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};