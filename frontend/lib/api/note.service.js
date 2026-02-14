import { apiClient } from '@/lib/api/client';

export const noteService = {
    get: (date) => apiClient(`/api/notes?date=${date ? new Date(date).toISOString() : ''}`),
    create: (data) => apiClient('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};