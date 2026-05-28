// ========================== DASHBOARD KPIs ==========================
export const kpis = {
  vendasHoje: 22850.40,
  variacaoVendas: 12.3,
  ticketMedio: 189.75,
  variacaoTicket: -3.1,
  itensVendidos: 342,
  variacaoItens: 5.8,
  margem: 34.2,
  variacaoMargem: 1.4
};

export const vendasSemanal = [
  { dia: "Seg", valor: 1200 },
  { dia: "Ter", valor: 1650 },
  { dia: "Qua", valor: 1420 },
  { dia: "Qui", valor: 1980 },
  { dia: "Sex", valor: 2200 },
  { dia: "Sáb", valor: 1840 },
  { dia: "Dom", valor: 900 }
];

export const movMensal = [
  { mes: "Jan", in: 3200, out: 2800 },
  { mes: "Fev", in: 4100, out: 3500 },
  { mes: "Mar", in: 3900, out: 3300 },
  { mes: "Abr", in: 4600, out: 4200 },
  { mes: "Mai", in: 5200, out: 4700 },
  { mes: "Jun", in: 4800, out: 5000 }
];

export const estoqueCritico = [
  { sku: "AZ-001", produto: "Camiseta Azul M", estoque: 3, minimo: 10, status: "Crítico" },
  { sku: "AZ-114", produto: "Fone Bluetooth X", estoque: 2, minimo: 5, status: "Crítico" },
  { sku: "MR-090", produto: "Arroz 5kg", estoque: 8, minimo: 12, status: "Alerta" },
  { sku: "CL-442", produto: "Calça Jeans 42", estoque: 1, minimo: 6, status: "Crítico" }
];

export const vendasRecentes = [
  { cliente: "João Silva", total: 320.50, hora: "10:21" },
  { cliente: "Maria Souza", total: 89.90, hora: "10:05" },
  { cliente: "Loja Bom Preço", total: 1380.00, hora: "09:47" }
];

export const recebiveis = [
  { valor: 520.00, venc: "Hoje", status: "Em aberto" },
  { valor: 1290.00, venc: "D+3", status: "Em aberto" },
  { valor: 300.00, venc: "Vencido", status: "Atrasado" },
  { valor: 750.00, venc: "Pago", status: "Pago" }
];

