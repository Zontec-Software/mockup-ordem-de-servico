<template>
  <div>
    <div class="titulo">
      <div class="margem container">
        <div class="m-icone direita alinha-v">
          <button type="button" class="acao-secundaria" title="Pedido de Estoque" @click="pedidoEstoque">
            <i class="bi bi-cart3"></i>
          </button>
          <button type="button" class="acao-secundaria" title="Nova demanda" @click="novaDemanda">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <h2>Minhas Demandas</h2>
      </div>
    </div>
    <div class="margem container">
      <fieldset class="grid-4 bloco2 margem m-b">
        <div><label>Exibir</label><select v-model="filtroTipo"><option value="todas">Todas</option><option value="demandas">Apenas demandas</option><option value="os">Apenas ordens de serviço</option></select></div>
        <div><label>Simular usuário</label><select v-model="usuarioId" @change="trocarUsuario"><option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }} ({{ u.papel }})</option></select></div>
      </fieldset>
      <div class="bloco margem">
        <table class="tabela">
            <thead>
              <tr>
                <th>Código</th>
                <th>Data de Criação</th>
                <th>Criado por</th>
                <th>Líder / Setor</th>
                <th>Origem</th>
                <th>Itens / Descrição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="linha in listaUnificada"
                :key="linha.tipo === 'os' ? 'os-' + linha.osId : linha.id"
                class="clicavel"
                @click="abrirLinha(linha)"
              >
                <td>{{ linha.codigo }}</td>
                <td>{{ formatarDataLinha(linha.data) }}</td>
                <td>{{ linha.criadoPor || '-' }}</td>
                <td>{{ linha.liderOuSetor || '-' }}</td>
                <td>{{ linha.origem || '-' }}</td>
                <td>
                  <template v-if="linha.tipo === 'os'">{{ linha.tipoNome || 'Ordem de Serviço' }}</template>
                  <template v-else>
                    <div v-if="linha.itens && linha.itens.length">
                      <span v-for="(item, idx) in linha.itens.slice(0, 3)" :key="idx"><span class="chip">{{ formatarQuantidade(item.quantidade) }}</span> {{ item.descricao || item.codigo }}</span>
                    </div>
                    <span v-else-if="linha.servicoItens && linha.servicoItens.length">{{ linha.servicoItens.map(s => s.descricao).join(', ') }}</span>
                    <span v-else class="fonte-fraca">Nenhum item</span>
                  </template>
                </td>
                <td>
                  <span class="chip" :class="getStatusClasse(linha.status)">{{ linha.status || 'Em análise' }}</span>
                </td>
              </tr>
              <tr v-if="listaUnificada.length === 0">
                <td colspan="7" class="alinha-centro fonte-fraca">Nenhuma demanda. Clique no botão + para adicionar.</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { formatarData, formatarDataCurta, formatarQuantidade, getStatusClasse } from '@/utils/formatadores'

const router = useRouter()
const store = useAppStore()
const filtroTipo = ref('todas')
const usuarioId = ref(store.usuarioAtualId)
const pesquisaTexto = ref('')

function trocarUsuario() {
  store.setUsuario(usuarioId.value)
}

const listaUnificada = computed(() => {
  const linhas = []
  const texto = (pesquisaTexto.value || '').trim().toLowerCase()
  if (filtroTipo.value === 'todas' || filtroTipo.value === 'demandas') {
    store.demandas.forEach(d => {
      const busca = (d.codigo || '') + ' ' + (d.criadoPor || '') + ' ' + (d.lider || '') + ' ' + (d.origem || '')
      if (texto && !busca.toLowerCase().includes(texto)) return
      linhas.push({
        tipo: 'demanda',
        id: d.id,
        data: d.dataCriacao,
        codigo: d.codigo,
        criadoPor: d.criadoPor,
        liderOuSetor: d.lider,
        origem: d.origem,
        itens: d.itens,
        servicoItens: d.servicoItens,
        status: d.status,
        demanda: d
      })
    })
  }
  if (filtroTipo.value === 'todas' || filtroTipo.value === 'os') {
    store.ordensServicoGestao.forEach(os => {
      const busca = (os.codigo || '') + ' ' + (os.criadoPor || '') + ' ' + (os.responsavel || '') + ' ' + (os.origem || '') + ' ' + (os.tipoNome || '')
      if (texto && !busca.toLowerCase().includes(texto)) return
      linhas.push({
        tipo: 'os',
        osId: os.id,
        data: os.dataCriacao,
        codigo: os.codigo,
        criadoPor: os.criadoPor,
        liderOuSetor: os.responsavel || os.setorExecutor || '-',
        origem: os.origem,
        tipoNome: os.tipoNome,
        status: os.status,
        os
      })
    })
  }
  linhas.sort((a, b) => {
    const da = a.data ? (typeof a.data === 'string' ? a.data : formatarDataCurta(a.data)) : ''
    const db = b.data ? (typeof b.data === 'string' ? b.data : formatarDataCurta(b.data)) : ''
    return db.localeCompare(da)
  })
  return linhas
})

function formatarDataLinha(data) {
  if (!data) return '-'
  if (typeof data === 'string') return data
  return formatarData(data)
}

function abrirLinha(linha) {
  if (linha.tipo === 'os') {
    router.push({ name: 'os-editar', params: { id: linha.osId } })
  } else {
    router.push({ name: 'demanda-editar', params: { id: linha.id } })
  }
}

function novaDemanda() {
  router.push({ name: 'demanda-nova' })
}

function pedidoEstoque() {
  // Placeholder: abrir modal ou tela de pedido de estoque
}
</script>
