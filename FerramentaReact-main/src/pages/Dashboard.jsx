import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { PageHeader, Card, KPICard, Badge, Table } from '../components/Common'
import { kpis, vendasSemanal, movMensal, estoqueCritico, vendasRecentes } from '../utils/mockData'
import { formatCurrency } from '../utils/helpers'
import './Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const lineChartData = {
    labels: vendasSemanal.map(v => v.dia),
    datasets: [{
      label: 'Vendas Diárias',
      data: vendasSemanal.map(v => v.valor),
      borderColor: '#8FB3E2',
      backgroundColor: 'rgba(143, 179, 226, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }

  const barChartData = {
    labels: movMensal.map(m => m.mes),
    datasets: [
      {
        label: 'Entradas',
        data: movMensal.map(m => m.in),
        backgroundColor: '#10B981'
      },
      {
        label: 'Saídas',
        data: movMensal.map(m => m.out),
        backgroundColor: '#EF4444'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  const estoqueColumns = [
    { key: 'sku', label: 'SKU' },
    { key: 'produto', label: 'Produto' },
    { key: 'estoque', label: 'Estoque' },
    { key: 'minimo', label: 'Mínimo' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Crítico' ? 'danger' : row.status === 'Alerta' ? 'warning' : 'success'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  const vendasColumns = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'total', label: 'Total', render: (row) => formatCurrency(row.total) },
    { key: 'hora', label: 'Hora' }
  ]

  return (
    <div className="dashboard">
      <PageHeader title="Dashboard" subtitle="Visão geral do seu negócio" />

      {/* KPIs */}
      <div className="kpi-grid">
        <KPICard
          title="Vendas Hoje"
          value={formatCurrency(kpis.vendasHoje)}
          variation={kpis.variacaoVendas}
          icon="📊"
        />
        <KPICard
          title="Ticket Médio"
          value={formatCurrency(kpis.ticketMedio)}
          variation={kpis.variacaoTicket}
          icon="🎫"
        />
        <KPICard
          title="Itens Vendidos"
          value={kpis.itensVendidos}
          variation={kpis.variacaoItens}
          icon="📦"
        />
        <KPICard
          title="Margem"
          value={`${kpis.margem}%`}
          variation={kpis.variacaoMargem}
          icon="💰"
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <Card title="Vendas Semanal" className="chart-card">
          <Line data={lineChartData} options={chartOptions} />
        </Card>
        <Card title="Fluxo Mensal" className="chart-card">
          <Bar data={barChartData} options={chartOptions} />
        </Card>
      </div>

      {/* Tables */}
      <div className="tables-grid">
        <Card title="Estoque Crítico">
          <Table columns={estoqueColumns} data={estoqueCritico} />
        </Card>
        <Card title="Vendas Recentes">
          <Table columns={vendasColumns} data={vendasRecentes} />
        </Card>
      </div>
    </div>
  )
}
