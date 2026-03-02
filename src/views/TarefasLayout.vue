<template>
  <main id="main">
    <aside>
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent="toggleEsconde"></a>
        </div>
      </div>
      <nav class="nav-maior separador">
        <router-link to="/tarefas/os" active-class="ativo">Demandados</router-link>
        <router-link to="/tarefas/projetos" active-class="ativo">Projeto - PRJ</router-link>
        <a href="#">Plano de Ação - PLA</a>
        <a href="#">PAP (Antigo)</a>
        <a href="#">PAP (Novo)</a>
        <a href="#">OS Tablets</a>
        <a href="#">TNC</a>
        <a href="#">RAP</a>
        <a href="#">Rotina</a>
        <a href="#">Agenda</a>
        <a href="#">Cadastro de temas</a>
      </nav>
    </aside>
    <section>
      <router-view />
    </section>
  </main>
</template>

<script setup>
function toggleEsconde() {
  document.getElementById('main').classList.toggle('esconde')
}
</script>
