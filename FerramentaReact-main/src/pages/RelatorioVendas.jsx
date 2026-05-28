import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { PageHeader, Card, KPICard, Table } from '../components/Common'
import { vendasDetalhadas, vendasSemanal } from '../utils/mockData'
import { formatCurrency } from '../utils/helpers'
import './Pages.css'

export default function RelatorioVendas() {
  const [period, setPeriod] = useState('7d')

  const totalVendas = vendasDetalhadas.reduce((sum, v) => sum + v.valor, 0)
  const numeroVendas = vendasDetalhadas.length
  const ticketMedio = totalVendas / numeroVendas

  const chartData = {
    labels: vendasSemanal.map(v => v.dia),
    datasets: [{
      label: 'Vendas',
      data: vendasSemanal.map(v => v.valor),
      borderColor: '#8FB3E2',
      backgroundColor: 'rgba(143, 179, 226, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }

  const columns = [
    { key: 'data', label: 'Data' },
    { key: 'produto', label: 'Produto' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) }
  ]

  return (
    <div className="page">
      <PageHeader title="Relatório de Vendas" subtitle="Análise de vendas por período" />

      <Card className="toolbar-card">
        <div className="period-selector">
          <button className={period === 'today' ? 'active' : ''} onClick={() => setPeriod('today')}>Hoje</button>
          <button className={period === '7d' ? 'active' : ''} onClick={() => setPeriod('7d')}>7 dias</button>
          <button className={period === '30d' ? 'active' : ''} onClick={() => setPeriod('30d')}>30 dias</button>
          <button className={period === 'custom' ? 'active' : ''} onClick={() => setPeriod('custom')}>Customizado</button>
        </div>
      </Card>

      <div className="kpi-grid">
        <KPICard title="Total de Vendas" value={formatCurrency(totalVendas)} icon="💰" />
        <KPICard title="Número de Vendas" value={numeroVendas} icon="🛒" />
        <KPICard title="Ticket Médio" value={formatCurrency(ticketMedio)} icon="🎫" />
      </div>

      <Card title="Gráfico de Vendas" className="chart-card">
        <Line data={chartData} options={{ responsive: true }} />
      </Card>

      <Card title="Vendas Detalhadas">
        <Table columns={columns} data={vendasDetalhadas} />
      </Card>
    </div>
  )
}
