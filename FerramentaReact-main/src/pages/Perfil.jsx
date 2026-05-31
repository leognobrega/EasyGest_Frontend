import { useState } from 'react'
import { PageHeader, Card, FormGroup, Button } from '../components/Common'
import './Perfil.css'

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    nome: 'Administrador',
    email: 'gerenciamento@easygest.com',
    cargo: 'Gerente Técnico',
    departamento: 'TI',
    telefone: '(11) 98765-4321',
    ultimoAcesso: '2025-12-10 14:30'
  })

  const [passwordForm, setPasswordForm] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  })

  const [editingPerfil, setEditingPerfil] = useState(false)

  const handleChangePassword = () => {
    if (passwordForm.novaSenha === passwordForm.confirmarSenha) {
      alert('Senha alterada com sucesso!')
      setPasswordForm({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })
    } else {
      alert('As senhas não conferem!')
    }
  }

  const handleSavePerfil = () => {
    setEditingPerfil(false)
    alert('Perfil atualizado com sucesso!')
  }

  return (
    <div className="page">
      <PageHeader title="Meu Perfil" subtitle="Gerenciar informações pessoais" />

      {/* Informações Pessoais */}
      <Card title="Informações Pessoais">
        <div className="profile-section">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
            <button className="btn-change-avatar">Alterar Avatar</button>
          </div>

          <div className="profile-info">
            {!editingPerfil ? (
              <>
                <div className="info-group">
                  <label>Nome</label>
                  <p>{perfil.nome}</p>
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <p>{perfil.email}</p>
                </div>
                <div className="info-group">
                  <label>Cargo</label>
                  <p>{perfil.cargo}</p>
                </div>
                <div className="info-group">
                  <label>Departamento</label>
                  <p>{perfil.departamento}</p>
                </div>
                <div className="info-group">
                  <label>Telefone</label>
                  <p>{perfil.telefone}</p>
                </div>
                <div className="info-group">
                  <label>Último Acesso</label>
                  <p>{perfil.ultimoAcesso}</p>
                </div>
                <Button onClick={() => setEditingPerfil(true)}>Editar Perfil</Button>
              </>
            ) : (
              <>
                <FormGroup label="Nome">
                  <input
                    value={perfil.nome}
                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Email">
                  <input
                    type="email"
                    value={perfil.email}
                    onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Telefone">
                  <input
                    value={perfil.telefone}
                    onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                  />
                </FormGroup>
                <div className="button-group">
                  <Button variant="secondary" onClick={() => setEditingPerfil(false)}>Cancelar</Button>
                  <Button onClick={handleSavePerfil}>Salvar Alterações</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Segurança */}
      <Card title="Segurança">
        <div className="security-section">
          <h4>Alterar Senha</h4>
          <FormGroup label="Senha Atual">
            <input
              type="password"
              value={passwordForm.senhaAtual}
              onChange={(e) => setPasswordForm({ ...passwordForm, senhaAtual: e.target.value })}
            />
          </FormGroup>
          <FormGroup label="Nova Senha">
            <input
              type="password"
              value={passwordForm.novaSenha}
              onChange={(e) => setPasswordForm({ ...passwordForm, novaSenha: e.target.value })}
            />
          </FormGroup>
          <FormGroup label="Confirmar Nova Senha">
            <input
              type="password"
              value={passwordForm.confirmarSenha}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmarSenha: e.target.value })}
            />
          </FormGroup>
          <Button onClick={handleChangePassword}>Alterar Senha</Button>

          <hr style={{ margin: '24px 0', borderColor: '#E5E7EB' }} />

          <h4>Autenticação de Dois Fatores</h4>
          <p>Aumente a segurança da sua conta ativando a autenticação de dois fatores.</p>
          <Button variant="primary">Ativar 2FA</Button>
        </div>
      </Card>
    </div>
  )
}
