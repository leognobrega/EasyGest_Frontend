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

import { formatCurrency } from '../utils/helpers'
import './Pages.css'

export default function RH() {

  const [funcionarios, setFuncionarios] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    ctps: '',
    cargo: '',
    salario: '',
    dataAdmissao: '',
    dataDemissao: ''
  })

  const [editingId, setEditingId] = useState(null)

  const carregarFuncionarios = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/funcionarios'
      )

      const data = await response.json()

      const funcionariosFormatados = data.map(funcionario => ({
        id: funcionario.codFuncionario,
        nome: funcionario.nomeFuncionario,
        cpf: funcionario.cpfFuncionario,
        ctps: funcionario.ctpsFuncionario,
        cargo: funcionario.cargoFuncionario,
        salario: funcionario.salarioFuncionario,
        dataAdmissao: funcionario.dataAdmissaoFuncionario,
        dataDemissao: funcionario.dataDemissaoFuncionario,
        status:
          funcionario.dataDemissaoFuncionario
            ? 'Inativo'
            : 'Ativo'
      }))

      setFuncionarios(funcionariosFormatados)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const filtered = funcionarios.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cpf.includes(searchTerm)
  )

  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      nome: '',
      cpf: '',
      ctps: '',
      cargo: '',
      salario: '',
      dataAdmissao: '',
      dataDemissao: ''
    })

    setIsModalOpen(true)
  }

  const handleEdit = (funcionario) => {
    setEditingId(funcionario.id)
    setFormData(funcionario)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {

    if (!window.confirm('Excluir funcionário?')) {
      return
    }

    try {

      await fetch(
        `http://localhost:8080/funcionarios/${id}`,
        {
          method: 'DELETE'
        }
      )

      await carregarFuncionarios()

    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async () => {

    try {

      const funcionario = {

        nomeFuncionario: formData.nome,
        cpfFuncionario: formData.cpf,
        ctpsFuncionario: formData.ctps,
        cargoFuncionario: formData.cargo,
        salarioFuncionario: parseFloat(formData.salario),
        dataAdmissaoFuncionario: formData.dataAdmissao,
        dataDemissaoFuncionario:
          formData.dataDemissao || null
      }

      if (editingId) {

        await fetch(
          `http://localhost:8080/funcionarios/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
          }
        )

      } else {

        await fetch(
          'http://localhost:8080/funcionarios',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
          }
        )
      }

      await carregarFuncionarios()

      setIsModalOpen(false)

    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'cargo', label: 'Cargo' },
    {
      key: 'salario',
      label: 'Salário',
      render: (row) => formatCurrency(row.salario)
    },
    {
      key: 'dataAdmissao',
      label: 'Data Admissão'
    },
    {
      key: 'dataDemissao',
      label: 'Data Demissão'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ]

  return (

    <div className="page">

      <PageHeader
        title="RH - Recursos Humanos"
        subtitle="Gerenciar funcionários"
      />

      <Card className="toolbar-card">

        <div className="toolbar">

          <SearchInput
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Buscar funcionário..."
          />

          <Button onClick={handleAdd}>
            + Novo Funcionário
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
            ? 'Editar Funcionário'
            : 'Novo Funcionário'
        }
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >

        <FormGroup label="Nome">
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

        <FormGroup label="CPF">
          <input
            value={formData.cpf}
            onChange={(e) =>
              setFormData({
                ...formData,
                cpf: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="CTPS">
          <input
            value={formData.ctps}
            onChange={(e) =>
              setFormData({
                ...formData,
                ctps: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Cargo">
          <input
            value={formData.cargo}
            onChange={(e) =>
              setFormData({
                ...formData,
                cargo: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Salário">
          <input
            type="number"
            step="0.01"
            value={formData.salario}
            onChange={(e) =>
              setFormData({
                ...formData,
                salario: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Data Admissão">
          <input
            type="date"
            value={formData.dataAdmissao}
            onChange={(e) =>
              setFormData({
                ...formData,
                dataAdmissao: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Data Demissão">
          <input
            type="date"
            value={formData.dataDemissao || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                dataDemissao: e.target.value
              })
            }
          />
        </FormGroup>

      </Modal>

    </div>
  )
}