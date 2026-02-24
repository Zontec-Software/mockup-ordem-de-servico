<template>
  <div>
    <div class="fluxo-breadcrumb">&gt; Tarefas</div>
    <div class="fluxo-titulo-bar">
      <h2 class="fluxo-titulo">Projetos</h2>
      <div class="fluxo-titulo-acoes">
        <div class="pesquisa fluxo-pesquisa">
          <input v-model="pesquisa" type="text" placeholder="Pesquisar Projeto" />
          <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
        </div>
        <button type="button" class="btn-cadastrar"><i class="bi bi-plus-lg"></i> Novo Projeto</button>
      </div>
    </div>
    <div class="bloco margem fluxo-tabela-wrapper">
      <div class="tabela-wrapper">
        <table class="tabela tabela-projetos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome do Projeto</th>
              <th>Status</th>
              <th>Data de Início</th>
              <th>Data de Término</th>
              <th>Gerente Responsável</th>
              <th>Setor Beneficiado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in projetosFiltrados"
              :key="p.id"
              class="tr-os-gestao-clicavel"
              @click="abrirProjeto(p.id)"
            >
              <td>{{ p.codigo }}</td>
              <td>{{ p.nome }}</td>
              <td><span class="chip status-chip status-analise">{{ p.status }}</span></td>
              <td>{{ p.dataInicio }}</td>
              <td>{{ p.dataTermino || '-' }}</td>
              <td>{{ p.gerenteNome }}</td>
              <td>{{ p.setorBeneficiado }}</td>
            </tr>
            <tr v-if="projetosFiltrados.length === 0">
              <td colspan="7" class="alinha-centro fonte-fraca">Nenhum projeto.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-t" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div><span class="fonte-fraca">Qtd p/ página</span> <select v-model="qtdPorPagina"><option :value="15">15</option><option :value="30">30</option><option :value="50">50</option></select></div>
        <div class="paginacao-btns">
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;" :disabled="paginaAtual <= 1" @click="paginaAtual--"><i class="bi bi-chevron-left"></i></button>
          <span class="pag-atual" style="margin: 0 0.5rem;">{{ paginaAtual }}</span>
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;" :disabled="paginaAtual >= totalPaginas" @click="paginaAtual++"><i class="bi bi-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const store = useAppStore()
const pesquisa = ref('')
const paginaAtual = ref(1)
const qtdPorPagina = ref(15)

const projetosFiltrados = computed(() => {
  let list = store.projetos
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (t) list = list.filter(p => (p.codigo + ' ' + p.nome).toLowerCase().includes(t))
  const start = (paginaAtual.value - 1) * qtdPorPagina.value
  return list.slice(start, start + qtdPorPagina.value)
})

const totalPaginas = computed(() => Math.max(1, Math.ceil(store.projetos.length / qtdPorPagina.value)))

function abrirProjeto(id) {
  router.push({ name: 'plano-projeto', params: { id } })
}
</script>
