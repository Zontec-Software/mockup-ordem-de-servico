import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'modulos',
    component: () => import(/* webpackChunkName: "modulos" */ '../views/ModulosView.vue'),
    meta: { showHeaderVoltar: false }
  },
  {
    path: '/demandas',
    component: () => import(/* webpackChunkName: "demandas-layout" */ '../views/DemandasLayout.vue'),
    meta: { showHeaderVoltar: true },
    redirect: '/demandas/minhas',
    children: [
      {
        path: 'minhas',
        name: 'demandas-lista',
        component: () => import(/* webpackChunkName: "demandas" */ '../views/demandas/ListaDemandasView.vue')
      },
      {
        path: 'nova',
        name: 'demanda-nova',
        component: () => import(/* webpackChunkName: "demandas" */ '../views/demandas/FormDemandaView.vue')
      },
      {
        path: 'editar/:id',
        name: 'demanda-editar',
        component: () => import(/* webpackChunkName: "demandas" */ '../views/demandas/FormDemandaView.vue')
      },
      {
        path: 'deliberacao',
        name: 'demandas-deliberacao',
        component: () => import(/* webpackChunkName: "demandas" */ '../views/demandas/DeliberacaoView.vue')
      }
    ]
  },
  {
    path: '/chamados',
    name: 'chamados',
    component: () => import(/* webpackChunkName: "chamados" */ '../views/ChamadosView.vue'),
    meta: { showHeaderVoltar: true }
  },
  {
    path: '/chamados/:id',
    name: 'chamado-detalhe',
    component: () => import(/* webpackChunkName: "chamados" */ '../views/DetalheChamadoView.vue'),
    props: true,
    meta: { showHeaderVoltar: true }
  },
  {
    path: '/tarefas',
    component: () => import(/* webpackChunkName: "tarefas-layout" */ '../views/TarefasLayout.vue'),
    meta: { showHeaderVoltar: true },
    redirect: '/tarefas/os',
    children: [
      {
        path: 'os',
        name: 'tarefas-os',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/ListaOSView.vue')
      },
      {
        path: 'os/nova',
        name: 'os-nova',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/FormOSView.vue')
      },
      {
        path: 'os/nova/chamado/:chamadoId',
        name: 'os-nova-chamado',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/FormOSView.vue'),
        props: true
      },
      {
        path: 'os/nova/projeto/:projetoId',
        name: 'os-nova-projeto',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/FormOSView.vue'),
        props: true
      },
      {
        path: 'os/nova/posvenda/:posVendaId',
        name: 'os-nova-posvenda',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/FormOSView.vue'),
        props: true
      },
      {
        path: 'os/nova/op/:opId',
        name: 'os-nova-op',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/FormOSView.vue'),
        props: true
      },
      {
        path: 'os/editar/:id',
        name: 'os-editar',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/DetalheOSView.vue'),
        props: true
      },
      {
        path: 'projetos',
        name: 'tarefas-projetos',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/ListaProjetosView.vue')
      },
      {
        path: 'projetos/:id',
        name: 'plano-projeto',
        component: () => import(/* webpackChunkName: "tarefas" */ '../views/tarefas/PlanoProjetoView.vue'),
        props: true
      }
    ]
  },
  {
    path: '/pos-venda',
    name: 'pos-venda',
    component: () => import(/* webpackChunkName: "fluxo" */ '../views/FluxoAtendimentoView.vue'),
    meta: { showHeaderVoltar: true }
  },
  {
    path: '/producao',
    name: 'producao',
    component: () => import(/* webpackChunkName: "producao" */ '../views/ProducaoView.vue'),
    meta: { showHeaderVoltar: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
