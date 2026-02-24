import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  USUARIOS,
  SETORES,
  CATALOGO_ITENS,
  TIPOS_OS_GESTAO,
  ORIGENS_OS_GESTAO,
  SETORES_EXECUTORES,
  TIPOS_CHAMADO,
  CLASSIFICACOES_ASSISTENCIA,
  CLASSIFICACOES_RETRABALHO,
  CLASSIFICACOES_USINAGEM,
  CLASSIFICACOES_MANUTENCAO
} from '@/data/constants'

const initDemandas = () => [
  { id: 1, tipo: 'material', codigo: 'DEM260643', dataCriacao: new Date('2026-02-06T15:50:00'), criadoPor: 'Stefanni Gomes', lider: 'Isabela Resende Lourenço', origem: 'OP - 2026/14580', status: 'Em Separação', ordemServicoId: null, itens: [{ codigo: 'US1030006', descricao: 'FRONTAL X115 FUROS LATERAIS', quantidade: 47 }] },
  { id: 2, tipo: 'material', codigo: 'DEM260642', dataCriacao: new Date('2026-02-06T14:30:00'), criadoPor: 'Stefanni Gomes', lider: 'Isabela Resende Lourenço', origem: 'Pedido para Estoque', status: 'Requisição Criada', ordemServicoId: null, itens: [{ codigo: 'MAT-001', descricao: 'Material específico', quantidade: 200 }] },
  { id: 3, tipo: 'material', codigo: 'DEM260641', dataCriacao: new Date('2026-02-06T12:00:00'), criadoPor: 'Maria Silva', lider: 'João Santos', origem: 'Pedido de Rotina', status: 'Entregue', ordemServicoId: null, itens: [{ codigo: 'KIT-01', descricao: 'Kit ferramentas', quantidade: 1 }] },
  { id: 4, tipo: 'servico', codigo: 'DEM260640', dataCriacao: new Date('2026-02-06T10:15:00'), criadoPor: 'Carlos Lima', lider: 'Darley Wilson Dias', origem: 'Manutenção Predial', status: 'Em análise', ordemServicoId: null, itens: [], servicoItens: [{ codigo: 'SERV-HID', descricao: 'Reparo Hidráulico' }] },
  { id: 5, tipo: 'material', codigo: 'DEM260639', dataCriacao: new Date('2026-02-05T16:45:00'), criadoPor: 'Fernanda Souza', lider: 'Alessandro Silveira', origem: 'ROT - Pedido de Rotina', status: 'Cancelado', ordemServicoId: null, itens: [{ codigo: 'MAC070281', descricao: 'BOTINA ANTIESTATICA', quantidade: 6 }] }
]

const initOSGestao = () => [
  { id: 1, codigo: 'OS260069', tipoId: 'manutencao-industrial', tipoNome: 'Manutenção Industrial', criadoPorId: 1, criadoPor: 'Gabrielle Inez de Freitas', responsavelId: 4, responsavel: 'Hugo Martins Ferreira', origemId: '1', origem: '1.Identificação', setorExecutorId: 2, setorExecutor: '6.Prestação de Serviços', dataCriacao: '10/02/2026', fimPrevisto: '10/02/2026', observacoes: '', status: 'A iniciar', tarefas: [], demandasIds: [] },
  { id: 2, codigo: 'OS260068', tipoId: 'assistencia-tecnica', tipoNome: 'Assistência Técnica (Pós-venda)', criadoPorId: 2, criadoPor: 'Priscilla Karla Bernardes de Carvalho', responsavelId: 5, responsavel: 'Marcelo Eduardo Alves Filho', origemId: '2', origem: '2.Injeção', setorExecutorId: 2, setorExecutor: '6.Prestação de Serviços', dataCriacao: '11/02/2026', fimPrevisto: '11/02/2026', observacoes: '', status: 'Em andamento', tarefas: [], demandasIds: [] }
]

const initChamados = () => [
  { id: 1, codigo: 'CHAM000001', tipoId: 'assistencia-tecnica', tipoNome: 'Assistência Técnica (Atendimento ao Pós-venda)', setorId: 1, solicitanteId: 1, solicitante: 'Stefanni Gomes', tecnicoId: 3, tecnicoNome: 'João Técnico Silva', responsavel: 'João Técnico Silva', dataCriacao: '06/02/2026', status: 'Em análise', descricao: 'Chamado de exemplo para teste de permissões.', tarefas: [], comentarios: [], origemExterna: null }
]

const initProjetos = () => [
  { id: 1, codigo: 'PRJ250014', nome: 'SISTEMAS DE IDENTIFICAÇÃO DE PADRÕES POR VISÃO COMPUTACIONAL', status: 'Em andamento', dataInicio: '18/02/2025', dataTermino: null, gerenteId: 2, gerenteNome: 'Darley Wilson Dias', setorBeneficiado: 'Gerências e Coordenações', entregas: [] },
  { id: 2, codigo: 'PRJ260011', nome: 'ERP- Gestão Empresarial', status: 'Em andamento', dataInicio: '30/01/2026', dataTermino: null, gerenteId: 2, gerenteNome: 'Darley Wilson Dias', setorBeneficiado: '3.P&D Software', entregas: [
    { id: 1, nome: 'EVOLUÇÃO - SISTEMA DE DEMAN', coordenador: 'Darley Wilson Dias', po: 'Carlos Alexandre Lourenço Jardim', inicioPrevisto: '02/02/2026', fimPrevisto: '30/03/2026', status: 'A iniciar' },
    { id: 2, nome: 'EVOLUÇÃO - INDICADORES', coordenador: 'Darley Wilson Dias', po: 'Fernando Antonio Arantes', inicioPrevisto: '01/03/2026', fimPrevisto: '30/04/2026', status: 'A iniciar' }
  ] },
  { id: 3, codigo: 'PRJ260012', nome: 'Dados Basicos e governança', status: 'Em andamento', dataInicio: '30/01/2026', dataTermino: null, gerenteId: 2, gerenteNome: 'Darley Wilson Dias', setorBeneficiado: '3.P&D Software', entregas: [] }
]

