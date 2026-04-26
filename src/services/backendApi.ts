/**
 * backendApi — helper para chamadas autenticadas ao backend Node
 *
 * Obtém automaticamente o Firebase ID Token do usuário logado
 * e o inclui no header Authorization de cada request.
 *
 * Uso:
 *   import { backendApi } from './backendApi';
 *   const data = await backendApi.post('/mp/connect', { accessToken, companyId });
 */

import { getAuth } from 'firebase/auth';

async function getToken(): Promise<string> {
    const user = getAuth().currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    return user.getIdToken();
}

async function request<T = any>(
    method: string,
    path: string,
    body?: unknown,
): Promise<T> {
    const token = await getToken();

    const res = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(err.error || `Erro ${res.status}`);
    }

    return res.json();
}

export const backendApi = {
    get:    <T = any>(path: string)               => request<T>('GET',    path),
    post:   <T = any>(path: string, body?: unknown) => request<T>('POST',   path, body),
    patch:  <T = any>(path: string, body?: unknown) => request<T>('PATCH',  path, body),
    delete: <T = any>(path: string)               => request<T>('DELETE', path),
};
