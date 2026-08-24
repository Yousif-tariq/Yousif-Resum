const rawUrl = import.meta.env.VITE_API_URL;

export const API_BASE = (rawUrl && typeof rawUrl === 'string' && rawUrl.trim() !== '')
  ? rawUrl.trim().replace(/\/+$/, '')
  : (typeof window !== 'undefined' && (window.location.port === '5173' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:8000'
      : '');

