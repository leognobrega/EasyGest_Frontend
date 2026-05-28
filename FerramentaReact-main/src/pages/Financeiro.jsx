import { useState } from 'react'
import { PageHeader, Card, Table, Badge } from '../components/Common'
import { contasPagar, contasReceber, conciliacao } from '../utils/mockData'
import { formatCurrency, formatDate } from '../utils/helpers'
import './Pages.css'

export default function Financeiro() {
  const [activeTab, setActiveTab] = useState('pagar')

  const contasColumns = [
    { key: 'fornecedor' || 'cliente', label: 'Fornecedor/Cliente' },
    { key: 'nfe', label: 'NF-e' },
    { key: 'vencimento', label: 'Vencimento', render: (row) => formatDate(row.vencimento) },
    { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) },
    { key: 'centroCusto', label: 'Centro de Custo' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Pago' ? 'success' : row.status === 'Aprovado' ? 'info' : 'warning'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  const recebiveisColumns = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'nfe', label: 'NF-e' },
    { key: 'vencimento', label: 'Vencimento', render: (row) => formatDate(row.vencimento) },
    { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Pago' ? 'success' : row.status === 'Atrasado' ? 'danger' : 'info'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  const conciliacaoColumns = [
    { key: 'data', label: 'Data', render: (row) => formatDate(row.data) },
    { key: 'descricao', label: 'Descrição' },
    { key: 'valorExtrato', label: 'Valor Extrato', render: (row) => formatCurrency(row.valorExtrato) },
    { key: 'valorSistema', label: 'Valor Sistema', render: (row) => formatCurrency(row.valorSistema) },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Conciliado' ? 'success' : row.status === 'Divergente' ? 'danger' : 'warning'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  return (
    <div className="page">
      <PageHeader title="Financeiro" subtitle="Gerenciar contas e fluxo de caixa" />

      <Card>
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'pagar' ? 'active' : ''}`} onClick={() => setActiveTab('pagar')}>
            Contas a Pagar
          </button>
          <button className={`tab-btn ${activeTab === 'receber' ? 'active' : ''}`} onClick={() => setActiveTab('receber')}>
            Contas a Receber
          </button>
          <button className={`tab-btn ${activeTab === 'conciliacao' ? 'active' : ''}`} onClick={() => setActiveTab('conciliacao')}>
            Conciliação Bancária
          </button>
        </div>
      </Card>

      <Card>
        {activeTab === 'pagar' && <Table columns={contasColumns} data={contasPagar} />}
        {activeTab === 'receber' && <Table columns={recebiveisColumns} data={contasReceber} />}
        {activeTab === 'conciliacao' && <Table columns={conciliacaoColumns} data={conciliacao} />}
      </Card>
    </div>
  )
}
