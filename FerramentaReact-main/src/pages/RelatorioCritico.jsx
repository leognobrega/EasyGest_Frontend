import { PageHeader, Card, KPICard, Badge, Table } from '../components/Common'
import { estoqueCritico } from '../utils/mockData'
import './Pages.css'

export default function RelatorioCritico() {
  const criticCount = estoqueCritico.filter(e => e.status === 'Crítico').length
  const alertCount = estoqueCritico.filter(e => e.status === 'Alerta').length

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'produto', label: 'Produto' },
    { key: 'estoque', label: 'Estoque Atual' },
    { key: 'minimo', label: 'Estoque Mínimo' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Crítico' ? 'danger' : row.status === 'Alerta' ? 'warning' : 'success'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  return (
    <div className="page">
      <PageHeader title="Relatório de Estoque Crítico" subtitle="Produtos abaixo do estoque mínimo" />

      <div className="kpi-grid">
        <KPICard title="Itens Críticos" value={criticCount} icon="🚨" />
        <KPICard title="Itens em Alerta" value={alertCount} icon="⚠️" />
        <KPICard title="Total de Itens" value={estoqueCritico.length} icon="📦" />
      </div>

      <Card>
        <Table columns={columns} data={estoqueCritico} />
      </Card>
    </div>
  )
}
