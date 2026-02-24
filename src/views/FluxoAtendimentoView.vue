<template>
  <div class="fluxo-layout view-fluxo-atendimento">
    <aside class="fluxo-sidebar">
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-fluxo separador">
        <div class="separador"><a href="#" class="link-nav-fluxo">Fluxo Antigo</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Clientes</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Oportunidades</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Propostas</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Produção</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Expedição</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Almoxarifado</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo ativo">Pós-venda</a></div>
        <div class="separador"><a href="#" class="link-nav-fluxo">Indicadores</a></div>
      </nav>
    </aside>
    <section class="fluxo-conteudo">
      <div class="fluxo-breadcrumb">&gt; Pós-venda</div>
      <div class="fluxo-titulo-bar">
        <h2 class="fluxo-titulo">Pós-Venda</h2>
        <div class="fluxo-titulo-acoes">
          <div class="pesquisa fluxo-pesquisa">
            <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
            <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
          </div>
        </div>
      </div>
      <div class="fluxo-toolbar">
        <button type="button" class="btn-cadastrar"><i class="bi bi-plus-lg"></i> Cadastrar</button>
        <button type="button" class="btn-icone-secundario" title="Relatório"><i class="bi bi-file-earmark-text"></i></button>
      </div>
      <div class="bloco margem fluxo-tabela-wrapper">
        <div class="tabela-wrapper">
          <table class="tabela tabela-pos-venda">
            <thead>
              <tr>
                <th>Código</th>
                <th>Data Criação</th>
                <th>Cliente CNPJ</th>
                <th>Razão Social</th>
                <th>Origem</th>
                <th>Motivo</th>
                <th>Data Conclusão</th>
                <th class="col-excluir">Excluir</th>
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
                <td><button type="button" class="btn-excluir-linha" title="Excluir"><i class="bi bi-trash"></i></button></td>
              </tr>
              <tr v-if="posVendaFiltrados.length === 0">
                <td colspan="8" class="alinha-centro fonte-fraca">Nenhum registro.</td>
              </tr>
            </tbody>
          </table>
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

const posVendaFiltrados = computed(() => {
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (!t) return store.posVenda
  return store.posVenda.filter(pv =>
    (pv.codigo + ' ' + pv.razaoSocial + ' ' + pv.clienteCnpj).toLowerCase().includes(t)
  )
})
</script>

<style scoped>
.col-excluir { width: 60px; text-align: center; }
.btn-excluir-linha { padding: 6px; border: none; background: none; color: var(--cor-fonte-fraca); cursor: pointer; border-radius: 4px; }
.btn-excluir-linha:hover { color: var(--cor-erro); }
</style>
