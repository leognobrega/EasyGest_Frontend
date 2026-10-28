const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()

export const API_URL = (configuredApiUrl || 'https://easygest-backend.onrender.com').replace(/\/+$/, '')

export function apiUrl(path = '') {
  const normalizedPath = String(path).startsWith('/') ? String(path) : `/${String(path)}`
  return `${API_URL}${normalizedPath}`
}
