import { useState, useEffect } from 'react'
import {
  PageHeader,
  Card,
  Badge,
  SearchInput
} from '../components/Common'
import './Pages.css'

export default function Estoque() {

  const [estoque, setEstoque] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const carregarEstoque = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/produtos'
      )

      const data = await response.json()

      const estoqueFormatado = data.map(produto => ({

        id: produto.codProduto,

        sku: produto.codProduto,

        produto: produto.nomeProduto,

        estoque: Number(produto.quantidadeAtual),

        minimo: produto.estoqueMinimo,

        statusProduto: produto.statusProduto

      }))

      setEstoque(estoqueFormatado)

    } catch (error) {

      console.error(
        'Erro ao carregar estoque:',
        error
      )

    }
  }

  useEffect(() => {

    carregarEstoque()

  }, [])

  const filtered = estoque.filter(item =>

    item.produto
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    item.sku
      .toString()
      .includes(searchTerm)

  )

  return (

    <div className="page">

      <PageHeader
        title="Estoque"
        subtitle="Gerenciar inventário de produtos"
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

        </div>

      </Card>

      <Card>

        <div className="table-container">

          <table className="data-table">

            <thead>

              <tr>
                <th>SKU</th>
                <th>Produto</th>
                <th>Estoque Atual</th>
                <th>Estoque Mínimo</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map(item => {

                const status =
                  item.estoque < item.minimo
                    ? 'Crítico'
                    : item.estoque < item.minimo * 1.2
                    ? 'Alerta'
                    : 'OK'

                const statusColor =
                  status === 'Crítico'
                    ? 'danger'
                    : status === 'Alerta'
                    ? 'warning'
                    : 'success'

                return (

                  <tr key={item.id}>

                    <td>{item.sku}</td>

                    <td>{item.produto}</td>

                    <td>{item.estoque}</td>

                    <td>{item.minimo}</td>

                    <td>
                      <Badge status={statusColor}>
                        {status}
                      </Badge>
                    </td>

                  </tr>

                )

              })}

            </tbody>

          </table>

        </div>

      </Card>

    </div>

  )
}