<template>
  <div class="view-lista-demandas">
    <div class="titulo">
      <div class="margem container">
        <div class="m-icone direita alinha-v" style="gap: 0.5rem;">
          <button type="button" class="btn-carrinho acao-secundaria" title="Pedido de Estoque" @click="pedidoEstoque">
            <i class="bi bi-cart3"></i>
          </button>
          <button type="button" class="btn-add-demandas acao-secundaria" title="Nova demanda" @click="novaDemanda">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <h2>Minhas Demandas</h2>
      </div>
    </div>
    <div class="container margem">
      <div class="filtro-apenas-minhas margem-bottom" style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <label style="margin-bottom: 0;">
          Exibir:
          <select v-model="filtroTipo">
            <option value="todas">Todas</option>
            <option value="demandas">Apenas demandas</option>
            <option value="os">Apenas ordens de serviço</option>
          </select>
        </label>
        <label style="margin-bottom: 0;">
          Simular usuário:
          <select v-model="usuarioId" @change="trocarUsuario">
            <option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }} ({{ u.papel }})</option>
          </select>
        </label>
      </div>
      <div class="bloco margem">
        <div class="tabela-wrapper">
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
                class="clicavel row-demanda"
                :class="{ 'row-demanda-os': linha.tipo === 'os' }"
                @click="abrirLinha(linha)"
              >
                <td>{{ linha.codigo }}</td>
                <td>{{ formatarDataLinha(linha.data) }}</td>
                <td class="desc">{{ linha.criadoPor || '-' }}</td>
                <td class="desc">{{ linha.liderOuSetor || '-' }}</td>
                <td class="desc">{{ linha.origem || '-' }}</td>
                <td>
                  <template v-if="linha.tipo === 'os'">{{ linha.tipoNome || 'Ordem de Serviço' }}</template>
                  <template v-else>
                    <div v-if="linha.itens && linha.itens.length" class="lista-itens">
                      <div v-for="(item, idx) in linha.itens.slice(0, 3)" :key="idx" class="item-produto">
                        <span class="quantidade-badge">{{ formatarQuantidade(item.quantidade) }}</span>
                        <span class="descricao-produto">{{ item.descricao || item.codigo }}</span>
                      </div>
                    </div>
                    <span v-else-if="linha.servicoItens && linha.servicoItens.length">{{ linha.servicoItens.map(s => s.descricao).join(', ') }}</span>
                    <span v-else class="sem-itens">Nenhum item</span>
                  </template>
                </td>
                <td>
                  <span class="chip status-chip" :class="getStatusClasse(linha.status)">{{ linha.status || 'Em análise' }}</span>
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
    router.push({ name: 'os-detalhe', params: { id: linha.osId } })
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
