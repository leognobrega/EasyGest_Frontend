import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clearBasicAuth, hasBasicAuth, setBasicAuth } from '../../utils/api'
import './Layout.css'

export default function Layout({ children, sidebarOpen, setSidebarOpen }) {
  const location = useLocation()
  const [showAuth, setShowAuth] = useState(false)
  const [authUser, setAuthUser] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const handleAuthRequired = () => {
      clearBasicAuth()
      setShowAuth(true)
      setAuthError('Autenticação necessária ou inválida. Entre com as credenciais configuradas no backend.')
    }

    window.addEventListener('easygest:auth-required', handleAuthRequired)
    return () => window.removeEventListener('easygest:auth-required', handleAuthRequired)
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    if (!authUser.trim() || !authPassword) {
      setAuthError('Informe usuário e senha.')
      return
    }
    setBasicAuth(authUser.trim(), authPassword)
    setAuthPassword('')
    setAuthError('')
    setShowAuth(false)
    window.location.reload()
  }

  const handleLogout = () => {
    clearBasicAuth()
    window.location.reload()
  }

  const isActive = (path) => location.pathname === path
  const closeSidebar = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false)
    }
  }

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/clientes', label: 'Clientes', icon: '👥' },
    { path: '/produtos', label: 'Produtos', icon: '📦' },
    { path: '/estoque', label: 'Estoque', icon: '📦' },
    { path: '/financeiro', label: 'Financeiro', icon: '💰' },
    { path: '/fornecedores', label: 'Fornecedores', icon: '🤝' },
    { path: '/rh', label: 'RH', icon: '👔' },
    { path: '/prestadores', label: 'Prestadores', icon: '🛠️' },
    { path: '/relatorios', label: 'Relatórios', icon: '📈' },
    { path: '/perfil', label: 'Perfil', icon: '⚙️' }
  ]

  return (
    <div className="app-layout">
      {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          <h1>EasyGest</h1>
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Abrir ou fechar menu"
          >
            ☰
          </button>
          <div className="topbar-title">
            <h2>EasyGest - Sistema de Gestão</h2>
          </div>
          <div className="user-menu">
            <button className="auth-button" type="button" onClick={hasBasicAuth() ? handleLogout : () => setShowAuth(true)}>
              {hasBasicAuth() ? 'Sair' : 'Entrar'}
            </button>
            <span className="user-avatar">👤</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {showAuth && (
        <div className="auth-overlay" role="presentation">
          <form className="auth-modal" onSubmit={handleLogin}>
            <h2>Entrar no EasyGest</h2>
            {authError && <p className="auth-error">{authError}</p>}
            <label>
              Usuário
              <input value={authUser} onChange={(event) => setAuthUser(event.target.value)} autoComplete="username" />
            </label>
            <label>
              Senha
              <input type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} autoComplete="current-password" />
            </label>
            <div className="auth-actions">
              <button type="button" onClick={() => setShowAuth(false)}>Cancelar</button>
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
