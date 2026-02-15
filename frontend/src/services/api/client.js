const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(endpoint, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const res = await fetch(`${API_URL}${endpoint}`, config);

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(err.message || `HTTP ${res.status}`);
    }

    return res.json();
}