// ========================== CLIENTES ==========================
export const clientesMock = [
  { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 98765-4321", cpf: "123.456.789-00", cidade: "São Paulo", status: "Ativo" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(21) 99876-5432", cpf: "234.567.890-11", cidade: "Rio de Janeiro", status: "Ativo" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com", telefone: "(31) 97654-3210", cpf: "345.678.901-22", cidade: "Belo Horizonte", status: "Inativo" },
  { id: 4, nome: "Ana Costa", email: "ana@email.com", telefone: "(41) 98543-2109", cpf: "456.789.012-33", cidade: "Curitiba", status: "Ativo" },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@email.com", telefone: "(51) 97432-1098", cpf: "567.890.123-44", cidade: "Porto Alegre", status: "Ativo" },
  { id: 6, nome: "Lucia Mendes", email: "lucia@email.com", telefone: "(61) 98321-0987", cpf: "678.901.234-55", cidade: "Brasília", status: "Inativo" }
];

// ========================== PRODUTOS ==========================
export const produtosMock = [
  { id: 1, sku: "PROD-001", nome: "Camiseta Azul", categoria: "Roupas", preco: 49.90, estoque: 15 },
  { id: 2, sku: "PROD-002", nome: "Calça Jeans", categoria: "Roupas", preco: 129.90, estoque: 8 },
  { id: 3, sku: "PROD-003", nome: "Fone Bluetooth", categoria: "Eletrônicos", preco: 199.90, estoque: 12 },
  { id: 4, sku: "PROD-004", nome: "Arroz 5kg", categoria: "Alimentos", preco: 24.90, estoque: 50 },
  { id: 5, sku: "PROD-005", nome: "Feijão 1kg", categoria: "Alimentos", preco: 8.90, estoque: 75 },
  { id: 6, sku: "PROD-006", nome: "Smartphone", categoria: "Eletrônicos", preco: 999.90, estoque: 5 }
];

// ========================== ESTOQUE ==========================
export const estoqueMock = [
  { sku: "AZ-001", produto: "Camiseta Azul M", estoque: 3, minimo: 10, pedido: "Não" },
  { sku: "CJ-042", produto: "Calça Jeans 42", estoque: 5, minimo: 6, pedido: "Sim" },
  { sku: "FB-001", produto: "Fone Bluetooth X", estoque: 12, minimo: 5, pedido: "Não" },
  { sku: "AR-005", produto: "Arroz 5kg", estoque: 50, minimo: 20, pedido: "Não" },
  { sku: "FJ-001", produto: "Feijão 1kg", estoque: 75, minimo: 30, pedido: "Não" },
  { sku: "SM-001", produto: "Smartphone", estoque: 5, minimo: 10, pedido: "Sim" }
];

// ========================== FINANCEIRO ==========================
export const contasPagar = [
  { id: 1, fornecedor: "Tech Solutions", nfe: "NFE-00123", vencimento: "2025-12-10", valor: 5250.75, centroCusto: "TI", status: "Pendente" },
  { id: 2, fornecedor: "Office Supplies Co.", nfe: "NFE-00124", vencimento: "2025-12-15", valor: 780.50, centroCusto: "Administrativo", status: "Aprovado" },
  { id: 3, fornecedor: "Marketing Criativo", nfe: "NFE-00125", vencimento: "2025-11-28", valor: 3500.00, centroCusto: "Marketing", status: "Pago" },
  { id: 4, fornecedor: "Infraestrutura Web", nfe: "NFE-00126", vencimento: "2025-12-20", valor: 1800.00, centroCusto: "TI", status: "Pendente" },
  { id: 5, fornecedor: "Consultoria Legal", nfe: "NFE-00127", vencimento: "2025-12-05", valor: 7500.00, centroCusto: "Jurídico", status: "Pago" },
];

export const contasReceber = [
  { id: 1, cliente: "Inova Corp", nfe: "NFE-501", vencimento: "2025-12-05", valor: 15000, status: "Aberto", atraso: 0 },
  { id: 2, cliente: "Global Trade", nfe: "NFE-502", vencimento: "2025-11-15", valor: 8500, status: "Atrasado", atraso: 18 },
  { id: 3, cliente: "Varejo Express", nfe: "NFE-503", vencimento: "2025-12-25", valor: 22000, status: "Aberto", atraso: 0 },
];

export const conciliacao = [
  { id: 1, data: "2025-12-01", descricao: "Recebimento NF-501", valorExtrato: 15000.00, valorSistema: 15000.00, status: "Conciliado" },
  { id: 2, data: "2025-12-01", descricao: "Taxa de Manutenção", valorExtrato: -35.50, valorSistema: 0, status: "Divergente" },
  { id: 3, data: "2025-12-02", descricao: "Pagamento Fornecedor Tech", valorExtrato: -5250.75, valorSistema: -5250.75, status: "Pendente" },
];

// ========================== FORNECEDORES ==========================
export const fornecedoresMock = [
  {
    id: 1, nome: "Tech Solutions Ltda", nomeFantasia: "Tech Solutions", cnpj: "12.345.678/0001-90",
    tipoPessoa: "PJ", telefone: "(11) 3000-1000", celular: "(11) 98765-4321", email: "contato@techsolutions.com",
    emailFinanceiro: "financeiro@techsolutions.com", website: "www.techsolutions.com",
    cep: "01234-567", logradouro: "Av. Paulista", numero: "1000", complemento: "Sala 500",
    bairro: "Bela Vista", cidade: "São Paulo", estado: "SP",
    banco: "Banco Itaú", agencia: "0001", conta: "12345678-9", tipoConta: "Corrente",
    titularConta: "Tech Solutions Ltda", codigoServico: "123456", regimeTributario: "Lucro Presumido",
    cnaePrincipal: "62.01-5/00", natureza: "Consultorias", categoria: "Informática", observacoes: "Fornecedor de soluções TI", status: "Ativo"
  }
];

// ========================== PRESTADORES ==========================
export const prestadoresMock = [
  {
    id: 1, nome: "João Consultoria", nomeFantasia: "JC Consultoria", documento: "123.456.789-00",
    tipoPessoa: "PF", telefone: "(11) 3000-1000", celular: "(11) 98765-4321", email: "joao@consultor.com",
    website: "www.joaoconsultor.com", cep: "01234-567", logradouro: "Rua das Flores", numero: "100",
    complemento: "", bairro: "Centro", cidade: "São Paulo", estado: "SP",
    banco: "Banco Bradesco", agencia: "0001", conta: "87654321-0", tipoConta: "Corrente",
    titularConta: "João da Silva", categoria: "Consultoria", observacoes: "Consultor de negócios", status: "Ativo"
  }
];

// ========================== RH ==========================
export const funcionariosMock = [
  {
    id: 1, nome: "Gabriel Victor", cpf: "123.456.789-00", cargoId: 1, depto: "TI",
    salario: 5500.00, dataAdmissao: "2023-01-15", banco: "Itaú", agencia: "0001",
    conta: "12345678-9", foto: null, status: "Ativo"
  },
  {
    id: 2, nome: "Marina Silva", cpf: "234.567.890-11", cargoId: 2, depto: "RH",
    salario: 4200.00, dataAdmissao: "2023-03-20", banco: "Bradesco", agencia: "0002",
    conta: "87654321-0", foto: null, status: "Ativo"
  },
  {
    id: 3, nome: "Lucas Ferreira", cpf: "345.678.901-22", cargoId: 3, depto: "Vendas",
    salario: 3800.00, dataAdmissao: "2023-06-10", banco: "Caixa", agencia: "0003",
    conta: "11111111-1", foto: null, status: "Ativo"
  },
  {
    id: 4, nome: "Fernanda Costa", cpf: "456.789.012-33", cargoId: 1, depto: "TI",
    salario: 5200.00, dataAdmissao: "2023-08-05", banco: "Santander", agencia: "0004",
    conta: "22222222-2", foto: null, status: "Ativo"
  }
];

export const cargosMock = [
  { id: 1, cargo: "Desenvolvedor", salarioBase: 4500, beneficios: 1000 },
  { id: 2, cargo: "Gerente RH", salarioBase: 3500, beneficios: 800 },
  { id: 3, cargo: "Vendedor", salarioBase: 3000, beneficios: 600 }
];

// ========================== RELATÓRIOS ==========================
export const vendasDetalhadas = [
  { data: "01/11/2025", produto: "Produto A", cliente: "Cliente 1", valor: 100.00 },
  { data: "01/11/2025", produto: "Produto B", cliente: "Cliente 2", valor: 150.00 },
  { data: "02/11/2025", produto: "Produto A", cliente: "Cliente 3", valor: 100.00 },
  { data: "03/11/2025", produto: "Produto C", cliente: "Cliente 1", valor: 200.00 },
  { data: "04/11/2025", produto: "Produto B", cliente: "Cliente 4", valor: 150.00 },
  { data: "05/11/2025", produto: "Produto A", cliente: "Cliente 2", valor: 100.00 },
];

export const relatoriosList = [
  {
    id: 1, titulo: 'Vendas por Período', descricao: 'Análise detalhada das vendas realizadas em um período específico.',
    link: '/relatorio-vendas'
  },
  {
    id: 2, titulo: 'Estoque Crítico', descricao: 'Lista de produtos com estoque abaixo do mínimo.',
    link: '/relatorio-estoque-critico'
  },
  {
    id: 3, titulo: 'Fluxo de Caixa', descricao: 'Demonstrativo de entradas e saídas financeiras.',
    link: '#'
  }
];

// ========================== STATUS MAP ==========================
export const statusMap = {
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
