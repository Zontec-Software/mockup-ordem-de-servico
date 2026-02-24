<template>
  <div>
    <div class="fluxo-breadcrumb">&gt; Tarefas</div>
    <div class="fluxo-titulo-bar">
      <h2 class="fluxo-titulo">Ordem de Serviço</h2>
      <div class="fluxo-titulo-acoes">
        <div class="pesquisa fluxo-pesquisa">
          <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
          <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
        </div>
        <router-link to="/tarefas/os/nova" class="btn-cadastrar"><i class="bi bi-plus-lg"></i> Adicionar</router-link>
      </div>
    </div>
    <div class="bloco margem fluxo-tabela-wrapper">
      <div class="tabela-wrapper">
        <table class="tabela tabela-os-gestao">
          <thead>
            <tr>
              <th>Código</th>
              <th>Criado por</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Data da Criação</th>
              <th>Prazo</th>
              <th>Fim Previsto</th>
              <th>Responsável</th>
              <th>Origem</th>
              <th>Setor Executor</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="os in listaOS"
              :key="os.id"
              class="tr-os-gestao-clicavel"
              @click="abrirDetalhe(os.id)"
            >
              <td>{{ os.codigo }}</td>
              <td>{{ os.criadoPor }}</td>
              <td>{{ os.observacoes || '-' }}</td>
              <td><span class="chip status-chip" :class="getStatusClasse(os.status)">{{ os.status }}</span></td>
              <td>{{ os.dataCriacao }}</td>
              <td>-</td>
              <td>{{ os.fimPrevisto }}</td>
              <td>{{ os.responsavel || '-' }}</td>
              <td>{{ os.origem }}</td>
              <td>{{ os.setorExecutor }}</td>
            </tr>
            <tr v-if="listaOS.length === 0">
              <td colspan="10" class="alinha-centro fonte-fraca">Nenhuma OS.</td>
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
import { getStatusClasse } from '@/utils/formatadores'

const router = useRouter()
const store = useAppStore()
const pesquisa = ref('')

const listaOS = computed(() => {
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (!t) return store.ordensServicoGestao
  return store.ordensServicoGestao.filter(os =>
    (os.codigo + ' ' + os.criadoPor + ' ' + (os.observacoes || '')).toLowerCase().includes(t)
  )
})

function abrirDetalhe(id) {
  router.push({ name: 'os-detalhe', params: { id } })
}
</script>
