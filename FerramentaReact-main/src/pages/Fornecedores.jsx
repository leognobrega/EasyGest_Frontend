import { useState } from 'react'
import { PageHeader, Card, Table, Modal, Button, FormGroup, SearchInput } from '../components/Common'
import { fornecedoresMock } from '../utils/mockData'
import { formatCNPJ, formatPhone } from '../utils/helpers'
import './Pages.css'

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState(fornecedoresMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '', nomeFantasia: '', cnpj: '', telefone: '', email: '', categoria: '', status: 'Ativo'
  })
  const [editingId, setEditingId] = useState(null)

  const filtered = fornecedores.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      nome: '', nomeFantasia: '', cnpj: '', telefone: '', email: '', categoria: '', status: 'Ativo'
    })
    setIsModalOpen(true)
  }

  const handleEdit = (fornecedor) => {
    setEditingId(fornecedor.id)
    setFormData(fornecedor)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Excluir fornecedor?')) {
      setFornecedores(fornecedores.filter(f => f.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      setFornecedores(fornecedores.map(f => f.id === editingId ? { ...formData, id: editingId } : f))
    } else {
      setFornecedores([...fornecedores, { ...formData, id: Math.max(...fornecedores.map(f => f.id), 0) + 1 }])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'nome', label: 'Razão Social' },
    { key: 'nomeFantasia', label: 'Nome Fantasia' },
    { key: 'cnpj', label: 'CNPJ', render: (row) => formatCNPJ(row.cnpj) },
    { key: 'telefone', label: 'Telefone', render: (row) => formatPhone(row.telefone) },
    { key: 'email', label: 'Email' },
    { key: 'categoria', label: 'Categoria' }
  ]

  return (
    <div className="page">
      <PageHeader title="Fornecedores" subtitle="Gerenciar fornecedores" />
      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar fornecedor..." />
          <Button onClick={handleAdd}>+ Novo Fornecedor</Button>
        </div>
      </Card>
      <Card>
        <Table columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Fornecedor' : 'Novo Fornecedor'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <FormGroup label="Razão Social">
          <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        </FormGroup>
        <FormGroup label="Nome Fantasia">
          <input value={formData.nomeFantasia} onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })} />
        </FormGroup>
        <FormGroup label="CNPJ">
          <input value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
        </FormGroup>
        <FormGroup label="Telefone">
          <input value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
        </FormGroup>
        <FormGroup label="Email">
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </FormGroup>
        <FormGroup label="Categoria">
          <input value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} />
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
