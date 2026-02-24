<template>
  <header>
    <div class="linha alinha-v">
      <div class="header-esquerda alinha-v">
        <router-link to="/" class="header-logo-wrap">
          <span class="header-logo-icon" aria-hidden="true"></span>
          <span class="header-logo-texto"></span>
        </router-link>
        <span v-if="showVoltar" class="header-caret" aria-hidden="true">&#9660;</span>
        <router-link
          v-if="showVoltar"
          to="/"
          class="icone-voltar-modulos"
          title="Voltar aos módulos"
        >
          <i class="bi bi-arrow-left"></i>
        </router-link>
      </div>
      <div class="header-icones m-icone direita alinha-v">
        <div class="pesquisa">
          <input type="text" placeholder="Pesquisar" v-model="pesquisa" />
          <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
        </div>
        <a href="#" class="icone-notif" title="Notificações"></a>
        <a href="#" class="icone-conta" title="Conta"></a>
        <a href="#" class="icone-fechar-header" title="Fechar" @click.prevent><i class="bi bi-x-lg"></i></a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pesquisa = ref('')

const showVoltar = computed(() => route.meta.showHeaderVoltar === true)
</script>

<style scoped>
.header-esquerda {
  gap: 0.25rem;
}
.icone-voltar-modulos {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: var(--cor-fonte);
  text-decoration: none;
  border-radius: 12px;
}
.icone-voltar-modulos:hover {
  color: var(--cor-primaria-forte);
}
.icone-fechar-header {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  color: var(--cor-fonte);
  text-decoration: none;
  border-radius: 12px;
  font-size: 1.25rem;
}
.icone-fechar-header:hover {
  color: var(--cor-primaria-forte);
  box-shadow: 0 0 0 1px var(--cor-separador) inset;
}
</style>
