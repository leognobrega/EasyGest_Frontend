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

export default function Produtos() {

  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    peso: '',
    custo: '',
    preco: '',
    status: 'Ativo',
    quantidadeAtual: '',
    estoqueMinimo: '',
    fornecedorId: '',
    dataCompra: '',
    dataValidade: '',
    dataFabricacao: ''
  })

  const [editingId, setEditingId] = useState(null)

  const carregarProdutos = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/produtos'
      )

      const data = await response.json()

      const produtosFormatados = data.map(produto => ({
        id: produto.codProduto,
        nome: produto.nomeProduto,
        tipo: produto.tipoProduto,
        peso: produto.pesoProduto,
        custo: produto.custoProduto,
        preco: produto.precoProduto,
        status: produto.statusProduto,
        quantidadeAtual: produto.quantidadeAtual,
        estoqueMinimo: produto.estoqueMinimo,
        fornecedor:
          produto.fornecedor?.nomeFornecedor || '',
        fornecedorId:
          produto.fornecedor?.codFornecedor || '',
        dataCompra: produto.dataCompraProduto,
        dataValidade: produto.dataValidadeProduto,
        dataFabricacao: produto.dataFabricacaoProduto
      }))

      setProdutos(produtosFormatados)

    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }

  const carregarFornecedores = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/fornecedores'
      )

      const data = await response.json()

      setFornecedores(data)
      console.log(data)

    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error)
    }
  }

  useEffect(() => {

    carregarProdutos()
    carregarFornecedores()

  }, [])

  const filtered = produtos.filter(produto =>
    produto.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      nome: '',
      tipo: '',
      peso: '',
      custo: '',
      preco: '',
      status: 'Ativo',
      quantidadeAtual: '',
      estoqueMinimo: '',
      fornecedorId: '',
      dataCompra: '',
      dataValidade: '',
      dataFabricacao: ''
    })

    setIsModalOpen(true)
  }

  const handleEdit = (produto) => {

    setEditingId(produto.id)

    setFormData({
      nome: produto.nome,
      tipo: produto.tipo,
      peso: produto.peso,
      custo: produto.custo,
      preco: produto.preco,
      status: produto.status,
      quantidadeAtual: produto.quantidadeAtual,
      estoqueMinimo: produto.estoqueMinimo,
      fornecedorId: produto.fornecedorId,
      dataCompra: produto.dataCompra,
      dataValidade: produto.dataValidade,
      dataFabricacao: produto.dataFabricacao
    })

    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {

    if (!window.confirm('Tem certeza que deseja excluir?')) {
      return
    }

    try {

      await fetch(
        `http://localhost:8080/produtos/${id}`,
        {
          method: 'DELETE'
        }
      )

      await carregarProdutos()

    } catch (error) {
      console.error('Erro ao excluir produto:', error)
    }
  }

  const handleSubmit = async () => {

    try {

      const produto = {

        nomeProduto: formData.nome,
        tipoProduto: formData.tipo,
        pesoProduto: parseFloat(formData.peso),
        custoProduto: parseFloat(formData.custo),
        precoProduto: parseFloat(formData.preco),
        statusProduto: formData.status,

        quantidadeAtual: formData.quantidadeAtual,
        estoqueMinimo: parseInt(formData.estoqueMinimo),

        dataCompraProduto: formData.dataCompra,
        dataValidadeProduto: formData.dataValidade,
        dataFabricacaoProduto: formData.dataFabricacao,

        fornecedor: {
          codFornecedor: formData.fornecedorId
        }
      }

      if (editingId) {

        await fetch(
          `http://localhost:8080/produtos/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
          }
        )

      } else {

        await fetch(
          'http://localhost:8080/produtos',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
          }
        )
      }

      await carregarProdutos()

      setIsModalOpen(false)

    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    }
  }

  const columns = [
    { key: 'nome', label: 'Produto' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'preco', label: 'Preço' },
    { key: 'quantidadeAtual', label: 'Estoque Atual' },
    { key: 'estoqueMinimo', label: 'Estoque Mínimo' },
    { key: 'fornecedor', label: 'Fornecedor' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <div className="page">

      <PageHeader
        title="Produtos"
        subtitle="Gerenciar produtos"
      />

      <Card className="toolbar-card">

        <div className="toolbar">

          <SearchInput
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Buscar produto..."
          />

          <Button onClick={handleAdd}>
            + Novo Produto
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
            ? 'Editar Produto'
            : 'Novo Produto'
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

        <FormGroup label="Tipo">
          <input
            value={formData.tipo}
            onChange={(e) =>
              setFormData({
                ...formData,
                tipo: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Preço">
          <input
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={(e) =>
              setFormData({
                ...formData,
                preco: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Custo">
          <input
            type="number"
            step="0.01"
            value={formData.custo}
            onChange={(e) =>
              setFormData({
                ...formData,
                custo: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Quantidade Atual">
          <input
            type="number"
            value={formData.quantidadeAtual}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantidadeAtual: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Estoque Mínimo">
          <input
            type="number"
            value={formData.estoqueMinimo}
            onChange={(e) =>
              setFormData({
                ...formData,
                estoqueMinimo: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup label="Fornecedor">
          <select
            value={formData.fornecedorId}
            onChange={(e) =>
              setFormData({
                ...formData,
                fornecedorId: e.target.value
              })
            }
          >
            <option value="">
              Selecione
            </option>

            {fornecedores.map(fornecedor => (
              <option
                key={fornecedor.codFornecedor}
                value={fornecedor.codFornecedor}
              >
                {fornecedor.nomeFornecedor}
              </option>
            ))}
          </select>
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