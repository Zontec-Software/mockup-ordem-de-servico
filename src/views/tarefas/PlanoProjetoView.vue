<template>
  <div v-if="projeto">
    <div class="fluxo-breadcrumb">&gt; Tarefas</div>
    <div class="fluxo-titulo-bar" style="align-items: center; gap: 0.5rem;">
      <router-link to="/tarefas/projetos" class="link-voltar-posvenda"><i class="bi bi-arrow-left"></i></router-link>
      <h2 class="fluxo-titulo m-0">{{ projeto.codigo }} - {{ projeto.nome }}</h2>
      <router-link v-if="projetoAnterior" :to="{ name: 'plano-projeto', params: { id: projetoAnterior.id } }" class="link-voltar-posvenda" title="Projeto anterior"><i class="bi bi-chevron-left"></i></router-link>
      <router-link v-if="projetoProximo" :to="{ name: 'plano-projeto', params: { id: projetoProximo.id } }" class="link-voltar-posvenda" title="Próximo projeto"><i class="bi bi-chevron-right"></i></router-link>
    </div>
    <div class="tabs-deliberacao m-b">
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'proposta' }" @click="tabAtiva = 'proposta'">Proposta de Projeto</button>
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'reuniao' }" @click="tabAtiva = 'reuniao'">Reunião de Aprovação</button>
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'plano' }" @click="tabAtiva = 'plano'">Plano de Projeto</button>
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'demandas' }" @click="tabAtiva = 'demandas'">Demandas</button>
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'acesso' }" @click="tabAtiva = 'acesso'">Gestão de Acesso</button>
    </div>
    <div v-show="tabAtiva === 'plano'" class="bloco margem tela-demanda-card">
      <p class="m-b"><strong>Anexos do projeto:</strong> <a href="#" class="link-adicionar" @click.prevent><i class="bi bi-plus"></i></a></p>
      <h3 class="subtitulo-secao m-b">Entregas</h3>
      <div class="tabela-wrapper">
        <table class="tabela">
          <thead>
            <tr>
              <th>Entrega</th>
              <th>Coordenador</th>
              <th>PO da Entrega</th>
              <th>Início Previsto</th>
              <th>Fim Previsto</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in (projeto.entregas || [])" :key="e.id">
              <td>{{ e.nome }}</td>
              <td>{{ e.coordenador }}</td>
              <td>{{ e.po || '-' }}</td>
              <td>{{ e.inicioPrevisto }}</td>
              <td>{{ e.fimPrevisto }}</td>
              <td><span class="chip status-chip status-analise">{{ e.status }}</span></td>
            </tr>
            <tr v-if="!(projeto.entregas && projeto.entregas.length)">
              <td colspan="6" class="alinha-centro fonte-fraca">Nenhuma entrega.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-t">
        <button type="button" class="btn-adicionar-item-secundario"><i class="bi bi-plus-lg"></i> Adicionar Entrega</button>
      </div>
      <div class="alinha-centro m-t">
        <button type="button" class="acao-secundaria">Gerenciar Tarefas</button>
      </div>
    </div>
    <div v-show="tabAtiva !== 'plano'" class="bloco margem tela-demanda-card">
      {{ tabAtiva }} — em desenvolvimento.
    </div>
    <div class="popup-abrir-os" style="position: fixed; bottom: 1.5rem; right: 1.5rem;">
      <button type="button" class="btn-cadastrar"><i class="bi bi-clipboard-plus"></i> Abrir Ordem de Serviço</button>
    </div>
  </div>
  <div v-else class="bloco margem">
    <p class="fonte-fraca">Projeto não encontrado.</p>
    <router-link to="/tarefas/projetos" class="link-voltar-posvenda">Voltar à lista</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const store = useAppStore()
const tabAtiva = ref('plano')

const projeto = computed(() => store.getProjetoById(route.params.id))

const projetoAnterior = computed(() => {
  const list = store.projetos
  const idx = list.findIndex(p => p.id === projeto.value?.id)
  return idx > 0 ? list[idx - 1] : null
})
const projetoProximo = computed(() => {
  const list = store.projetos
  const idx = list.findIndex(p => p.id === projeto.value?.id)
  return idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null
})
</script>
