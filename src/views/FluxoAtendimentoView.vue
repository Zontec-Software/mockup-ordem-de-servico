<template>
  <main id="main">
    <aside>
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-maior separador">
        <a href="#">Fluxo Antigo</a>
        <a href="#">Clientes</a>
        <a href="#">Oportunidades</a>
        <a href="#">Propostas</a>
        <a href="#">Produção</a>
        <a href="#">Expedição</a>
        <a href="#">Almoxarifado</a>
        <a href="#" class="ativo">Pós-venda</a>
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
          <h2>Pós-Venda</h2>
        </div>
      </div>
      <div class="margem container">
        <div class="submit m-b">
          <button type="button">Cadastrar</button>
          <button type="button" class="acao-secundaria" title="Relatório"><i class="bi bi-file-earmark-text"></i></button>
        </div>
        <div class="bloco margem">
          <table class="tabela">
            <thead>
              <tr>
                <th>Código</th>
                <th>Data Criação</th>
                <th>Cliente CNPJ</th>
                <th>Razão Social</th>
                <th>Origem</th>
                <th>Motivo</th>
                <th>Data Conclusão</th>
                <th>Ações</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pv in posVendaFiltrados" :key="pv.id">
                <td>{{ pv.codigo }}</td>
                <td>{{ pv.dataCriacao }}</td>
                <td>{{ pv.clienteCnpj }}</td>
                <td>{{ pv.razaoSocial }}</td>
                <td>{{ pv.origem }}</td>
                <td>{{ pv.motivo }}</td>
                <td>{{ pv.dataConclusao || '-' }}</td>
                <td>
                  <router-link :to="{ name: 'os-nova-posvenda', params: { posVendaId: pv.id } }" class="botao"><i class="bi bi-clipboard-plus"></i> Abrir OS</router-link>
                </td>
                <td><button type="button" class="acao-secundaria" title="Excluir"><i class="bi bi-trash"></i></button></td>
              </tr>
              <tr v-if="posVendaFiltrados.length === 0">
                <td colspan="9" class="alinha-centro fonte-fraca">Nenhum registro.</td>
              </tr>
            </tbody>
          </table>
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

const posVendaFiltrados = computed(() => {
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (!t) return store.posVenda
  return store.posVenda.filter(pv =>
    (pv.codigo + ' ' + pv.razaoSocial + ' ' + pv.clienteCnpj).toLowerCase().includes(t)
  )
})
</script>
