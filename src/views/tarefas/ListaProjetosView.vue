<template>
  <div>
    <div class="titulo">
      <div class="margem container">
        <div class="m-icone direita">
          <div class="pesquisa">
            <input v-model="pesquisa" type="text" placeholder="Pesquisar Projeto" />
            <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
          </div>
        </div>
        <h2>Projetos</h2>
      </div>
    </div>
    <div class="margem container">
      <div class="submit m-b"><button type="button">Novo Projeto</button></div>
      <div class="bloco margem">
        <table class="tabela">
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
              class="clicavel"
              @click="abrirProjeto(p.id)"
            >
              <td>{{ p.codigo }}</td>
              <td>{{ p.nome }}</td>
              <td><span class="chip bg-alerta">{{ p.status }}</span></td>
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
        <div class="paginacao m-b">
          <a href="#" :class="{ ativo: paginaAtual === 1 }" @click.prevent="paginaAtual = 1">1</a>
          <a href="#" v-if="totalPaginas > 1" :class="{ ativo: paginaAtual === 2 }" @click.prevent="paginaAtual = 2">2</a>
          <span v-if="totalPaginas > 2">...</span>
          <a href="#" v-if="totalPaginas > 1" @click.prevent="paginaAtual = totalPaginas">{{ totalPaginas }}</a>
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
