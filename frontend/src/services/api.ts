export const getToken = (): string | null => localStorage.getItem('nexushr_token');

export interface User {
  token: string;
  fullName: string;
  email: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'HR' | 'ADMIN';
}

export const getUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('nexushr_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = (token: string, user: User) => {
  localStorage.setItem('nexushr_token', token);
  localStorage.setItem('nexushr_user', JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem('nexushr_token');
  localStorage.removeItem('nexushr_user');
};

export async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers = new Headers(opts.headers);
  headers.set('Content-Type', 'application/json');

  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Vite dev proxy automatically redirects '/api/*' calls to the Spring Boot backend
  const res = await fetch(`/api${path}`, { ...opts, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || err.error || 'API Request failed');
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
}
