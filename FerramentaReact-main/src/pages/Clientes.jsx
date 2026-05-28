import { useState } from 'react'
import { PageHeader, Card, Table, Modal, Button, FormGroup, SearchInput } from '../components/Common'
import { clientesMock } from '../utils/mockData'
import './Pages.css'

export default function Clientes() {
  const [clientes, setClientes] = useState(clientesMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', cpf: '', cidade: '', status: 'Ativo' })
  const [editingId, setEditingId] = useState(null)

  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ nome: '', email: '', telefone: '', cpf: '', cidade: '', status: 'Ativo' })
    setIsModalOpen(true)
  }

  const handleEdit = (cliente) => {
    setEditingId(cliente.id)
    setFormData(cliente)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      setClientes(clientes.filter(c => c.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      setClientes(clientes.map(c => c.id === editingId ? { ...formData, id: editingId } : c))
    } else {
      setClientes([...clientes, { ...formData, id: Math.max(...clientes.map(c => c.id), 0) + 1 }])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'cpf', label: 'CPF' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div className="page">
      <PageHeader title="Clientes" subtitle="Gerenciar clientes" />

      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar cliente..." />
          <Button onClick={handleAdd}>+ Novo Cliente</Button>
        </div>
      </Card>

      <Card>
        <Table columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Cliente' : 'Novo Cliente'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <FormGroup label="Nome">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="Email">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="Telefone">
          <input
            type="tel"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="CPF">
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="Cidade">
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
          />
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
