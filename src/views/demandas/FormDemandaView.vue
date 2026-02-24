<template>
  <div class="view-form-demanda">
    <div class="titulo tela-demanda-header">
      <div class="margem container alinha-v" style="gap: 1rem;">
        <button type="button" class="btn-voltar acao-secundaria" title="Voltar" @click="voltar">
          <i class="bi bi-chevron-left"></i>
        </button>
        <h2>{{ id ? 'Editar Demanda' : 'Nova Demanda' }}</h2>
      </div>
    </div>
    <div class="container margem bloco tela-demanda-card">
      <h3 class="subtitulo-secao m-b">Detalhes da Demanda</h3>
      <div class="grid-2 detalhes-demanda">
        <div>
          <label for="demandante">Demandante</label>
          <input id="demandante" v-model="form.demandante" type="text" placeholder="Nome do demandante" />
        </div>
        <div>
          <label for="demandaData">Data</label>
          <input id="demandaData" :value="formatarDataCurta(form.data)" type="text" placeholder="dd/mm/aaaa" readonly />
        </div>
        <div>
          <label for="demandaOrigem">Origem</label>
          <input id="demandaOrigem" v-model="form.origem" type="text" placeholder="Ex: Pedido de Rotina" />
        </div>
        <div>
          <label for="demandaLider">Líder Responsável</label>
          <input id="demandaLider" v-model="form.lider" type="text" placeholder="Nome do líder" />
        </div>
      </div>

      <h3 class="titulo-itens-demanda m-b">Itens da Demanda</h3>
      <div class="tabela-wrapper">
        <table class="tabela tabela-itens-demanda">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Observações</th>
              <th>Quantidade Solicitada</th>
              <th>Entrega Esperada</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in form.itens" :key="idx">
              <td>{{ item.codigo }}</td>
              <td>{{ item.descricao }}</td>
              <td>-</td>
              <td>{{ item.observacoes || '-' }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ item.entregaEsperada || '-' }}</td>
            </tr>
            <tr v-if="form.itens.length === 0">
              <td colspan="6" class="alinha-centro fonte-fraca">Nenhum item. Use Adicionar Item.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="alinha-centro margem-topo">
        <button type="button" class="btn-adicionar-item-secundario" @click="adicionarItem">
          <i class="bi bi-plus-lg"></i> Adicionar Item
        </button>
      </div>

      <div class="submit direita margem-topo acoes-demanda">
        <button type="button" class="acao-secundaria" @click="salvarRascunho">Salvar como rascunho</button>
        <button type="button" class="btn-enviar" @click="enviar">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'

const router = useRouter()
const route = useRoute()
const store = useAppStore()
const id = computed(() => route.params.id ? Number(route.params.id) : null)

const form = ref({
  demandante: '',
  data: new Date(),
  origem: '',
  lider: '',
  itens: []
})

watch(id, carregar, { immediate: true })
onMounted(() => {
  if (!id.value) form.value.data = new Date()
})

function carregar() {
  if (id.value) {
    const d = store.getDemandaById(id.value)
    if (d) {
      form.value = {
        demandante: d.criadoPor || '',
        data: d.dataCriacao,
        origem: d.origem || '',
        lider: d.lider || '',
        itens: (d.itens || []).map(i => ({
          codigo: i.codigo,
          descricao: i.descricao,
          quantidade: i.quantidade,
          observacoes: i.observacoes,
          entregaEsperada: i.entregaEsperada
        }))
      }
    }
  }
}

function voltar() {
  router.push({ name: 'demandas-lista' })
}

function adicionarItem() {
  form.value.itens.push({
    codigo: '',
    descricao: '',
    quantidade: 1,
    observacoes: '',
    entregaEsperada: ''
  })
}

function salvarRascunho() {
  // Mock: poderia chamar API
  voltar()
}

function enviar() {
  // Mock: poderia chamar API
  voltar()
}
</script>
