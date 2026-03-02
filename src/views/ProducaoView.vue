<template>
  <main id="main">
    <aside>
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-maior separador">
        <a href="#" class="ativo">Gestão de OPs</a>
        <a href="#">Painel Montagem</a>
        <a href="#">Painel Injetora</a>
        <a href="#">Editar apontamento</a>
        <a href="#">Planejamento de injeção</a>
        <a href="#">Cadastro de parâmetros</a>
        <a href="#">Indicadores</a>
      </nav>
    </aside>
    <section>
      <div class="titulo">
        <div class="margem container">
          <div class="m-icone direita">
            <div class="pesquisa">
              <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
              <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
            </div>
          </div>
          <h2>Gestão de Ordens de Produção</h2>
        </div>
      </div>
      <div class="margem container">
        <div class="tags m-b">
          <button type="button" :class="{ ativo: tabOp === 'andamento' }" @click="tabOp = 'andamento'">Em Andamento</button>
          <button type="button" :class="{ ativo: tabOp === 'concluidas' }" @click="tabOp = 'concluidas'">Concluídas</button>
        </div>
        <div class="submit m-b"><button type="button">Criar OP</button></div>
        <div class="bloco margem">
          <table class="tabela">
            <thead>
              <tr>
                <th>OP</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Data Início</th>
                <th>Previsão Conclusão</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="op in opsFiltrados" :key="op.id">
                <td>{{ op.op }}</td>
                <td>{{ op.produto }}</td>
                <td>{{ op.quantidade.toLocaleString('pt-BR') }}</td>
                <td>{{ op.dataInicio }}</td>
                <td>{{ op.previsaoConclusao }}</td>
                <td><span class="chip" :class="op.status === 'Concluída' ? 'bg-sucesso' : 'bg-ok'">{{ op.status }}</span></td>
                <td>
                  <router-link :to="{ name: 'os-nova-op', params: { opId: op.id } }" class="botao"><i class="bi bi-clipboard-plus"></i> Abrir OS</router-link>
                </td>
              </tr>
              <tr v-if="opsFiltrados.length === 0">
                <td colspan="7" class="alinha-centro fonte-fraca">Nenhuma OP.</td>
              </tr>
            </tbody>
          </table>
          <div class="paginacao m-t">
            <a href="#" class="ativo">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <span>...</span>
            <a href="#">24</a>
          </div>
        </div>
      </div>
    </section>
  </main>
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
