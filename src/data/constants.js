/**
 * Constantes e catálogos do sistema (baseado no protótipo Demandas)
 */

export const SETORES = [
  { id: 1, nome: 'Manutenção Predial' },
  { id: 2, nome: 'TI - Suporte' },
  { id: 3, nome: 'Administrativo' }
]

export const USUARIOS = [
  { id: 1, nome: 'Stefanni Gomes', papel: 'solicitante', setorId: null },
  { id: 2, nome: 'Darley Wilson Dias', papel: 'lider', setorId: 1 },
  { id: 3, nome: 'João Técnico Silva', papel: 'tecnico', setorId: 1 },
  { id: 4, nome: 'Maria Técnica Santos', papel: 'tecnico', setorId: 1 },
  { id: 5, nome: 'Ana Líder Oliveira', papel: 'lider', setorId: 2 },
  { id: 6, nome: 'Carlos Técnico Lima', papel: 'tecnico', setorId: 2 }
]

export const CATALOGO_ITENS = [
  { codigo: 'US1030006', descricao: 'FRONTAL X115 FUROS LATERAIS' },
  { codigo: 'MAT-001', descricao: 'Material específico' },
  { codigo: 'PMP010029', descricao: 'CHAPA ACRILICO CRISTAL PR502' },
  { codigo: 'PAP-002', descricao: 'Resma papel A4' },
  { codigo: 'KIT-01', descricao: 'Kit ferramentas' },
  { codigo: 'MAC070281', descricao: 'BOTINA ANTIESTATICA' }
]

export const MOTIVACOES = ['Manutenção', 'Projeto', 'Reposição', 'Pedido de Rotina', 'Outro']

export const CATALOGO_SERVICOS_NOMES = [
  { codigo: 'SERV-MKT', descricao: 'Marketing' },
  { codigo: 'SERV-EXA', descricao: 'Exames médicos de admissão' },
  { codigo: 'SERV-TI', descricao: 'Suporte TI' },
  { codigo: 'SERV-PINT', descricao: 'Pintura Predial' },
  { codigo: 'SERV-HID', descricao: 'Reparo Hidráulico' },
  { codigo: 'SERV-ELET', descricao: 'Instalação Elétrica' }
]

export const TIPOS_OS_GESTAO = [
  { id: 'usinagem', nome: 'Usinagem' },
  { id: 'assistencia-tecnica', nome: 'Assistência Técnica (Pós-venda)' },
  { id: 'manutencao-industrial', nome: 'Manutenção Industrial' },
  { id: 'manutencao-infraestrutura', nome: 'Manutenção de Infraestrutura' },
  { id: 'reciclagem', nome: 'Reciclagem' },
  { id: 'retrabalho-reciclagem', nome: 'Reciclagem e Retrabalho' }
]

export const ORIGENS_OS_GESTAO = [
  { id: '1', nome: '1.Identificação' },
  { id: '2', nome: '2.Injeção' },
  { id: '3', nome: '3.Montagem' },
  { id: '4', nome: '4.Expedição' },
  { id: '5', nome: '5.Almoxarifado' },
  { id: '6', nome: '6.Prestação de Serviços' }
]

export const SETORES_EXECUTORES = [
  { id: 1, nome: 'Manutenção Industrial' },
  { id: 2, nome: '6.Prestação de Serviços' },
  { id: 3, nome: 'TI - Suporte' }
]

export const TIPOS_ORDEM_SERVICO = [
  { codigo: 'OS-AT', descricao: 'Assistência Técnica' },
  { codigo: 'OS-RT', descricao: 'Retrabalho' },
  { codigo: 'OS-US', descricao: 'Usinagem' },
  { codigo: 'OS-MAN', descricao: 'Manutenção' }
]

export const TIPOS_CHAMADO = [
  { id: 'assistencia-tecnica', nome: 'Assistência Técnica (Atendimento ao Pós-venda)', setorId: 1 },
  { id: 'retrabalho', nome: 'Retrabalho de Produção', setorId: 1 },
  { id: 'usinagem', nome: 'Usinagem', setorId: 1 },
  { id: 'manutencao', nome: 'Manutenção', setorId: 1 }
]

export const CLASSIFICACOES_ASSISTENCIA = [
  { id: 'erro-compra-venda', nome: 'Devolução por erro de compra e venda' },
  { id: 'devolucao-locacao', nome: 'Devolução por locação' },
  { id: 'devolucao-amostra', nome: 'Devolução de amostra' },
  { id: 'manutencao-tecnica', nome: 'Manutenção técnica' }
]

export const CLASSIFICACOES_RETRABALHO = [
  { id: 'nao-conformidade', nome: 'Não conformidade de produto' },
  { id: 'ajuste-processo', nome: 'Ajuste de processo' },
  { id: 'refugo', nome: 'Refugo' },
  { id: 'outro-rt', nome: 'Outro' }
]

export const CLASSIFICACOES_USINAGEM = [
  { id: 'solicitacao-interna', nome: 'Solicitação interna' },
  { id: 'projeto', nome: 'Projeto' },
  { id: 'prototipo', nome: 'Protótipo' },
  { id: 'outro-us', nome: 'Outro' }
]

export const CLASSIFICACOES_MANUTENCAO = [
  { id: 'maquinas', nome: 'Manutenção de máquinas' },
  { id: 'infraestrutura', nome: 'Manutenção de infraestrutura' },
  { id: 'preventiva', nome: 'Preventiva' },
  { id: 'corretiva', nome: 'Corretiva' }
]

export const CLASSIFICACOES_POR_TIPO = {
  'assistencia-tecnica': 'CLASSIFICACOES_ASSISTENCIA',
  'retrabalho': 'CLASSIFICACOES_RETRABALHO',
  'usinagem': 'CLASSIFICACOES_USINAGEM',
  'manutencao': 'CLASSIFICACOES_MANUTENCAO'
}

export const STATUS_TAREFA = ['A iniciar', 'Em andamento', 'Concluída', 'Cancelada']

export const UNIDADES_ITEM = [
  { value: 'UN', label: 'Unidade' },
  { value: 'CX', label: 'Caixa' },
  { value: 'PC', label: 'Peça' },
  { value: 'KG', label: 'Kg' },
  { value: 'M', label: 'Metro' }
]
