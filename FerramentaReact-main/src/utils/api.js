const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()

export const API_URL = (configuredApiUrl || 'https://easygest-backend.onrender.com').replace(/\/+$/, '')
const BASIC_AUTH_KEY = 'easygest.basicAuth'

export function apiUrl(path = '') {
  const normalizedPath = String(path).startsWith('/') ? String(path) : `/${String(path)}`
  return `${API_URL}${normalizedPath}`
}

export function hasBasicAuth() {
  return Boolean(sessionStorage.getItem(BASIC_AUTH_KEY))
}

export function setBasicAuth(username, password) {
  const credentials = btoa(`${username}:${password}`)
  sessionStorage.setItem(BASIC_AUTH_KEY, credentials)
}

export function clearBasicAuth() {
  sessionStorage.removeItem(BASIC_AUTH_KEY)
}

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type') || ''
  if (response.status === 204 || response.status === 205 || !contentType.includes('json')) {
    return null
  }

  const text = await response.text()
  if (!text.trim()) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiRequest(path, options = {}) {
  const method = options.method || 'GET'
  const headers = new Headers(options.headers || {})
  const credentials = sessionStorage.getItem(BASIC_AUTH_KEY)

  if (credentials && !headers.has('Authorization')) {
    headers.set('Authorization', `Basic ${credentials}`)
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response
  try {
    response = await fetch(path.startsWith('http') ? path : apiUrl(path), {
      ...options,
      method,
      headers
    })
  } catch (error) {
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e a disponibilidade do backend.')
  }

  const data = await readResponseBody(response)

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      window.dispatchEvent(new CustomEvent('easygest:auth-required', {
        detail: { status: response.status }
      }))
    }

    const message = typeof data === 'string'
      ? data
      : data?.message || data?.error || `Erro HTTP ${response.status}`
    throw new Error(message)
  }

  return data
}

export async function apiJson(path, options = {}) {
  return apiRequest(path, options)
}
