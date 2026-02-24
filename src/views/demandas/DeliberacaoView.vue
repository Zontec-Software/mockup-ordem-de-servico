<template>
  <div class="view-deliberacao">
    <div class="titulo">
      <div class="margem container">
        <h2>Deliberação de Demandas</h2>
        <div class="tabs-deliberacao m-t">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="tab-deliberacao"
            :class="{ ativo: abaAtiva === tab.id }"
            @click="abaAtiva = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="container margem">
      <div class="bloco margem">
        <div class="tabela-wrapper">
          <table class="tabela tabela-deliberacao">
            <thead>
              <tr>
                <th class="col-checkbox"></th>
                <th>Demanda</th>
                <th>Origem</th>
                <th>Material</th>
                <th>Motivação</th>
                <th>Categoria</th>
                <th>Qtd Solicitada</th>
                <th>Valor Unit. Estimado</th>
                <th>Valor Total Estimado</th>
                <th>Criador da Demanda</th>
                <th>Aprovador</th>
                <th>Data de Criação</th>
                <th>Data Limite</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listaDeliberacao" :key="item.id">
                <td><input type="checkbox" v-model="item.selecionado" /></td>
                <td>{{ item.demanda }}</td>
                <td>{{ item.origem }}</td>
                <td>{{ item.material }}</td>
                <td>{{ item.motivacao }}</td>
                <td>{{ item.categoria }}</td>
                <td>{{ item.qtd }}</td>
                <td>{{ item.valorUnit }}</td>
                <td>{{ item.valorTotal }}</td>
                <td>{{ item.criador }}</td>
                <td>{{ item.aprovador }}</td>
                <td>{{ item.dataCriacao }}</td>
                <td>{{ item.dataLimite }}</td>
                <td>{{ item.status }}</td>
              </tr>
              <tr v-if="listaDeliberacao.length === 0">
                <td colspan="14" class="alinha-centro fonte-fraca">Nenhum item nesta aba.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="acoes-deliberacao m-t" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="btn-deliberacao btn-revisao" @click="acao('revisao')">Mandar para Revisão</button>
          <button type="button" class="btn-deliberacao btn-reprovar" @click="acao('reprovar')">Reprovar</button>
          <button type="button" class="btn-deliberacao btn-almoxarifado" @click="acao('almoxarifado')">Enviar para o Almoxarifado</button>
          <button type="button" class="btn-deliberacao btn-compra" @click="acao('compra')">Enviar para compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const abaAtiva = ref('aguardando')

const tabs = [
  { id: 'aguardando', label: 'Aguardando Deliberação' },
  { id: 'compra', label: 'Encaminhado para compra' },
  { id: 'almoxarifado', label: 'Encaminhado para o Almoxarifado' }
]

const listaDeliberacao = ref([])
function atualizarLista() {
  if (abaAtiva.value === 'aguardando') {
    listaDeliberacao.value = store.deliberacao.map(d => ({ ...d, selecionado: false }))
  } else {
    listaDeliberacao.value = []
  }
}
watch([abaAtiva, () => store.deliberacao], atualizarLista, { immediate: true })

function acao(tipo) {
  // Mock: aplicar ação nos selecionados
  console.log('Deliberação:', tipo)
}
</script>
