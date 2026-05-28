import './Components.css'

export function Card({ title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  )
}

export function KPICard({ title, value, variation, icon }) {
  const isPositive = variation >= 0
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h4>{title}</h4>
        {icon && <span className="kpi-icon">{icon}</span>}
      </div>
      <div className="kpi-value">{value}</div>
      {variation !== undefined && (
        <div className={`kpi-variation ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(variation)}%
        </div>
      )}
    </div>
  )
}

export function Badge({ status, children }) {
  const statusClass = {
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info'
  }[status] || 'badge-default'

  return <span className={`badge ${statusClass}`}>{children}</span>
}

export function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {typeof col.render === 'function'
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="actions-cell">
                  {onEdit && (
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => onEdit(row)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => onDelete(row.id)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Modal({ isOpen, title, onClose, children, onSubmit, submitText = 'Salvar' }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          {onSubmit && (
            <button className="btn btn-primary" onClick={onSubmit}>
              {submitText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function FormGroup({ label, error, children }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export function Button({ variant = 'primary', size = 'md', children, ...props }) {
  const btnClass = `btn btn-${variant} btn-${size}`
  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {children && <div className="header-actions">{children}</div>}
    </div>
  )
}
