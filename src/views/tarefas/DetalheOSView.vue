<template>
  <div v-if="os">
    <router-link to="/tarefas/os" class="link-voltar-posvenda"><i class="bi bi-arrow-left"></i> Voltar</router-link>
    <div class="fluxo-breadcrumb">&gt; Tarefas</div>
    <h2 class="fluxo-titulo m-b">Ordem de Serviço - {{ os.codigo }}</h2>
    <div class="tabs-os-gestao m-b">
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'planejamento' }" @click="tabAtiva = 'planejamento'">Planejamento</button>
      <button type="button" class="tab-deliberacao" :class="{ ativo: tabAtiva === 'acesso' }" @click="tabAtiva = 'acesso'">Gestão de Acesso</button>
    </div>
    <div v-show="tabAtiva === 'planejamento'" class="bloco margem tela-demanda-card">
      <h3 class="subtitulo-secao m-b">Dados da Ordem de Serviço</h3>
      <div class="grid-2 detalhes-demanda">
        <div class="span-2"><label>Tipo</label><input type="text" :value="os.tipoNome" readonly /></div>
        <div><label>Origem</label><input type="text" :value="os.origem" readonly /></div>
        <div><label>Setor Executor</label><input type="text" :value="os.setorExecutor" readonly /></div>
        <div><label>Criado por</label><input type="text" :value="os.criadoPor" readonly /></div>
        <div><label>Responsável</label><input type="text" :value="os.responsavel || '-'" readonly /></div>
        <div><label>Data da Criação</label><input type="text" :value="os.dataCriacao" readonly /></div>
        <div><label>Data Prevista de Conclusão</label><input type="text" :value="os.fimPrevisto" readonly /></div>
        <div class="span-2"><label>Observações / Escopo</label><textarea rows="4" :value="os.observacoes" readonly></textarea></div>
      </div>
      <h3 class="subtitulo-secao m-b margem-topo">Tarefas</h3>
      <p class="fonte-fraca m-b">Tarefas vinculadas a esta OS.</p>
      <div class="tabela-wrapper">
        <table class="tabela">
          <thead><tr><th>Nº</th><th>Responsável</th><th>Descrição</th><th>H.P.</th><th>Início Previsto</th><th>Fim Previsto</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="(t, idx) in (os.tarefas || [])" :key="idx">
              <td>{{ t.codigo || idx + 1 }}</td>
              <td>{{ t.responsavel || '-' }}</td>
              <td>{{ t.descricao || '-' }}</td>
              <td>{{ t.hp || '-' }}</td>
              <td>{{ t.inicioPrevisto || '-' }}</td>
              <td>{{ t.fimPrevisto || '-' }}</td>
              <td>{{ t.status || '-' }}</td>
            </tr>
            <tr v-if="!(os.tarefas && os.tarefas.length)">
              <td colspan="7" class="alinha-centro fonte-fraca">Nenhuma tarefa.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 class="subtitulo-secao m-b margem-topo">Anexos</h3>
      <p class="fonte-fraca m-b">Arquivos vinculados a esta OS.</p>
      <ul class="lista-anexos-os"><li class="fonte-fraca">Nenhum anexo.</li></ul>
      <h3 class="subtitulo-secao m-b margem-topo">Demanda de Materiais</h3>
      <p class="fonte-fraca m-b">Demandas solicitadas aqui aparecem no módulo Demandas.</p>
      <div class="tabela-wrapper">
        <table class="tabela">
          <thead><tr><th>Código</th><th>Itens</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td colspan="3" class="alinha-centro fonte-fraca">Nenhuma demanda de materiais.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="tabAtiva === 'acesso'" class="bloco margem tela-demanda-card">
      Gestão de Acesso — em desenvolvimento.
    </div>
  </div>
  <div v-else class="bloco margem">
    <p class="fonte-fraca">OS não encontrada.</p>
    <router-link to="/tarefas/os" class="link-voltar-posvenda">Voltar à lista</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const store = useAppStore()
const tabAtiva = ref('planejamento')

const os = computed(() => store.getOSGestaoById(route.params.id))
</script>

<style scoped>
.tabs-os-gestao { display: flex; gap: 0; border-bottom: 1px solid var(--cor-cinza2); }
.tabs-os-gestao .tab-deliberacao { margin-bottom: -1px; }
.lista-anexos-os { list-style: none; padding: 0; margin: 0; }
</style>
