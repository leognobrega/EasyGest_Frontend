import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Estoque from './pages/Estoque'
import Financeiro from './pages/Financeiro'
import Fornecedores from './pages/Fornecedores'
import RH from './pages/RH'
import Prestadores from './pages/Prestadores'
import Relatorios from './pages/Relatorios'
import RelatorioCritico from './pages/RelatorioCritico'
import RelatorioVendas from './pages/RelatorioVendas'
import Perfil from './pages/Perfil'
import Login from './components/Login'
import { clearBasicAuth, hasBasicAuth } from './utils/api'
import './App.css'

function App() {
  const developmentMode = import.meta.env.VITE_EASYGEST_DEVELOPMENT_MODE === 'true'
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 1024)
  const [authenticated, setAuthenticated] = useState(() => developmentMode || hasBasicAuth())

  useEffect(() => {
    const handleAuthRequired = () => {
      if (developmentMode) return
      clearBasicAuth()
      setAuthenticated(false)
    }

    window.addEventListener('easygest:auth-required', handleAuthRequired)
    return () => window.removeEventListener('easygest:auth-required', handleAuthRequired)
  }, [])

  if (!authenticated) {
    return <Login onAuthenticated={() => setAuthenticated(true)} />
  }

  return (
      <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/rh" element={<RH />} />
          <Route path="/prestadores" element={<Prestadores />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/relatorio-estoque-critico" element={<RelatorioCritico />} />
          <Route path="/relatorio-vendas" element={<RelatorioVendas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Layout>
  )
}

export default App
