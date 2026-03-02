<template>
  <div>
    <div class="titulo">
      <div class="margem container">
        <div class="m-icone direita">
          <div class="pesquisa">
            <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
            <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
          </div>
        </div>
        <h2>Ordem de Serviço</h2>
      </div>
    </div>
    <div class="margem container">
      <div class="submit m-b">
        <router-link to="/tarefas/os/nova" class="botao">Adicionar</router-link>
      </div>
      <div class="bloco margem">
        <table class="tabela">
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
              class="clicavel"
              @click="abrirDetalhe(os.id)"
            >
              <td>{{ os.codigo }}</td>
              <td>{{ os.criadoPor }}</td>
              <td>{{ os.observacoes || '-' }}</td>
              <td><span class="chip" :class="getStatusClasse(os.status)">{{ os.status }}</span></td>
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
  router.push({ name: 'os-editar', params: { id } })
}
</script>
