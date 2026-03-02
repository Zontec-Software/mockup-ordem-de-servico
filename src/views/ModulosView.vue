<template>
  <section>
    <div class="titulo">
      <div class="container margem alinha-centro">
        <h2>Selecione o módulo</h2>
      </div>
    </div>
    <div class="margem container">
      <div class="grid-3">
        <router-link to="/tarefas" class="card bloco">
          <figure>
            <img src="@/assets/img/office.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Tarefas</figcaption>
          </figure>
        </router-link>
        <router-link to="/demandas" class="card bloco">
          <figure>
            <img src="@/assets/img/logistica.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Demandas</figcaption>
          </figure>
        </router-link>
        <router-link to="/chamados" class="card bloco">
          <figure>
            <img src="@/assets/img/fabrica.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Chamados</figcaption>
          </figure>
        </router-link>
        <router-link to="/pos-venda" class="card bloco">
          <figure>
            <img src="@/assets/img/patio.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Pós-venda</figcaption>
          </figure>
        </router-link>
        <router-link to="/producao" class="card bloco">
          <figure>
            <img src="@/assets/img/fabrica.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Produção</figcaption>
          </figure>
        </router-link>
        <a href="#" class="card bloco">
          <figure>
            <img src="@/assets/img/patio.webp" alt="" @error="imgFallback" />
            <figcaption class="margem abs">Monitoramento</figcaption>
          </figure>
        </a>
      </div>
      <div class="submit m-t">
        <router-link to="/chamados" class="botao"><i class="bi bi-telephone-outbound"></i> Chamados</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import imgFallbackSrc from '@/assets/img/grafismo.svg'


function imgFallback(e) {
  if (e.target && !e.target.dataset.fallback) {
    e.target.src = imgFallbackSrc
    e.target.dataset.fallback = '1'
  }
}
</script>