const initPosVenda = () => [
  { id: 1, codigo: 'PV260001', dataCriacao: '20/02/2026', clienteCnpj: '12.345.678/0001-90', razaoSocial: 'Cliente Exemplo Ltda', origem: 'Whatsapp', motivo: 'Suporte', dataConclusao: '' },
  { id: 2, codigo: 'PV260002', dataCriacao: '21/02/2026', clienteCnpj: '98.765.432/0001-10', razaoSocial: 'Outra Empresa SA', origem: 'E-mail', motivo: 'Reclamação', dataConclusao: '24/02/2026' }
]

const initOPs = () => [
  { id: 1, op: '2026/14787', produto: 'PRE030153 - Kit Parafusos M3 X 8 CIL RT 9 UN Preto', quantidade: 2000, dataInicio: '10/02/2026', previsaoConclusao: '13/02/2026', status: 'Em Produção' },
  { id: 2, op: '2026/14783', produto: 'UDO030057 - Cabo de Entrada do Carregador C/Porta Fusível 3A-1m', quantidade: 1000, dataInicio: '09/02/2026', previsaoConclusao: '27/02/2026', status: 'Em Produção' },
  { id: 3, op: '2026/14782', produto: 'CST040230 - Case Vision X216B Parafusada BR/CZ', quantidade: 500, dataInicio: '08/02/2026', previsaoConclusao: '15/02/2026', status: 'Concluída' }
]

const deliberacaoMock = () => [
  { id: 1, demanda: 'DEM260643', origem: 'OP - 2026/14580', material: 'US1030006 - FRONTAL X115', motivacao: 'Manutenção', categoria: 'Material', qtd: 47, valorUnit: 'R$ 10,00', valorTotal: 'R$ 470,00', criador: 'Stefanni Gomes', aprovador: '-', dataCriacao: '06/02/2026', dataLimite: '13/02/2026', status: 'Aguardando' }
]

export const useAppStore = defineStore('app', () => {
  const usuarioAtualId = ref(1)
  const demandas = ref(initDemandas())
  const ordensServicoGestao = ref(initOSGestao())
  const chamados = ref(initChamados())
  const projetos = ref(initProjetos())
  const posVenda = ref(initPosVenda())
  const ops = ref(initOPs())
  const deliberacao = ref(deliberacaoMock())
  const proximoCodigoDemanda = ref(260645)
  const proximoOSGestao = ref(260070)
  const proximoChamado = ref(2)
  const proximoPosVenda = ref(260003)

  const usuarioAtual = computed(() => USUARIOS.find(u => u.id === usuarioAtualId.value) || USUARIOS[0])
  const isLider = computed(() => usuarioAtual.value?.papel === 'lider' || usuarioAtual.value?.papel === 'admin')
  const isTecnico = computed(() => usuarioAtual.value?.papel === 'tecnico')
  const isSolicitante = computed(() => usuarioAtual.value?.papel === 'solicitante')

  function setUsuario(id) {
    usuarioAtualId.value = id
  }

  function getClassificacoesPorTipo(tipoId) {
    const map = {
      'assistencia-tecnica': CLASSIFICACOES_ASSISTENCIA,
      'retrabalho': CLASSIFICACOES_RETRABALHO,
      'usinagem': CLASSIFICACOES_USINAGEM,
      'manutencao': CLASSIFICACOES_MANUTENCAO
    }
    return map[tipoId] || []
  }

  function getOSGestaoById(id) {
    return ordensServicoGestao.value.find(o => o.id === parseInt(id, 10))
  }

  function getDemandaById(id) {
    return demandas.value.find(d => d.id === parseInt(id, 10))
  }

  function getProjetoById(id) {
    return projetos.value.find(p => p.id === parseInt(id, 10))
  }

  function getChamadoById(id) {
    return chamados.value.find(c => c.id === parseInt(id, 10))
  }

  function addComentario(chamadoId, payload) {
    const c = chamados.value.find(ch => ch.id === parseInt(chamadoId, 10))
    if (!c) return
    if (!c.comentarios) c.comentarios = []
    c.comentarios.push(payload)
  }

  return {
    USUARIOS,
    SETORES,
    CATALOGO_ITENS,
    TIPOS_OS_GESTAO,
    ORIGENS_OS_GESTAO,
    SETORES_EXECUTORES,
    TIPOS_CHAMADO,
    usuarioAtualId,
    usuarioAtual,
    isLider,
    isTecnico,
    isSolicitante,
    demandas,
    ordensServicoGestao,
    chamados,
    projetos,
    posVenda,
    ops,
    deliberacao,
    proximoCodigoDemanda,
    proximoOSGestao,
    proximoChamado,
    proximoPosVenda,
    setUsuario,
    getClassificacoesPorTipo,
    getOSGestaoById,
    getDemandaById,
    getProjetoById,
    getChamadoById,
    addComentario,
    addChamado(chamado) {
      const id = proximoChamado.value
      const codigo = 'CHAM' + String(id).padStart(6, '0')
      chamados.value.unshift({
        id,
        codigo,
        ...chamado,
        tarefas: chamado.tarefas || [],
        comentarios: chamado.comentarios || []
      })
      proximoChamado.value++
    }
  }
})
