import { apiClient } from '@/services/api/client';

import { ApiResponse, Note } from '@/types';

export const noteService = {
    get: (dateStart?: string, dateEnd?: string, limit?: number, search?: string, page?: number) =>
        apiClient<ApiResponse>(`/api/notes?dateStart=${dateStart}&dateEnd=${dateEnd}&limit=${limit}&search=${search}&page=${page}`, {
            method: 'GET',
        }),
    create: (data: Note) =>
        apiClient<ApiResponse>('/api/notes', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    delete: (id: string) =>
        apiClient<ApiResponse>(`/api/notes/${id}`, {
            method: 'DELETE',
        }),
    update: (id: string, data: Note) =>
        apiClient<ApiResponse>(`/api/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
};  