<template>
  <div class="fluxo-layout view-tarefas">
    <aside class="fluxo-sidebar">
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent></a>
        </div>
      </div>
      <nav class="nav-fluxo separador">
        <div class="separador">
          <span class="nav-tarefas-contadores"><span class="contador-amarelo">0</span> <span class="contador-azul">0</span> <span class="contador-vermelho">0</span></span>
          <router-link to="/tarefas/os" class="link-nav-tarefas" active-class="ativo">Demandados</router-link>
        </div>
        <div class="separador"><router-link to="/tarefas/projetos" class="link-nav-tarefas" active-class="ativo">Projeto - PRJ</router-link></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">Plano de Ação - PLA</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">PAP (Antigo)</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">PAP (Novo)</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">OS Tablets</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">TNC</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">RAP</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">Rotina</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">Agenda</a></div>
        <div class="separador"><a href="#" class="link-nav-tarefas">Cadastro de temas</a></div>
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
.view-tarefas .nav-tarefas-contadores { display: flex; gap: 4px; margin-right: 8px; }
.view-tarefas .nav-tarefas-contadores .contador-amarelo { width: 8px; height: 8px; border-radius: 2px; background: var(--cor-alerta); }
.view-tarefas .nav-tarefas-contadores .contador-azul { width: 8px; height: 8px; border-radius: 2px; background: var(--cor-primaria); }
.view-tarefas .nav-tarefas-contadores .contador-vermelho { width: 8px; height: 8px; border-radius: 2px; background: var(--cor-erro); }
</style>
