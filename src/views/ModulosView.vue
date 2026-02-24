<template>
  <div class="view-modulos">
    <div class="modulos-container">
      <h1 class="modulos-titulo">Selecione o módulo</h1>
      <div class="modulos-grid">
        <div class="modulo-card" data-modulo="compras"><div class="modulo-card-img"><i class="bi bi-cart-check"></i></div><span class="modulo-card-nome">Compras</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card modulo-card--ativo" @click="irPara('/tarefas')"><div class="modulo-card-img"><i class="bi bi-list-task"></i></div><span class="modulo-card-nome">Tarefas</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="monitoramento"><div class="modulo-card-img"><i class="bi bi-graph-up"></i></div><span class="modulo-card-nome">Monitoramento</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="acesso"><div class="modulo-card-img"><i class="bi bi-qr-code-scan"></i></div><span class="modulo-card-nome">Acesso</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card modulo-card--ativo" @click="irPara('/producao')"><div class="modulo-card-img"><i class="bi bi-gear-wide-connected"></i></div><span class="modulo-card-nome">Produção</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="dados-basicos"><div class="modulo-card-img"><i class="bi bi-database"></i></div><span class="modulo-card-nome">Dados Básicos</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="gestao-materiais"><div class="modulo-card-img"><i class="bi bi-boxes"></i></div><span class="modulo-card-nome">Gestão de Materiais</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card modulo-card--ativo" @click="irPara('/pos-venda')"><div class="modulo-card-img"><i class="bi bi-people"></i></div><span class="modulo-card-nome">Fluxo de atendimento ao cliente</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="produtos"><div class="modulo-card-img"><i class="bi bi-box-seam"></i></div><span class="modulo-card-nome">Produtos</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card modulo-card--ativo" @click="irPara('/chamados')"><div class="modulo-card-img"><i class="bi bi-telephone-outbound"></i></div><span class="modulo-card-nome">Chamados</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card modulo-card--ativo" @click="irPara('/demandas')"><div class="modulo-card-img"><i class="bi bi-clipboard2-pulse"></i></div><span class="modulo-card-nome">Demandas</span><div class="modulo-card-bar"></div></div>
        <div class="modulo-card" data-modulo="orcamento"><div class="modulo-card-img"><i class="bi bi-currency-dollar"></i></div><span class="modulo-card-nome">Orçamento</span><div class="modulo-card-bar"></div></div>
      </div>
      <div class="popup-chamados-fixo">
        <router-link to="/chamados" class="btn-popup-chamados" title="Abrir Chamados"><i class="bi bi-telephone-outbound"></i> Chamados</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function irPara(path) {
  router.push(path)
}
</script>

<style scoped>
.view-modulos {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, var(--cor-cinza) 0%, var(--cor-cinza2) 100%);
  padding: 2rem var(--margem);
  box-sizing: border-box;
}
.modulos-container {
  max-width: 72rem;
  margin: 0 auto;
}
.modulos-titulo {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--cor-fonte);
  margin-bottom: 2rem;
}
.modulos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.modulo-card {
  background: var(--cor-bg);
  border: 1px solid var(--cor-cinza2);
  border-radius: 12px;
  overflow: hidden;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  cursor: not-allowed;
  opacity: 0.85;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.modulo-card:hover {
  opacity: 1;
  box-shadow: 0 4px 12px var(--cor-separador);
}
.modulo-card--ativo {
  cursor: pointer;
  opacity: 1;
  border-color: var(--cor-primaria);
}
.modulo-card--ativo:hover {
  box-shadow: 0 6px 16px var(--cor-primaria-media);
}
.modulo-card-img {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(180deg, var(--cor-bg) 0%, var(--cor-cinza) 100%);
  font-size: 2.5rem;
  color: var(--cor-fonte-fraca);
}
.modulo-card--ativo .modulo-card-img {
  color: var(--cor-primaria);
}
.modulo-card-nome {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--cor-fonte);
}
.modulo-card-bar {
  height: 4px;
  background: var(--cor-cinza2);
}
.modulo-card-bar::after {
  content: '';
  display: block;
  height: 100%;
  width: 85%;
  background: linear-gradient(90deg, var(--cor-primaria) 0%, var(--cor-primaria-forte) 100%);
}
.popup-chamados-fixo {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
}
.btn-popup-chamados {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: var(--cor-sucesso);
  color: var(--cor-bg);
  text-decoration: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px var(--cor-separador);
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-popup-chamados:hover {
  color: var(--cor-bg);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--cor-primaria-media);
}
@media (max-width: 900px) {
  .modulos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .modulos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
