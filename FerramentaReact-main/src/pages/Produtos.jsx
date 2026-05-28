import { useState } from 'react'
import { PageHeader, Card, Table, Modal, Button, FormGroup, SearchInput } from '../components/Common'
import { produtosMock } from '../utils/mockData'
import { formatCurrency } from '../utils/helpers'
import './Pages.css'

export default function Produtos() {
  const [produtos, setProdutos] = useState(produtosMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ sku: '', nome: '', categoria: '', preco: '', estoque: '' })
  const [editingId, setEditingId] = useState(null)

  const filtered = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ sku: '', nome: '', categoria: '', preco: '', estoque: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (produto) => {
    setEditingId(produto.id)
    setFormData(produto)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Excluir produto?')) {
      setProdutos(produtos.filter(p => p.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      setProdutos(produtos.map(p => p.id === editingId ? { ...formData, id: editingId } : p))
    } else {
      setProdutos([...produtos, { ...formData, id: Math.max(...produtos.map(p => p.id), 0) + 1 }])
    }
    setIsModalOpen(false)
  }

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'nome', label: 'Nome' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'preco', label: 'Preço', render: (row) => formatCurrency(row.preco) },
    { key: 'estoque', label: 'Estoque' }
  ]

  return (
    <div className="page">
      <PageHeader title="Produtos" subtitle="Gerenciar catálogo de produtos" />
      <Card className="toolbar-card">
        <div className="toolbar">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar produto..." />
          <Button onClick={handleAdd}>+ Novo Produto</Button>
        </div>
      </Card>
      <Card>
        <Table columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Produto' : 'Novo Produto'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <FormGroup label="SKU">
          <input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
        </FormGroup>
        <FormGroup label="Nome">
          <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
        </FormGroup>
        <FormGroup label="Categoria">
          <input value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} />
        </FormGroup>
        <FormGroup label="Preço">
          <input type="number" step="0.01" value={formData.preco} onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })} />
        </FormGroup>
        <FormGroup label="Estoque">
          <input type="number" value={formData.estoque} onChange={(e) => setFormData({ ...formData, estoque: parseInt(e.target.value) })} />
        </FormGroup>
      </Modal>
    </div>
  )
}
