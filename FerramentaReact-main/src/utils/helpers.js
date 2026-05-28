export const formatCurrency = (value) => {
  if (!value) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const formatDateInput = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatCPF = (cpf) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }
  return cpf;
};

export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length === 14) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
  }
  return cnpj;
};

export const formatCEP = (cep) => {
  if (!cep) return '';
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return cep;
};

export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 4px;
    color: white;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

export const getStatusBadgeClass = (status) => {
  const statusMap = {
    Pendente: 'warning',
    Aprovado: 'info',
    Pago: 'success',
    Aberto: 'info',
    Atrasado: 'danger',
    Conciliado: 'success',
    Divergente: 'danger',
    Ativo: 'success',
    Inativo: 'danger',
    Crítico: 'danger',
    Alerta: 'warning',
    OK: 'success'
  };
  return statusMap[status] || 'default';
};
