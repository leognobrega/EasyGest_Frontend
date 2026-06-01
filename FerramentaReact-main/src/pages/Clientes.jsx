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

export default function Clientes() {

  const [clientes, setClientes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cidade: '',
    status: 'Ativo'
  })

  const [editingId, setEditingId] = useState(null)

  const carregarClientes = async () => {
    try {

      const response = await fetch(
        'http://localhost:8080/clientes'
      )

      const data = await response.json()

      const clientesFormatados = data.map(cliente => ({
        id: cliente.codCliente,
        nome: cliente.nomeCliente,
        email: cliente.emailCliente,
        telefone: cliente.telefoneCliente,
        cpf: cliente.cpfCliente,
        cidade: cliente.enderecoCliente,
        status: 'Ativo'
      }))

      setClientes(clientesFormatados)

    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  const filtered = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingId(null)

    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      cidade: '',
      status: 'Ativo'
    })

    setIsModalOpen(true)
  }

  const handleEdit = (cliente) => {
    setEditingId(cliente.id)
    setFormData(cliente)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {

    if (!window.confirm('Tem certeza que deseja excluir?')) {
      return
    }

    try {

      await fetch(
        `http://localhost:8080/clientes/${id}`,
        {
          method: 'DELETE'
        }
      )

      await carregarClientes()

    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
    }
  }

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await fetch(
          `http://localhost:8080/clientes/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nomeCliente: formData.nome,
              cpfCliente: formData.cpf,
              enderecoCliente: formData.cidade,
              telefoneCliente: formData.telefone,
              emailCliente: formData.email
            })
          }
        )

      } else {

        const novoCliente = {
          nomeCliente: formData.nome,
          cpfCliente: formData.cpf,
          enderecoCliente: formData.cidade,
          telefoneCliente: formData.telefone,
          emailCliente: formData.email,
          dataCadastro: new Date().toISOString().split('T')[0]
        }

        await fetch(
          'http://localhost:8080/clientes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
          }
        )
      }

      await carregarClientes()

      setIsModalOpen(false)

    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
    }
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

      <PageHeader
        title="Clientes"
        subtitle="Gerenciar clientes"
      />

      <Card className="toolbar-card">
        <div className="toolbar">

          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente..."
          />

          <Button onClick={handleAdd}>
            + Novo Cliente
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
        title={editingId ? 'Editar Cliente' : 'Novo Cliente'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >

        <FormGroup label="Nome">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) =>
              setFormData({
                ...formData,
                nome: e.target.value
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

        <FormGroup label="Telefone">
          <input
            type="text"
            value={formData.telefone}
            onChange={(e) =>
              setFormData({
                ...formData,
                telefone: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="CPF">
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) =>
              setFormData({
                ...formData,
                cpf: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Cidade">
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) =>
              setFormData({
                ...formData,
                cidade: e.target.value
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