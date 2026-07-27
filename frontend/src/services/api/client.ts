const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiClientOptions extends RequestInit {
    headers?: Record<string, string>
}

export async function apiClient<T = unknown>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const res = await fetch(`${API_URL}${endpoint}`, config);

    if (!res.ok) {
        console.log(res);
        const err = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(err.message || `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
}