import { apiClient } from '@/lib/api/client';

export const noteService = {
    getAll: () => apiClient('/api/notes'),
    create: (data) => apiClient('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};