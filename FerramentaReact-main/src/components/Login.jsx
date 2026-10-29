import { useState } from 'react'
import { apiRequest, setBasicAuth, clearBasicAuth } from '../utils/api'

export default function Login({ onAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!username.trim() || !password) {
      setError('Informe usuário e senha.')
      return
    }

    setLoading(true)
    setBasicAuth(username.trim(), password)

    try {
      await apiRequest('/usuarios')
      onAuthenticated()
    } catch (loginError) {
      clearBasicAuth()
      setError(loginError.message || 'Não foi possível autenticar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <form onSubmit={handleSubmit} style={{ width: 'min(360px, 100%)', display: 'grid', gap: 12 }}>
        <h1>EasyGest</h1>
        <label>Usuário</label>
        <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
        <label>Senha</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
    </main>
  )
}
