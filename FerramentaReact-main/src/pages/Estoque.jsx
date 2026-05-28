import { useState } from 'react'
import { PageHeader, Card, Table, Button, Badge, SearchInput } from '../components/Common'
import { estoqueMock } from '../utils/mockData'
import './Pages.css'

export default function Estoque() {
  const [estoque, setEstoque] = useState(estoqueMock)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = estoque.filter(e =>
    e.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdjust = (id, quantity) => {
    setEstoque(estoque.map(e => e.sku === id ? { ...e, estoque: Math.max(0, e.estoque + quantity) } : e))
  }

  const handleReposicao = (id) => {
    setEstoque(estoque.map(e => e.sku === id ? { ...e, pedido: 'Sim' } : e))
  }

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'produto', label: 'Produto' },
    { key: 'estoque', label: 'Estoque Atual' },
    { key: 'minimo', label: 'Estoque Mínimo' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const status = row.estoque < row.minimo ? 'Crítico' : row.estoque < row.minimo * 1.2 ? 'Alerta' : 'OK'
        const statusColor = status === 'Crítico' ? 'danger' : status === 'Alerta' ? 'warning' : 'success'
        return <Badge status={statusColor}>{status}</Badge>
      }
    },
    { key: 'pedido', label: 'Pedido' }
  ]

  return (
    <div className="page">
      <PageHeader title="Estoque" subtitle="Gerenciar inventário de produtos" />
      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar produto..." />
        </div>
      </Card>
      <Card>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Produto</th>
                <th>Estoque Atual</th>
                <th>Mínimo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const status = item.estoque < item.minimo ? 'Crítico' : item.estoque < item.minimo * 1.2 ? 'Alerta' : 'OK'
                const statusColor = status === 'Crítico' ? 'danger' : status === 'Alerta' ? 'warning' : 'success'
                return (
                  <tr key={item.sku}>
                    <td>{item.sku}</td>
                    <td>{item.produto}</td>
                    <td>{item.estoque}</td>
                    <td>{item.minimo}</td>
                    <td><Badge status={statusColor}>{status}</Badge></td>
                    <td className="actions-cell">
                      <button className="btn-icon" onClick={() => handleAdjust(item.sku, -1)} title="Diminuir">➖</button>
                      <button className="btn-icon" onClick={() => handleAdjust(item.sku, 1)} title="Aumentar">➕</button>
                      <button className="btn-icon" onClick={() => handleReposicao(item.sku)} title="Pedir Reposição">📋</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
