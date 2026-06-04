import { useState, useEffect } from 'react'
import {
  PageHeader,
  Card,
  Table,
  Modal,
  Button,
  FormGroup,
  SearchInput
} from '../components/Common'
import './Pages.css'

export default function Fornecedores() {

  const [fornecedores, setFornecedores] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    nomeFantasia: '',
    cnpj: '',
    telefone: '',
    email: '',
    categoria: '',
    status: 'Ativo'
  })

  const [editingId, setEditingId] = useState(null)

  const carregarFornecedores = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/fornecedores'
      )

      const data = await response.json()
      console.log(data)
      const fornecedoresFormatados = data.map(fornecedor => ({
        id: fornecedor.codFornecedor,
        nome: fornecedor.nomeFornecedor,
        nomeFantasia: fornecedor.nomeFantasiaFornecedor,
        cnpj: fornecedor.cnpjFornecedor,
        telefone: fornecedor.telefoneFornecedor,
        email: fornecedor.emailFornecedor,
        categoria: fornecedor.categoriaFornecedor,
        status: 'Ativo'
      }))

      setFornecedores(fornecedoresFormatados)

    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error)
    }
  }

  useEffect(() => {
    carregarFornecedores()
  }, [])

  const filtered = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      nome: '',
      nomeFantasia: '',
      cnpj: '',
      telefone: '',
      email: '',
      categoria: '',
      status: 'Ativo'
    })

    setIsModalOpen(true)
  }

  const handleEdit = (fornecedor) => {
    setEditingId(fornecedor.id)
    setFormData(fornecedor)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {

    if (!window.confirm('Tem certeza que deseja excluir?')) {
      return
    }

    try {

      await fetch(
        `http://localhost:8080/fornecedores/${id}`,
        {
          method: 'DELETE'
        }
      )

      await carregarFornecedores()

    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error)
    }
  }

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await fetch(
          `http://localhost:8080/fornecedores/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nomeFornecedor: formData.nome,
              nomeFantasiaFornecedor: formData.nomeFantasia,
              cnpjFornecedor: formData.cnpj,
              telefoneFornecedor: formData.telefone,
              emailFornecedor: formData.email,
              categoriaFornecedor: formData.categoria
            })
          }
        )

      } else {

        const novoFornecedor = {
          nomeFornecedor: formData.nome,
          nomeFantasiaFornecedor: formData.nomeFantasia,
          cnpjFornecedor: formData.cnpj,
          telefoneFornecedor: formData.telefone,
          emailFornecedor: formData.email,
          categoriaFornecedor: formData.categoria,
          dataCadastro: new Date().toISOString().split('T')[0]
        }

        await fetch(
          `http://localhost:8080/fornecedores`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFornecedor)
          }
        )
      }

      await carregarFornecedores()

      setIsModalOpen(false)

    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error)
    }
  }

  const columns = [
    { key: 'nome', label: 'Razão Social' },
    { key: 'nomeFantasia', label: 'Nome Fantasia' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'email', label: 'Email' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div className="page">

      <PageHeader
        title="Fornecedores"
        subtitle="Gerenciar fornecedores"
      />

      <Card className="toolbar-card">
        <div className="toolbar">

          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar fornecedor..."
          />

          <Button onClick={handleAdd}>
            + Novo Fornecedor
          </Button>

        </div>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Editar Fornecedor' : 'Novo Fornecedor'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >

        <FormGroup label="Razão Social">
          <input
            value={formData.nome}
            onChange={(e) =>
              setFormData({
                ...formData,
                nome: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Nome Fantasia">
          <input
            value={formData.nomeFantasia}
            onChange={(e) =>
              setFormData({
                ...formData,
                nomeFantasia: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="CNPJ">
          <input
            value={formData.cnpj}
            onChange={(e) =>
              setFormData({
                ...formData,
                cnpj: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Telefone">
          <input
            value={formData.telefone}
            onChange={(e) =>
              setFormData({
                ...formData,
                telefone: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Email">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Categoria">
          <input
            value={formData.categoria}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoria: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Status">
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value
              })
            }
          >
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </FormGroup>

      </Modal>

    </div>
  )
}