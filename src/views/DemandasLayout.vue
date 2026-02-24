<template>
  <div class="fluxo-layout layout-demandas">
    <aside class="fluxo-sidebar">
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-maior separador">
        <div class="separador">
          <router-link to="/demandas/minhas" class="link-nav" active-class="ativo">Minhas Demandas</router-link>
        </div>
        <div class="separador">
          <router-link to="/demandas/deliberacao" class="link-nav" active-class="ativo">Deliberação</router-link>
        </div>
        <div class="separador">
          <a href="#" class="link-nav">Demandas Reprovadas</a>
        </div>
        <div class="separador">
          <a href="#" class="link-nav">Motivação x Origem</a>
        </div>
        <div class="separador">
          <a href="#" class="link-nav">Pedidos de Cadastro</a>
        </div>
      </nav>
    </aside>
    <section class="fluxo-conteudo">
      <router-view />
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout-demandas .fluxo-conteudo {
  flex: 1;
  padding: 1rem;
}
.link-nav {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 16px !important;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}
.link-nav.ativo {
  font-weight: 600;
  color: var(--cor-primaria);
}
</style>
