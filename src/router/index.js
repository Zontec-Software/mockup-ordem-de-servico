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
        path: 'os/:id',
        name: 'os-detalhe',
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
