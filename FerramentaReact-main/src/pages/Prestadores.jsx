import { useState } from 'react'
import { PageHeader, Card, Table, Modal, Button, FormGroup, SearchInput } from '../components/Common'
import { prestadoresMock } from '../utils/mockData'
import { formatPhone } from '../utils/helpers'
import './Pages.css'

export default function Prestadores() {
  const [prestadores, setPrestadores] = useState(prestadoresMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '', documento: '', telefone: '', email: '', categoria: '', status: 'Ativo'
  })
  const [editingId, setEditingId] = useState(null)

  const filtered = prestadores.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      nome: '', documento: '', telefone: '', email: '', categoria: '', status: 'Ativo'
    })
    setIsModalOpen(true)
  }

  const handleEdit = (prestador) => {
    setEditingId(prestador.id)
    setFormData(prestador)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Excluir prestador?')) {
      setPrestadores(prestadores.filter(p => p.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      setPrestadores(prestadores.map(p => p.id === editingId ? { ...formData, id: editingId } : p))
    } else {
      setPrestadores([...prestadores, { ...formData, id: Math.max(...prestadores.map(p => p.id), 0) + 1 }])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'documento', label: 'Documento' },
    { key: 'telefone', label: 'Telefone', render: (row) => formatPhone(row.telefone) },
    { key: 'email', label: 'Email' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div className="page">
      <PageHeader title="Prestadores" subtitle="Gerenciar prestadores de serviços" />
      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar prestador..." />
          <Button onClick={handleAdd}>+ Novo Prestador</Button>
        </div>
      </Card>
      <Card>
        <Table columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Prestador' : 'Novo Prestador'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <FormGroup label="Nome">
          <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        </FormGroup>
        <FormGroup label="Documento (CPF)">
          <input value={formData.documento} onChange={(e) => setFormData({ ...formData, documento: e.target.value })} />
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
