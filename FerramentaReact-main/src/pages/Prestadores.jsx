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

export default function Prestadores() {

  const [prestadores, setPrestadores] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    nomeFantasia: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    valor: 0
  })

  const [editingId, setEditingId] = useState(null)

  const carregarPrestadores = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/prestadores'
      )

      const data = await response.json()

      const prestadoresFormatados = data.map(prestador => ({
        id: prestador.codPrestador,
        nome: prestador.razaoSocialPrestador,
        nomeFantasia: prestador.nomePrestador,
        cnpj: prestador.cnpjPrestador,
        endereco: prestador.enderecoPrestador,
        telefone: prestador.telefonePrestador,
        email: prestador.emailPrestador,
        valor: prestador.valorPrestador
      }))

      setPrestadores(prestadoresFormatados)

    } catch (error) {
      console.error('Erro ao carregar prestadores:', error)
    }
  }

  useEffect(() => {
    carregarPrestadores()
  }, [])

  const filtered = prestadores.filter(prestador =>
    prestador.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prestador.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      nome: '',
      nomeFantasia: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      email: '',
      valor: 0
    })

    setIsModalOpen(true)
  }

  const handleEdit = (prestador) => {

    setEditingId(prestador.id)

    setFormData({
      nome: prestador.nome,
      nomeFantasia: prestador.nomeFantasia,
      cnpj: prestador.cnpj,
      endereco: prestador.endereco,
      telefone: prestador.telefone,
      email: prestador.email,
      valor: prestador.valor
    })

    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {

    if (!window.confirm('Tem certeza que deseja excluir?')) {
      return
    }

    try {

      await fetch(
        `http://localhost:8080/prestadores/${id}`,
        {
          method: 'DELETE'
        }
      )

      await carregarPrestadores()

    } catch (error) {
      console.error('Erro ao excluir prestador:', error)
    }
  }

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await fetch(
          `http://localhost:8080/prestadores/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razaoSocialPrestador: formData.nome,
              nomePrestador: formData.nomeFantasia,
              cnpjPrestador: formData.cnpj,
              enderecoPrestador: formData.endereco,
              telefonePrestador: formData.telefone,
              emailPrestador: formData.email,
              valorPrestador: formData.valor
            })
          }
        )

      } else {

        const novoPrestador = {

          razaoSocialPrestador: formData.nome,
          nomePrestador: formData.nomeFantasia,
          cnpjPrestador: formData.cnpj,
          enderecoPrestador: formData.endereco,
          telefonePrestador: formData.telefone,
          emailPrestador: formData.email,
          valorPrestador: formData.valor,

          dataServicoPrestador:
            new Date().toISOString().split('T')[0]
        }

        await fetch(
          'http://localhost:8080/prestadores',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPrestador)
          }
        )
      }

      await carregarPrestadores()

      setIsModalOpen(false)

    } catch (error) {
      console.error('Erro ao salvar prestador:', error)
    }
  }

  const columns = [
    { key: 'nome', label: 'Razão Social' },
    { key: 'nomeFantasia', label: 'Nome Fantasia' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'email', label: 'Email' },
    { key: 'endereco', label: 'Endereço' },
    { key: 'valor', label: 'Valor Serviço' }
  ]

  return (
    <div className="page">

      <PageHeader
        title="Prestadores"
        subtitle="Gerenciar prestadores de serviços"
      />

      <Card className="toolbar-card">
        <div className="toolbar">

          <SearchInput
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Buscar prestador..."
          />

          <Button onClick={handleAdd}>
            + Novo Prestador
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
        title={
          editingId
            ? 'Editar Prestador'
            : 'Novo Prestador'
        }
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >

        <FormGroup label="Razão Social">
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

        <FormGroup label="Nome Fantasia">
          <input
            type="text"
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
            type="text"
            value={formData.cnpj}
            onChange={(e) =>
              setFormData({
                ...formData,
                cnpj: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Endereço">
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) =>
              setFormData({
                ...formData,
                endereco: e.target.value
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

        <FormGroup label="Valor do Serviço">
          <input
            type="number"
            step="0.01"
            value={formData.valor}
            onChange={(e) =>
              setFormData({
                ...formData,
                valor: parseFloat(e.target.value)
              })
            }
          />
        </FormGroup>

      </Modal>

    </div>
  )
}