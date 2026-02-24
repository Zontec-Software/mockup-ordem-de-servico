<template>
  <div>
    <router-link to="/tarefas/os" class="link-voltar-posvenda"><i class="bi bi-arrow-left"></i> Voltar</router-link>
    <div class="fluxo-breadcrumb">&gt; Tarefas</div>
    <h2 class="fluxo-titulo m-b">Ordem de Serviço</h2>
    <div class="bloco margem tela-demanda-card">
      <form @submit.prevent="criar">
        <div class="grid-2 detalhes-demanda">
          <div class="span-2">
            <label for="osGestaoTipo">Tipo de Ordem de Serviço *</label>
            <select id="osGestaoTipo" v-model="form.tipoId" required>
              <option value="">Selecione o tipo</option>
              <option v-for="t in store.TIPOS_OS_GESTAO" :key="t.id" :value="t.id">{{ t.nome }}</option>
            </select>
          </div>
          <div>
            <label for="osGestaoOrigem">Origem *</label>
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
          <div>
            <label for="osGestaoDataConclusao">Data Prevista de Conclusão *</label>
            <input id="osGestaoDataConclusao" v-model="form.fimPrevisto" type="text" placeholder="dd/mm/aaaa" />
          </div>
          <div class="span-2">
            <label for="osGestaoObservacoes">Observações / Escopo</label>
            <textarea id="osGestaoObservacoes" v-model="form.observacoes" rows="4" placeholder="Observações e escopo do serviço"></textarea>
          </div>
        </div>
        <div class="submit direita margem-topo">
          <button type="button" class="acao-secundaria" @click="cancelar">Cancelar</button>
          <button type="submit" class="btn-enviar">Criar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'

const router = useRouter()
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
  store.ordensServicoGestao.push({
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
  })
  store.proximoOSGestao++
  router.push({ name: 'tarefas-os' })
}

function cancelar() {
  router.push({ name: 'tarefas-os' })
}
</script>
