<template>
  <div>
    <div class="titulo">
      <div class="margem container alinha-v">
        <router-link to="/tarefas/os" class="botao">Voltar</router-link>
        <h2>Ordem de Serviço</h2>
      </div>
    </div>
    <div class="margem container">
      <p class="fonte-fraca m-b">&gt; Tarefas</p>
      <div class="bloco margem">
      <form @submit.prevent="criar">
        <fieldset class="grid-4 bloco2 margem">
          <div class="col-2">
            <label for="osGestaoTipo">Tipo de Ordem de Serviço *</label>
            <select id="osGestaoTipo" v-model="form.tipoId" required>
              <option value="">Selecione o tipo</option>
              <option v-for="t in store.TIPOS_OS_GESTAO" :key="t.id" :value="t.id">{{ t.nome }}</option>
            </select>
          </div>
          <div><label for="osGestaoOrigem">Origem *</label>
            <select id="osGestaoOrigem" v-model="form.origemId" required>
              <option value="">Selecione</option>
              <option v-for="o in store.ORIGENS_OS_GESTAO" :key="o.id" :value="o.id">{{ o.nome }}</option>
            </select>
          </div>
          <div>
            <label for="osGestaoSetorExecutor">Setor Executor *</label>
            <select id="osGestaoSetorExecutor" v-model="form.setorExecutorId" required>
              <option value="">Selecione</option>
              <option v-for="s in store.SETORES_EXECUTORES" :key="s.id" :value="s.id">{{ s.nome }}</option>
            </select>
          </div>
          <div>
            <label for="osGestaoCriadoPor">Criado por: *</label>
            <select id="osGestaoCriadoPor" v-model="form.criadoPorId" required>
              <option value="">Selecione</option>
              <option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }}</option>
            </select>
          </div>
          <div>
            <label for="osGestaoResponsavel">Responsável</label>
            <select id="osGestaoResponsavel" v-model="form.responsavelId">
              <option value="">Não designado</option>
              <option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }}</option>
            </select>
          </div>
          <div>
            <label for="osGestaoDataCriacao">Data da Criação</label>
            <input id="osGestaoDataCriacao" type="text" :value="formatarDataCurta(new Date())" readonly />
          </div>
          <div><label for="osGestaoDataConclusao">Data Prevista de Conclusão *</label><input id="osGestaoDataConclusao" v-model="form.fimPrevisto" type="text" placeholder="dd/mm/aaaa" /></div>
          <div class="col-2"><label for="osGestaoObservacoes">Observações / Escopo</label>
            <textarea id="osGestaoObservacoes" v-model="form.observacoes" rows="4" placeholder="Observações e escopo do serviço"></textarea>
          </div>
        </fieldset>
        <div class="submit m-b"><button type="button" class="acao-secundaria" @click="cancelar">Cancelar</button><button type="submit">Criar</button></div>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'

const router = useRouter()
const route = useRoute()
const store = useAppStore()

const form = ref({
  tipoId: '',
  origemId: '',
  setorExecutorId: '',
  criadoPorId: store.usuarioAtualId,
  responsavelId: '',
  fimPrevisto: '',
  observacoes: ''
})

// Vínculos opcionais (chamado, projeto, pós-venda, OP) vindos do path (params) ou da query
const vinculo = ref({ chamadoId: null, projetoId: null, posVendaId: null, opId: null })

