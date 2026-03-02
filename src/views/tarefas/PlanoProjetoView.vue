<template>
  <div v-if="projeto">
    <p class="fonte-fraca m-b">&gt; Tarefas</p>
    <div class="alinha-v m-b">
      <router-link to="/tarefas/projetos" class="botao">Voltar</router-link>
      <h2>{{ projeto.codigo }} - {{ projeto.nome }}</h2>
      <router-link v-if="projetoAnterior" :to="{ name: 'plano-projeto', params: { id: projetoAnterior.id } }" class="botao" title="Projeto anterior">Anterior</router-link>
      <router-link v-if="projetoProximo" :to="{ name: 'plano-projeto', params: { id: projetoProximo.id } }" class="botao" title="Próximo projeto">Próximo</router-link>
    </div>
    <div class="tags m-b">
      <button type="button" :class="{ ativo: tabAtiva === 'proposta' }" @click="tabAtiva = 'proposta'">Proposta de Projeto</button>
      <button type="button" :class="{ ativo: tabAtiva === 'reuniao' }" @click="tabAtiva = 'reuniao'">Reunião de Aprovação</button>
      <button type="button" :class="{ ativo: tabAtiva === 'plano' }" @click="tabAtiva = 'plano'">Plano de Projeto</button>
      <button type="button" :class="{ ativo: tabAtiva === 'demandas' }" @click="tabAtiva = 'demandas'">Demandas</button>
      <button type="button" :class="{ ativo: tabAtiva === 'acesso' }" @click="tabAtiva = 'acesso'">Gestão de Acesso</button>
    </div>
    <div v-show="tabAtiva === 'plano'" class="bloco margem">
      <p class="m-b"><strong>Anexos do projeto:</strong> <a href="#" @click.prevent><i class="bi bi-plus"></i></a></p>
      <h3 class="m-b">Entregas</h3>
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
            <td><span class="chip bg-alerta">{{ e.status }}</span></td>
          </tr>
          <tr v-if="!(projeto.entregas && projeto.entregas.length)">
            <td colspan="6" class="alinha-centro fonte-fraca">Nenhuma entrega.</td>
          </tr>
        </tbody>
      </table>
      <div class="submit m-b"><button type="button" class="acao-secundaria">Adicionar Entrega</button><button type="button" class="acao-secundaria">Gerenciar Tarefas</button></div>
    </div>
    <div v-show="tabAtiva !== 'plano'" class="bloco margem">
      {{ tabAtiva }} — em desenvolvimento.
    </div>
    <div class="submit m-t">
      <router-link :to="{ name: 'os-nova-projeto', params: { projetoId: projeto.id } }" class="botao"><i class="bi bi-clipboard-plus"></i> Abrir Ordem de Serviço</router-link>
    </div>
  </div>
  <div v-else class="bloco margem">
    <p class="fonte-fraca">Projeto não encontrado.</p>
    <router-link to="/tarefas/projetos" class="botao">Voltar à lista</router-link>
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
