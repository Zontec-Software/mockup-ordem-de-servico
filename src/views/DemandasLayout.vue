<template>
  <main id="main">
    <aside>
      <div class="titulo margem efeito">
        <div class="m-icone">
          <a href="#" class="icone-menu" title="Menu" @click.prevent="toggleEsconde"></a>
        </div>
        <nav class="jm jm-inc none" id="menuIncluir">
          <div class="separador">
            <a href="#">Incluir projeto</a>
          </div>
        </nav>
      </div>
      <nav class="nav-maior separador">
        <router-link to="/demandas/minhas" active-class="ativo">Minhas Demandas</router-link>
        <router-link to="/demandas/deliberacao" active-class="ativo">Deliberação</router-link>
        <a href="#">Demandas Reprovadas</a>
        <a href="#">Motivação x Origem</a>
        <a href="#">Pedidos de Cadastro</a>
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
