<template>
  <div class="fluxo-layout view-producao">
    <aside class="fluxo-sidebar">
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-fluxo separador">
        <div class="separador"><a href="#" class="link-nav-fluxo ativo">Gestão de OPs</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Painel Montagem</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Painel Injetora</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Editar apontamento</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Planejamento de injeção</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Cadastro de parâmetros</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Indicadores</a></div>
      </nav>
    </aside>
    <section class="fluxo-conteudo">
      <div class="fluxo-breadcrumb">Painel Injetora &gt; Gestão de Ordens de Produção</div>
      <div class="fluxo-titulo-bar">
        <h2 class="fluxo-titulo">Gestão de Ordens de Produção</h2>
        <div class="fluxo-titulo-acoes">
          <div class="pesquisa fluxo-pesquisa">
            <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
            <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
          </div>
        </div>
      </div>
      <div class="tabs-op">
        <button type="button" class="tab-op" :class="{ ativo: tabOp === 'andamento' }" @click="tabOp = 'andamento'">Em Andamento</button>
        <button type="button" class="tab-op" :class="{ ativo: tabOp === 'concluidas' }" @click="tabOp = 'concluidas'">Concluídas</button>
      </div>
      <div class="fluxo-toolbar">
        <button type="button" class="btn-cadastrar"><i class="bi bi-plus-lg"></i> Criar OP</button>
      </div>
      <div class="bloco margem fluxo-tabela-wrapper">
        <div class="tabela-wrapper">
          <table class="tabela tabela-op">
            <thead>
              <tr>
                <th>OP</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Data Início</th>
                <th>Previsão Conclusão</th>
                <th>Status</th>
                <th class="col-acoes-op">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="op in opsFiltrados" :key="op.id">
                <td>{{ op.op }}</td>
                <td>{{ op.produto }}</td>
                <td>{{ op.quantidade.toLocaleString('pt-BR') }}</td>
                <td>{{ op.dataInicio }}</td>
                <td>{{ op.previsaoConclusao }}</td>
                <td><span class="chip status-chip" :class="op.status === 'Concluída' ? 'status-concluida' : 'status-separacao'">{{ op.status }}</span></td>
                <td>
                  <button type="button" class="acao-secundaria" style="padding: 0.35rem 0.6rem; font-size: 0.8rem;">Ações</button>
                </td>
              </tr>
              <tr v-if="opsFiltrados.length === 0">
                <td colspan="7" class="alinha-centro fonte-fraca">Nenhuma OP.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-t" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;">1</button>
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;">2</button>
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;">3</button>
          <span class="fonte-fraca" style="align-self: center;">...</span>
          <button type="button" class="acao-secundaria" style="padding: 0.4rem 0.6rem;">24</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const pesquisa = ref('')
const tabOp = ref('andamento')

const opsFiltrados = computed(() => {
  let list = store.ops
  if (tabOp.value === 'concluidas') list = list.filter(op => op.status === 'Concluída')
  else list = list.filter(op => op.status !== 'Concluída')
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (t) list = list.filter(op => (op.op + ' ' + op.produto).toLowerCase().includes(t))
  return list
})
</script>

<style scoped>
.col-acoes-op { width: 90px; }
</style>