onMounted(() => {
  const p = route.params
  const q = route.query
  const chamadoId = p.chamadoId || q.chamadoId
  const projetoId = p.projetoId || q.projetoId
  const posVendaId = p.posVendaId || q.posVendaId
  const opId = p.opId || q.opId
  if (chamadoId) {
    vinculo.value.chamadoId = parseInt(chamadoId, 10)
    const c = store.getChamadoById(vinculo.value.chamadoId)
    if (c) {
      const texto = 'Chamado - ' + (c.codigo || c.id)
      form.value.observacoes = (form.value.observacoes ? form.value.observacoes + '\n' : '') + 'Vinculado a: ' + texto
    }
  }
  if (projetoId) {
    vinculo.value.projetoId = parseInt(projetoId, 10)
    const p = store.getProjetoById(vinculo.value.projetoId)
    if (p) {
      const texto = (p.codigo || '') + ' - ' + (p.nome || '')
      form.value.observacoes = (form.value.observacoes ? form.value.observacoes + '\n' : '') + 'Projeto: ' + texto
      form.value.criadoPorId = p.gerenteId || form.value.criadoPorId
    }
  }
  if (posVendaId) {
    vinculo.value.posVendaId = parseInt(posVendaId, 10)
    const pv = store.getPosVendaById(vinculo.value.posVendaId)
    if (pv) {
      const texto = 'Pós-venda - ' + (pv.codigo || pv.id)
      form.value.observacoes = (form.value.observacoes ? form.value.observacoes + '\n' : '') + 'Vinculado a: ' + texto
    }
  }
  if (opId) {
    vinculo.value.opId = parseInt(opId, 10)
    const op = store.getOPById(vinculo.value.opId)
    if (op) {
      const texto = 'Retrabalho vinculado a OP ' + (op.op || op.id)
      form.value.observacoes = (form.value.observacoes ? form.value.observacoes + '\n' : '') + 'Vinculado a: ' + texto
    }
  }
})

const tipoNome = computed(() => {
  const t = store.TIPOS_OS_GESTAO.find(x => x.id === form.value.tipoId)
  return t ? t.nome : ''
})
const origemNome = computed(() => {
  const o = store.ORIGENS_OS_GESTAO.find(x => x.id === form.value.origemId)
  return o ? o.nome : ''
})
const setorNome = computed(() => {
  const s = store.SETORES_EXECUTORES.find(x => x.id === form.value.setorExecutorId)
  return s ? s.nome : ''
})
const criadoPorNome = computed(() => {
  const u = store.USUARIOS.find(x => x.id === form.value.criadoPorId)
  return u ? u.nome : ''
})
const responsavelNome = computed(() => {
  if (!form.value.responsavelId) return null
  const u = store.USUARIOS.find(x => x.id === form.value.responsavelId)
  return u ? u.nome : ''
})

function criar() {
  const id = store.ordensServicoGestao.length ? Math.max(...store.ordensServicoGestao.map(o => o.id)) + 1 : 1
  const codigo = 'OS' + (store.proximoOSGestao + 1)
  const os = {
    id,
    codigo,
    tipoId: form.value.tipoId,
    tipoNome: tipoNome.value,
    criadoPorId: form.value.criadoPorId,
    criadoPor: criadoPorNome.value,
    responsavelId: form.value.responsavelId || null,
    responsavel: responsavelNome.value || null,
    origemId: form.value.origemId,
    origem: origemNome.value,
    setorExecutorId: form.value.setorExecutorId,
    setorExecutor: setorNome.value,
    dataCriacao: formatarDataCurta(new Date()),
    fimPrevisto: form.value.fimPrevisto,
    observacoes: form.value.observacoes || '',
    status: 'A iniciar',
    tarefas: [],
    demandasIds: []
  }
  if (vinculo.value.chamadoId) {
    const c = store.getChamadoById(vinculo.value.chamadoId)
    os.chamadoId = vinculo.value.chamadoId
    os.chamadoCodigo = c ? c.codigo : null
  }
  if (vinculo.value.projetoId) {
    const p = store.getProjetoById(vinculo.value.projetoId)
    os.projetoId = vinculo.value.projetoId
    os.projetoCodigo = p ? p.codigo : null
  }
  if (vinculo.value.posVendaId) {
    const pv = store.getPosVendaById(vinculo.value.posVendaId)
    os.posVendaId = vinculo.value.posVendaId
    os.posVendaCodigo = pv ? pv.codigo : null
  }
  if (vinculo.value.opId) {
    const op = store.getOPById(vinculo.value.opId)
    os.opId = vinculo.value.opId
    os.opCodigo = op ? op.op : null
  }
  store.ordensServicoGestao.push(os)
  store.proximoOSGestao++
  router.push({ name: 'tarefas-os' })
}

function cancelar() {
  router.push({ name: 'tarefas-os' })
}
</script>
