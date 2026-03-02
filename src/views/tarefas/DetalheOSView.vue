<template>
  <div v-if="os">
    <div class="titulo">
      <div class="margem container alinha-v">
        <router-link to="/tarefas/os" class="botao">Voltar</router-link>
        <h2>Ordem de Serviço - {{ os.codigo }}</h2>
      </div>
    </div>
    <div class="margem container">
      <p class="fonte-fraca m-b">&gt; Tarefas</p>
      <div class="tags m-b">
        <button type="button" :class="{ ativo: tabAtiva === 'planejamento' }" @click="tabAtiva = 'planejamento'">Planejamento</button>
        <button type="button" :class="{ ativo: tabAtiva === 'acesso' }" @click="tabAtiva = 'acesso'">Gestão de Acesso</button>
      </div>
    <div v-show="tabAtiva === 'planejamento'" class="bloco margem">
      <h3 class="m-b">Dados da Ordem de Serviço</h3>
      <div v-if="vinculoTexto" class="m-b">
        <label>Vinculado a</label>
        <p class="m-b">{{ vinculoTexto }}</p>
      </div>
      <fieldset class="grid-4 bloco2 margem">
        <div class="col-2"><label>Tipo</label><input type="text" :value="os.tipoNome" readonly /></div>
        <div><label>Origem</label><input type="text" :value="os.origem" readonly /></div>
        <div><label>Setor Executor</label><input type="text" :value="os.setorExecutor" readonly /></div>
        <div><label>Criado por</label><input type="text" :value="os.criadoPor" readonly /></div>
        <div><label>Responsável</label><input type="text" :value="os.responsavel || '-'" readonly /></div>
        <div><label>Data da Criação</label><input type="text" :value="os.dataCriacao" readonly /></div>
        <div><label>Data Prevista de Conclusão</label><input type="text" :value="os.fimPrevisto" readonly /></div>
        <div class="col-2"><label>Observações / Escopo</label><textarea rows="4" :value="os.observacoes" readonly></textarea></div>
      </fieldset>
      <h3 class="m-b">Tarefas</h3>
      <p class="fonte-fraca m-b">Tarefas vinculadas a esta OS.</p>
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
      <h3 class="m-b">Anexos</h3>
      <p class="fonte-fraca m-b">Arquivos vinculados a esta OS.</p>
      <ul><li class="fonte-fraca">Nenhum anexo.</li></ul>
      <h3 class="m-b">Demanda de Materiais</h3>
      <p class="fonte-fraca m-b">Demandas solicitadas aqui aparecem no módulo Demandas.</p>
      <table class="tabela">
        <thead><tr><th>Código</th><th>Itens</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td colspan="3" class="alinha-centro fonte-fraca">Nenhuma demanda de materiais.</td></tr>
        </tbody>
      </table>
    </div>
    <div v-show="tabAtiva === 'acesso'" class="bloco margem">
      Gestão de Acesso — em desenvolvimento.
    </div>
    </div>
  </div>
  <div v-else>
    <div class="titulo">
      <div class="margem container">
        <h2>Ordem de Serviço</h2>
      </div>
    </div>
    <div class="margem container">
      <div class="bloco margem">
        <p class="fonte-fraca">OS não encontrada.</p>
        <router-link to="/tarefas/os" class="botao">Voltar à lista</router-link>
      </div>
    </div>
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

const vinculoTexto = computed(() => {
  const o = os.value
  if (!o) return ''
  const partes = []
  if (o.chamadoId && o.chamadoCodigo) partes.push('Chamado ' + o.chamadoCodigo)
  if (o.projetoId && o.projetoCodigo) partes.push('Projeto ' + o.projetoCodigo)
  if (o.posVendaId && o.posVendaCodigo) partes.push('Pós-venda ' + o.posVendaCodigo)
  if (o.opId && o.opCodigo) partes.push('OP ' + o.opCodigo)
  return partes.length ? partes.join(' · ') : ''
})
</script>
