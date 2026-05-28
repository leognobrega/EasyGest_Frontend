import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

export default function Layout({ children, sidebarOpen, setSidebarOpen }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

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
          >
            ☰
          </button>
          <div className="topbar-title">
            <h2>EasyGest - Sistema de Gestão</h2>
          </div>
          <div className="user-menu">
            <span className="user-name">Gabriel Victor</span>
            <span className="user-avatar">👤</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}
