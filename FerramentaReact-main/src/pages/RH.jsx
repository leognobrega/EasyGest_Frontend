import { useState } from 'react'
import { PageHeader, Card, Table, Modal, Button, FormGroup, SearchInput } from '../components/Common'
import { funcionariosMock, cargosMock } from '../utils/mockData'
import { formatCurrency } from '../utils/helpers'
import './Pages.css'

export default function RH() {
  const [funcionarios, setFuncionarios] = useState(funcionariosMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '', cpf: '', cargoId: 1, depto: '', salario: 0, dataAdmissao: '', banco: '', agencia: '', conta: '', status: 'Ativo'
  })
  const [editingId, setEditingId] = useState(null)

  const filtered = funcionarios.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cpf.includes(searchTerm)
  )

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      nome: '', cpf: '', cargoId: 1, depto: '', salario: 0, dataAdmissao: '', banco: '', agencia: '', conta: '', status: 'Ativo'
    })
    setIsModalOpen(true)
  }

  const handleEdit = (func) => {
    setEditingId(func.id)
    setFormData(func)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Excluir funcionário?')) {
      setFuncionarios(funcionarios.filter(f => f.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      setFuncionarios(funcionarios.map(f => f.id === editingId ? { ...formData, id: editingId } : f))
    } else {
      setFuncionarios([...funcionarios, { ...formData, id: Math.max(...funcionarios.map(f => f.id), 0) + 1 }])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'depto', label: 'Departamento' },
    { key: 'salario', label: 'Salário', render: (row) => formatCurrency(row.salario) },
    { key: 'dataAdmissao', label: 'Data Admissão' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div className="page">
      <PageHeader title="RH - Recursos Humanos" subtitle="Gerenciar funcionários" />
      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar funcionário..." />
          <Button onClick={handleAdd}>+ Novo Funcionário</Button>
        </div>
      </Card>
      <Card>
        <Table columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Funcionário' : 'Novo Funcionário'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <FormGroup label="Nome">
          <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        </FormGroup>
        <FormGroup label="CPF">
          <input value={formData.cpf} onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} />
        </FormGroup>
        <FormGroup label="Cargo">
          <select value={formData.cargoId} onChange={(e) => setFormData({ ...formData, cargoId: parseInt(e.target.value) })}>
            {cargosMock.map(c => <option key={c.id} value={c.id}>{c.cargo}</option>)}
          </select>
        </FormGroup>
        <FormGroup label="Departamento">
          <input value={formData.depto} onChange={(e) => setFormData({ ...formData, depto: e.target.value })} />
        </FormGroup>
        <FormGroup label="Salário">
          <input type="number" step="0.01" value={formData.salario} onChange={(e) => setFormData({ ...formData, salario: parseFloat(e.target.value) })} />
        </FormGroup>
        <FormGroup label="Data Admissão">
          <input type="date" value={formData.dataAdmissao} onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })} />
        </FormGroup>
        <FormGroup label="Status">
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </FormGroup>
      </Modal>
    </div>
  )
}
