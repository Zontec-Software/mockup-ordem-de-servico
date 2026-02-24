<template>
  <div class="view-chamados fluxo-layout">
    <section class="fluxo-conteudo" style="max-width: 100%;">
      <div class="fluxo-breadcrumb">&gt; Chamados</div>
      <div class="fluxo-titulo-bar">
        <h2 class="fluxo-titulo">Chamados</h2>
        <div class="fluxo-titulo-acoes alinha-v" style="gap: 1rem;">
          <label class="alinha-v" style="gap: 0.25rem; margin: 0;">
            <span class="fonte-fraca" style="font-size: 0.9rem;">Simular usuário:</span>
            <select v-model="usuarioId" @change="store.setUsuario(usuarioId)">
              <option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }}</option>
            </select>
          </label>
          <div class="pesquisa fluxo-pesquisa">
            <input v-model="pesquisa" type="text" placeholder="Pesquisar" />
            <a href="#" class="icone-pesquisa" title="Pesquisar" @click.prevent></a>
          </div>
        </div>
      </div>
      <div class="fluxo-toolbar chamados-toolbar">
        <button type="button" class="btn-cadastrar" @click="abrirModalNovoChamado"><i class="bi bi-plus-lg"></i> Novo Chamado</button>
      </div>

      <!-- Lista de chamados -->
      <div v-show="!chamadoDetalhe" id="listaChamados" class="bloco margem fluxo-tabela-wrapper">
        <div class="tabela-wrapper">
          <table class="tabela tabela-chamados">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Classificação</th>
                <th>Solicitante</th>
                <th>Data</th>
                <th>Status</th>
                <th>Responsável</th>
                <th class="col-acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="c in chamadosFiltrados"
                :key="c.id"
                class="tr-chamado-clicavel"
                @click="abrirDetalheChamado(c)"
              >
                <td>{{ c.codigo }}</td>
                <td>{{ c.tipoNome }}</td>
                <td>{{ c.classificacaoNome || '-' }}</td>
                <td>{{ c.solicitante }}</td>
                <td>{{ c.dataCriacao }}</td>
                <td><span class="chip status-chip status-analise">{{ c.status }}</span></td>
                <td>{{ c.responsavel || c.tecnicoNome || '-' }}</td>
                <td class="col-acoes" @click.stop>
                  <button
                    v-if="store.isLider"
                    type="button"
                    class="btn-acao-chamado-linha"
                    @click="abrirModalAcoesChamado(c)"
                  >
                    Ações
                  </button>
                </td>
              </tr>
              <tr v-if="chamadosFiltrados.length === 0">
                <td colspan="8" class="alinha-centro fonte-fraca">Nenhum chamado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detalhe do chamado (inline) -->
      <div v-if="chamadoDetalhe" class="bloco margem detalhe-chamado">
        <a href="#" class="link-voltar-posvenda" @click.prevent="chamadoDetalhe = null"><i class="bi bi-arrow-left"></i> Voltar aos Chamados</a>
        <div class="chamado-detale-cabecalho m-b">
          <h3 class="fluxo-titulo">{{ chamadoDetalhe.codigo }} — {{ chamadoDetalhe.tipoNome }}</h3>
          <p class="fonte-fraca">Status: <strong>{{ chamadoDetalhe.status }}</strong> · Solicitante: {{ chamadoDetalhe.solicitante }} · Responsável: {{ chamadoDetalhe.responsavel || chamadoDetalhe.tecnicoNome || '-' }}</p>
          <p class="m-t">{{ chamadoDetalhe.descricao }}</p>
        </div>
        <div v-if="store.isSolicitante" class="chamado-detale-comentarios m-b">
          <h4 class="subtitulo-secao">Comentários</h4>
          <div v-if="(chamadoDetalhe.comentarios || []).length === 0" class="fonte-fraca">Nenhum comentário.</div>
          <div v-else class="lista-comentarios m-b">
            <p v-for="(co, i) in (chamadoDetalhe.comentarios || [])" :key="i"><strong>{{ co.autor || '-' }}</strong> ({{ co.data || '-' }}): {{ co.texto || '' }}</p>
          </div>
          <div class="m-t">
            <label for="novoComentarioChamado">Novo comentário</label>
            <textarea id="novoComentarioChamado" v-model="novoComentarioTexto" rows="2" placeholder="Escreva um comentário..."></textarea>
            <button type="button" class="btn-cadastrar m-t" @click="enviarComentario">Enviar</button>
          </div>
        </div>
        <div v-if="store.isLider || store.isTecnico" class="chamado-detale-tarefas m-b">
          <h4 class="subtitulo-secao">{{ store.isTecnico ? 'Minhas tarefas' : 'Tarefas' }}</h4>
          <div v-if="store.isLider || store.isTecnico" class="m-b">
            <button type="button" class="btn-adicionar-item-secundario" @click="abrirModalNovaTarefaChamado(chamadoDetalhe)"><i class="bi bi-plus-lg"></i> Adicionar tarefa</button>
          </div>
          <div class="tabela-wrapper">
            <table class="tabela tabela-tarefas-chamado">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Responsável</th>
                  <th>Origem</th>
                  <th>Entrega</th>
                  <th>Sprint</th>
                  <th>Descrição</th>
                  <th>H.P.</th>
                  <th>Início Previsto</th>
                  <th>Fim Previsto</th>
                  <th>Status</th>
                  <th v-if="store.isLider"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, idx) in tarefasParaTabela" :key="idx">
                  <td>{{ t.numero || '-' }}</td>
                  <td>{{ t.responsavelNome || '-' }}</td>
                  <td class="desc">{{ (t.origem || '-').substring(0, 40) }}{{ (t.origem || '').length > 40 ? '...' : '' }}</td>
                  <td>{{ t.entrega || '-' }}</td>
                  <td>{{ t.sprint || '-' }}</td>
                  <td class="desc">{{ (t.descricao || '-').substring(0, 80) }}{{ (t.descricao || '').length > 80 ? '...' : '' }}</td>
                  <td>{{ t.hp ?? '-' }}</td>
                  <td>{{ t.inicioPrevisto || '-' }}</td>
                  <td>{{ t.fimPrevisto || '-' }}</td>
                  <td>
                    <template v-if="store.isLider">
                      <select class="select-status-tarefa" :value="t.status" @change="atualizarStatusTarefa(idx, $event.target.value)">
                        <option v-for="s in STATUS_TAREFA" :key="s" :value="s">{{ s }}</option>
                      </select>
                    </template>
                    <template v-else>
                      <span class="chip status-chip">{{ t.status || '-' }}</span>
                    </template>
                  </td>
                  <td v-if="store.isLider">
                    <button type="button" class="btn-excluir-linha" title="Remover" @click="excluirTarefa(idx)"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr v-if="!tarefasParaTabela.length">
                  <td :colspan="store.isLider ? 11 : 10" class="alinha-centro fonte-fraca">Nenhuma tarefa.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="store.isLider" class="chamado-detale-acoes-lider m-b">
          <button type="button" class="btn-cadastrar" @click="abrirModalAcoesChamado(chamadoDetalhe)"><i class="bi bi-gear"></i> Ações do Chamado</button>
        </div>
      </div>
    </section>

    <!-- Modal Novo Chamado -->
    <Teleport to="body">
      <div
        class="modal-mask"
        :aria-hidden="!modalNovoChamado"
        @click.self="fecharModalNovoChamado"
      >
        <div v-show="modalNovoChamado" class="modal-content jm margem" role="dialog" aria-modal="true">
          <h3 class="m-b">Novo Chamado</h3>
          <form @submit.prevent="salvarNovoChamado">
            <fieldset>
              <label for="chamadoTipo">Tipo do Chamado *</label>
              <select id="chamadoTipo" v-model="formChamado.tipoId" required>
                <option value="">Selecione o tipo</option>
                <option v-for="t in store.TIPOS_CHAMADO" :key="t.id" :value="t.id">{{ t.nome }}</option>
              </select>
            </fieldset>
            <fieldset v-if="classificacoesTipo.length">
              <label for="chamadoClassificacao">Classificação</label>
              <select id="chamadoClassificacao" v-model="formChamado.classificacaoId">
                <option value="">—</option>
                <option v-for="cl in classificacoesTipo" :key="cl.id" :value="cl.id">{{ cl.nome }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label for="chamadoDescricao">Descrição *</label>
              <textarea id="chamadoDescricao" v-model="formChamado.descricao" rows="4" required placeholder="Descreva o chamado"></textarea>
            </fieldset>
            <div class="submit direita margem-topo">
              <button type="button" class="acao-secundaria" @click="fecharModalNovoChamado">Cancelar</button>
              <button type="submit">Enviar Chamado</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Modal Ações do Chamado -->
    <Teleport to="body">
      <div
        class="modal-mask"
        :aria-hidden="!modalAcoesChamado"
        @click.self="fecharModalAcoesChamado"
      >
        <div v-show="modalAcoesChamado" class="modal-content jm margem" role="dialog" aria-modal="true">
          <h3 class="m-b">Ações do Chamado</h3>
          <p v-if="chamadoEmAcoes" class="fonte-fraca m-b">{{ chamadoEmAcoes.codigo }} — {{ chamadoEmAcoes.tipoNome || '' }} — {{ chamadoEmAcoes.status }}</p>
          <div class="acoes-chamado-botoes">
            <button type="button" class="btn-acao-chamado" @click="abrirModalAtribuirTecnico"><i class="bi bi-person-plus"></i> Atribuir para técnico</button>
            <button type="button" class="btn-acao-chamado" @click="abrirModalOutroSetor"><i class="bi bi-arrow-right-circle"></i> Atribuir para outro setor</button>
            <button type="button" class="btn-acao-chamado btn-acao-chamado-primario" @click="chamadoAbrirOS"><i class="bi bi-clipboard-plus"></i> Abrir Ordem de Serviço</button>
          </div>
          <div class="submit direita margem-topo">
            <button type="button" class="acao-secundaria" @click="fecharModalAcoesChamado">Fechar</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Atribuir Técnico -->
    <Teleport to="body">
      <div
        class="modal-mask"
        :aria-hidden="!modalAtribuirTecnico"
        @click.self="fecharModalAtribuirTecnico"
      >
        <div v-show="modalAtribuirTecnico" class="modal-content jm margem" role="dialog" aria-modal="true">
          <h3 class="m-b">Atribuir para técnico</h3>
          <p v-if="chamadoEmAcoes" class="fonte-fraca m-b">{{ chamadoEmAcoes.codigo }} — {{ chamadoEmAcoes.tipoNome || '' }}</p>
          <form @submit.prevent="salvarAtribuirTecnico">
            <fieldset>
              <label for="tecnicoChamadoSelect">Técnico</label>
              <select id="tecnicoChamadoSelect" v-model="formAtribuir.tecnicoId" required>
                <option value="">Selecione o técnico</option>
                <option v-for="t in tecnicosDoSetor" :key="t.id" :value="t.id">{{ t.nome }}</option>
              </select>
            </fieldset>
            <div class="submit direita margem-topo">
              <button type="button" class="acao-secundaria" @click="fecharModalAtribuirTecnico">Cancelar</button>
              <button type="submit">Atribuir</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Modal Outro Setor -->
    <Teleport to="body">
      <div
        class="modal-mask"
        :aria-hidden="!modalOutroSetor"
        @click.self="fecharModalOutroSetor"
      >
        <div v-show="modalOutroSetor" class="modal-content jm margem" role="dialog" aria-modal="true">
          <h3 class="m-b">Atribuir para outro setor</h3>
          <p v-if="chamadoEmAcoes" class="fonte-fraca m-b">{{ chamadoEmAcoes.codigo }} — Atribuir para outro setor</p>
          <form @submit.prevent="salvarOutroSetor">
            <fieldset>
              <label for="outroSetorSelect">Novo setor</label>
              <select id="outroSetorSelect" v-model="formOutroSetor.setorId" required>
                <option value="">Selecione o setor</option>
                <option v-for="s in outrosSetores" :key="s.id" :value="s.id">{{ s.nome }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label for="outroSetorJustificativa">Justificativa *</label>
              <textarea id="outroSetorJustificativa" v-model="formOutroSetor.justificativa" rows="4" required placeholder="Informe a justificativa"></textarea>
            </fieldset>
            <div class="submit direita margem-topo">
              <button type="button" class="acao-secundaria" @click="fecharModalOutroSetor">Cancelar</button>
              <button type="submit">Atribuir</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Modal Nova Tarefa (chamado) -->
    <Teleport to="body">
      <div
        class="modal-mask"
        :aria-hidden="!modalNovaTarefaChamado"
        @click.self="fecharModalNovaTarefaChamado"
      >
        <div v-show="modalNovaTarefaChamado" class="modal-content jm margem" role="dialog" aria-modal="true" style="max-width: 560px;">
          <h3 class="m-b">Adicionar tarefa ao chamado</h3>
          <form @submit.prevent="salvarNovaTarefaChamado">
            <fieldset><label for="tarefaNumero">N°</label><input id="tarefaNumero" v-model="formTarefa.numero" type="text" placeholder="Ex: História de usuário - 171" /></fieldset>
            <fieldset><label for="tarefaResponsavel">Responsável</label><select id="tarefaResponsavel" v-model="formTarefa.responsavelId"><option value="">Selecione</option><option v-for="u in tecnicosDoSetorTarefa" :key="u.id" :value="u.id">{{ u.nome }}</option></select></fieldset>
            <fieldset><label for="tarefaOrigem">Origem</label><input id="tarefaOrigem" v-model="formTarefa.origem" type="text" placeholder="Ex: PCM240223 Thalamus - Tarefas" /></fieldset>
            <fieldset><label for="tarefaEntrega">Entrega</label><input id="tarefaEntrega" v-model="formTarefa.entrega" type="text" placeholder="Ex: Evolução 2.0" /></fieldset>
            <fieldset><label for="tarefaSprint">Sprint</label><input id="tarefaSprint" v-model="formTarefa.sprint" type="text" placeholder="Ex: Backlogs" /></fieldset>
            <fieldset><label for="tarefaDescricao">Descrição</label><textarea id="tarefaDescricao" v-model="formTarefa.descricao" rows="3" placeholder="Descrição da tarefa"></textarea></fieldset>
            <fieldset><label for="tarefaHp">H.P.</label><input id="tarefaHp" v-model.number="formTarefa.hp" type="number" min="0" /></fieldset>
            <fieldset><label for="tarefaInicioPrevisto">Início Previsto</label><input id="tarefaInicioPrevisto" v-model="formTarefa.inicioPrevisto" type="text" placeholder="dd/mm/aaaa" /></fieldset>
            <fieldset><label for="tarefaFimPrevisto">Fim Previsto</label><input id="tarefaFimPrevisto" v-model="formTarefa.fimPrevisto" type="text" placeholder="dd/mm/aaaa" /></fieldset>
            <fieldset><label for="tarefaStatus">Status</label><select id="tarefaStatus" v-model="formTarefa.status"><option v-for="s in STATUS_TAREFA" :key="s" :value="s">{{ s }}</option></select></fieldset>
            <div class="submit direita margem-topo">
              <button type="button" class="acao-secundaria" @click="fecharModalNovaTarefaChamado">Cancelar</button>
              <button type="submit">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'
import { STATUS_TAREFA } from '@/data/constants'

const store = useAppStore()
const { chamados: chamadosRef, proximoChamado: proximoChamadoRef } = storeToRefs(store)
const usuarioId = ref(store.usuarioAtualId)
const pesquisa = ref('')

const chamadoDetalhe = ref(null)
const novoComentarioTexto = ref('')
const modalNovoChamado = ref(false)
const modalAcoesChamado = ref(false)
const modalAtribuirTecnico = ref(false)
const modalOutroSetor = ref(false)
const modalNovaTarefaChamado = ref(false)
const chamadoEmAcoes = ref(null)
const chamadoParaTarefa = ref(null)

const formChamado = ref({ tipoId: '', classificacaoId: '', descricao: '' })
const formAtribuir = ref({ tecnicoId: '' })
const formOutroSetor = ref({ setorId: '', justificativa: '' })
const formTarefa = ref({
  numero: '', responsavelId: '', origem: '', entrega: '', sprint: '', descricao: '', hp: 0,
  inicioPrevisto: '', fimPrevisto: '', status: 'A iniciar'
})

const classificacoesTipo = computed(() => {
  if (!formChamado.value.tipoId) return []
  return store.getClassificacoesPorTipo(formChamado.value.tipoId)
})

const chamadosPorPerfil = computed(() => {
  const u = store.usuarioAtual
  if (!u) return []
  let lista = [...store.chamados]
  if (u.papel === 'solicitante') return lista.filter(c => c.solicitanteId === store.usuarioAtualId)
  if (u.papel === 'lider') return lista.filter(c => c.setorId === u.setorId)
  if (u.papel === 'tecnico') return lista.filter(c => c.tecnicoId === store.usuarioAtualId)
  return lista
})

const chamadosFiltrados = computed(() => {
  const t = (pesquisa.value || '').trim().toLowerCase()
  if (!t) return chamadosPorPerfil.value
  return chamadosPorPerfil.value.filter(c =>
    (c.codigo + ' ' + (c.tipoNome || '') + ' ' + (c.solicitante || '') + ' ' + (c.descricao || '')).toLowerCase().includes(t)
  )
})

const tecnicosDoSetor = computed(() => {
  if (!chamadoEmAcoes.value || !chamadoEmAcoes.value.setorId) return []
  return store.USUARIOS.filter(u => u.papel === 'tecnico' && u.setorId === chamadoEmAcoes.value.setorId)
})

const outrosSetores = computed(() => {
  if (!chamadoEmAcoes.value) return store.SETORES
  return store.SETORES.filter(s => s.id !== chamadoEmAcoes.value.setorId)
})

const tecnicosDoSetorTarefa = computed(() => {
  if (!chamadoParaTarefa.value || !chamadoParaTarefa.value.setorId) return []
  return store.USUARIOS.filter(u => u.papel === 'tecnico' && u.setorId === chamadoParaTarefa.value.setorId)
})

const tarefasParaTabela = computed(() => {
  const list = chamadoDetalhe.value?.tarefas || []
  if (store.isTecnico) return list.filter(t => t.responsavelId === store.usuarioAtualId)
  return list
})

watch(modalNovoChamado, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(modalAcoesChamado, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(modalAtribuirTecnico, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(modalOutroSetor, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(modalNovaTarefaChamado, (v) => { document.body.style.overflow = v ? 'hidden' : '' })

function abrirModalNovoChamado() {
  formChamado.value = { tipoId: '', classificacaoId: '', descricao: '' }
  modalNovoChamado.value = true
}

function fecharModalNovoChamado() {
  modalNovoChamado.value = false
}

function salvarNovoChamado() {
  const tipo = store.TIPOS_CHAMADO.find(t => t.id === formChamado.value.tipoId)
  const listClass = store.getClassificacoesPorTipo(formChamado.value.tipoId)
  const classificacao = listClass.find(c => c.id === formChamado.value.classificacaoId)
  const id = store.proximoChamado
  const codigo = 'CHAM' + String(id).padStart(6, '0')
  const novoChamado = {
    id,
    codigo,
    tipoId: formChamado.value.tipoId,
    tipoNome: tipo ? tipo.nome : formChamado.value.tipoId,
    classificacaoId: formChamado.value.classificacaoId || null,
    classificacaoNome: classificacao ? classificacao.nome : null,
    descricao: formChamado.value.descricao.trim(),
    solicitante: store.usuarioAtual.nome,
    solicitanteId: store.usuarioAtualId,
    setorId: tipo ? tipo.setorId : null,
    tecnicoId: null,
    tecnicoNome: null,
    dataCriacao: formatarDataCurta(new Date()),
    status: 'Em análise',
    responsavel: null,
    tarefas: [],
    comentarios: [],
    origemExterna: null
  }
  chamadosRef.value = [novoChamado, ...chamadosRef.value]
  proximoChamadoRef.value = id + 1
  fecharModalNovoChamado()
  alert('Chamado registrado com sucesso.')
}

function abrirDetalheChamado(c) {
  chamadoDetalhe.value = c
}

function enviarComentario() {
  const texto = (novoComentarioTexto.value || '').trim()
  if (!texto || !chamadoDetalhe.value) return
  const c = store.getChamadoById(chamadoDetalhe.value.id)
  if (!c) return
  if (!c.comentarios) c.comentarios = []
  c.comentarios.push({
    autor: store.usuarioAtual?.nome || store.USUARIOS[0]?.nome,
    data: formatarDataCurta(new Date()),
    texto
  })
  novoComentarioTexto.value = ''
  chamadoDetalhe.value = c
}

function abrirModalAcoesChamado(c) {
  chamadoEmAcoes.value = c
  modalAtribuirTecnico.value = false
  modalOutroSetor.value = false
  modalAcoesChamado.value = true
}

function fecharModalAcoesChamado() {
  chamadoEmAcoes.value = null
  modalAcoesChamado.value = false
}

function abrirModalAtribuirTecnico() {
  modalAcoesChamado.value = false
  formAtribuir.value = { tecnicoId: '' }
  modalAtribuirTecnico.value = true
}

function fecharModalAtribuirTecnico() {
  modalAtribuirTecnico.value = false
  chamadoEmAcoes.value = null
}

function salvarAtribuirTecnico() {
  if (!chamadoEmAcoes.value || !formAtribuir.value.tecnicoId) return
  const tecnico = store.USUARIOS.find(u => u.id === parseInt(formAtribuir.value.tecnicoId, 10))
  const c = store.getChamadoById(chamadoEmAcoes.value.id)
  if (c) {
    c.tecnicoId = parseInt(formAtribuir.value.tecnicoId, 10)
    c.tecnicoNome = tecnico ? tecnico.nome : null
    c.responsavel = c.tecnicoNome
  }
  fecharModalAtribuirTecnico()
  if (chamadoDetalhe.value && chamadoDetalhe.value.id === chamadoEmAcoes.value.id) chamadoDetalhe.value = c || chamadoDetalhe.value
  alert('Técnico atribuído.')
}

function abrirModalOutroSetor() {
  modalAcoesChamado.value = false
  formOutroSetor.value = { setorId: '', justificativa: '' }
  modalOutroSetor.value = true
}

function fecharModalOutroSetor() {
  modalOutroSetor.value = false
  chamadoEmAcoes.value = null
}

function salvarOutroSetor() {
  if (!chamadoEmAcoes.value || !formOutroSetor.value.setorId || !formOutroSetor.value.justificativa.trim()) {
    alert('Selecione o setor e informe a justificativa.')
    return
  }
  const setor = store.SETORES.find(s => s.id === parseInt(formOutroSetor.value.setorId, 10))
  const c = store.getChamadoById(chamadoEmAcoes.value.id)
  if (c) {
    c.setorId = parseInt(formOutroSetor.value.setorId, 10)
    c.atribuicaoOutroSetor = { setorNome: setor ? setor.nome : '', justificativa: formOutroSetor.value.justificativa, data: formatarDataCurta(new Date()) }
  }
  fecharModalOutroSetor()
  if (chamadoDetalhe.value && chamadoDetalhe.value.id === chamadoEmAcoes.value.id) chamadoDetalhe.value = c || chamadoDetalhe.value
  alert('Chamado atribuído ao setor.')
}

function chamadoAbrirOS() {
  fecharModalAcoesChamado()
  // Navegar para nova OS vinculada ao chamado (mock: só fechar)
  alert('Abrir OS vinculada ao chamado — em desenvolvimento.')
}

function abrirModalNovaTarefaChamado(c) {
  chamadoParaTarefa.value = c
  const u = store.usuarioAtual
  const tecnicos = store.USUARIOS.filter(t => t.papel === 'tecnico' && t.setorId === c.setorId)
  const preSelect = (u?.papel === 'tecnico' && tecnicos.some(t => t.id === store.usuarioAtualId)) ? store.usuarioAtualId : ''
  formTarefa.value = {
    numero: '', responsavelId: preSelect, origem: '', entrega: '', sprint: '',
    descricao: '', hp: 0, inicioPrevisto: '', fimPrevisto: '', status: 'A iniciar'
  }
  modalNovaTarefaChamado.value = true
}

function atualizarStatusTarefa(idx, valor) {
  if (!chamadoDetalhe.value) return
  const c = store.getChamadoById(chamadoDetalhe.value.id)
  if (!c?.tarefas || !c.tarefas[idx]) return
  c.tarefas[idx].status = valor
  chamadoDetalhe.value = c
}

function excluirTarefa(idx) {
  if (!chamadoDetalhe.value) return
  const c = store.getChamadoById(chamadoDetalhe.value.id)
  if (!c?.tarefas) return
  c.tarefas.splice(idx, 1)
  chamadoDetalhe.value = c
}

function fecharModalNovaTarefaChamado() {
  chamadoParaTarefa.value = null
  modalNovaTarefaChamado.value = false
}

function salvarNovaTarefaChamado() {
  if (!chamadoParaTarefa.value) return
  const c = store.getChamadoById(chamadoParaTarefa.value.id)
  if (!c) return
  if (!c.tarefas) c.tarefas = []
  const responsavel = store.USUARIOS.find(u => u.id === parseInt(formTarefa.value.responsavelId, 10))
  c.tarefas.push({
    numero: formTarefa.value.numero.trim() || '-',
    responsavelId: formTarefa.value.responsavelId ? parseInt(formTarefa.value.responsavelId, 10) : null,
    responsavelNome: responsavel ? responsavel.nome : '-',
    origem: (formTarefa.value.origem || '').trim() || '-',
    entrega: (formTarefa.value.entrega || '').trim() || '-',
    sprint: (formTarefa.value.sprint || '').trim() || '-',
    descricao: (formTarefa.value.descricao || '').trim() || '-',
    hp: formTarefa.value.hp || 0,
    inicioPrevisto: (formTarefa.value.inicioPrevisto || '').trim() || '-',
    fimPrevisto: (formTarefa.value.fimPrevisto || '').trim() || '-',
    status: formTarefa.value.status || 'A iniciar'
  })
  fecharModalNovaTarefaChamado()
  if (chamadoDetalhe.value && chamadoDetalhe.value.id === c.id) chamadoDetalhe.value = c
}
</script>

<style scoped>
.col-acoes { width: 90px; }
.tr-chamado-clicavel { cursor: pointer; }
.tr-chamado-clicavel:hover { background: var(--cor-primaria-fraca); }
.btn-acao-chamado-linha {
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  border: 1px solid var(--cor-cinza2);
  background: var(--cor-bg);
  border-radius: 6px;
  cursor: pointer;
}
.btn-acao-chamado-linha:hover { background: var(--cor-cinza); }
.acoes-chamado-botoes { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
.btn-acao-chamado {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1rem; border: 1px solid var(--cor-cinza2); background: var(--cor-bg); border-radius: 8px; cursor: pointer; font-size: 0.95rem; text-align: left;
  color: var(--cor-fonte);
}
.btn-acao-chamado:hover { background: var(--cor-cinza); }
.btn-acao-chamado-primario { background: var(--cor-primaria); color: var(--cor-bg); border-color: var(--cor-primaria); }
.btn-acao-chamado-primario:hover { background: var(--cor-primaria-forte); color: var(--cor-bg); }
fieldset { margin-bottom: 1rem; }
fieldset label { display: block; margin-bottom: 0.25rem; font-size: 0.9rem; }
.detalhe-chamado .chamado-detale-cabecalho { padding: 0.5rem 0; }
.desc { max-width: 200px; }
.select-status-tarefa { min-width: 120px; padding: 0.25rem; font-size: 0.9rem; }
.btn-excluir-linha { padding: 0.25rem; border: none; background: transparent; cursor: pointer; color: var(--cor-fonte-fraca); }
.btn-excluir-linha:hover { color: var(--cor-erro); }
</style>
