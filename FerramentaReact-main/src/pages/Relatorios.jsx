import { Link } from 'react-router-dom'
import { PageHeader, Card } from '../components/Common'
import { relatoriosList } from '../utils/mockData'
import './Relatorios.css'

export default function Relatorios() {
  return (
    <div className="page">
      <PageHeader title="Relatórios" subtitle="Acessar relatórios e análises" />

      <div className="relatorios-grid">
        {relatoriosList.map(rel => (
          <Link key={rel.id} to={rel.link} className="relatorio-card-link">
            <div className="relatorio-card">
              <div className="relatorio-icon">📊</div>
              <h3>{rel.titulo}</h3>
              <p>{rel.descricao}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
