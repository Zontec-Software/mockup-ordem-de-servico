<template>
  <template v-if="chamado">
    <div class="titulo">
      <div class="margem container alinha-v">
        <router-link to="/chamados" class="botao">Voltar aos Chamados</router-link>
        <h2>{{ chamado.codigo }} — {{ chamado.tipoNome }}</h2>
      </div>
    </div>
    <div class="margem container">
      <p class="fonte-fraca m-b">&gt; Chamados</p>

      <div class="bloco margem">
        <h3 class="m-b">Dados do Chamado</h3>
        <fieldset class="grid-4 bloco2 margem">
          <div><label>Código</label><input type="text" :value="chamado.codigo" readonly /></div>
          <div><label>Tipo</label><input type="text" :value="chamado.tipoNome" readonly /></div>
          <div><label>Status</label><input type="text" :value="chamado.status" readonly /></div>
          <div><label>Solicitante</label><input type="text" :value="chamado.solicitante" readonly /></div>
          <div><label>Responsável</label><input type="text" :value="chamado.responsavel || chamado.tecnicoNome || '-'" readonly /></div>
          <div class="col-2"><label>Descrição</label><textarea rows="4" :value="chamado.descricao" readonly></textarea></div>
        </fieldset>
      </div>

      <div v-if="store.isSolicitante" class="bloco margem">
        <h3 class="m-b">Comentários</h3>
        <div v-if="(chamado.comentarios || []).length === 0" class="fonte-fraca m-b">Nenhum comentário.</div>
        <div v-else class="m-b">
          <p v-for="(co, i) in (chamado.comentarios || [])" :key="i" class="m-b"><strong>{{ co.autor || '-' }}</strong> ({{ co.data || '-' }}): {{ co.texto || '' }}</p>
        </div>
        <fieldset class="margem">
          <label for="novoComentarioChamado">Novo comentário</label>
          <textarea id="novoComentarioChamado" v-model="novoComentarioTexto" rows="3" placeholder="Escreva um comentário..."></textarea>
        </fieldset>
        <div class="submit">
          <button type="button" @click="enviarComentario">Enviar</button>
        </div>
      </div>

      <div v-if="store.isLider || store.isTecnico" class="bloco margem">
        <h3 class="m-b">{{ store.isTecnico ? 'Minhas tarefas' : 'Tarefas' }}</h3>
        <div class="submit m-b">
          <button type="button" class="acao-secundaria" @click="abrirModalNovaTarefaChamado"><i class="bi bi-plus-lg"></i> Adicionar tarefa</button>
        </div>
        <table class="tabela">
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
              <td>{{ (t.origem || '-').substring(0, 40) }}{{ (t.origem || '').length > 40 ? '...' : '' }}</td>
              <td>{{ t.entrega || '-' }}</td>
              <td>{{ t.sprint || '-' }}</td>
              <td>{{ (t.descricao || '-').substring(0, 80) }}{{ (t.descricao || '').length > 80 ? '...' : '' }}</td>
              <td>{{ t.hp ?? '-' }}</td>
              <td>{{ t.inicioPrevisto || '-' }}</td>
              <td>{{ t.fimPrevisto || '-' }}</td>
              <td>
                <template v-if="store.isLider">
                  <select :value="t.status" @change="atualizarStatusTarefa(idx, $event.target.value)">
                    <option v-for="s in STATUS_TAREFA" :key="s" :value="s">{{ s }}</option>
                  </select>
                </template>
                <template v-else>
                  <span class="chip">{{ t.status || '-' }}</span>
                </template>
              </td>
              <td v-if="store.isLider">
                <button type="button" class="acao-secundaria" title="Remover" @click="excluirTarefa(idx)"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr v-if="!tarefasParaTabela.length">
              <td :colspan="store.isLider ? 11 : 10" class="alinha-centro fonte-fraca">Nenhuma tarefa.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="store.isLider" class="submit m-t">
        <button type="button" class="botao" @click="abrirModalAcoesChamado"><i class="bi bi-gear"></i> Ações do Chamado</button>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="titulo">
      <div class="margem container">
        <h2>Chamado</h2>
      </div>
    </div>
    <div class="margem container">
      <div class="bloco margem">
        <p class="fonte-fraca">Chamado não encontrado.</p>
        <router-link to="/chamados" class="botao">Voltar aos Chamados</router-link>
      </div>
    </div>
  </template>

  <Teleport to="body">
    <div v-show="modalAcoesChamado" class="modal-mask" @click.self="fecharModalAcoesChamado">
      <div class="jm margem" style="min-width: 28rem" @click.stop>
        <h3 class="m-b alinha-centro">Ações do Chamado</h3>
        <p v-if="chamado" class="fonte-fraca m-b">{{ chamado.codigo }} — {{ chamado.tipoNome || '' }} — {{ chamado.status }}</p>
        <div class="submit m-b">
          <button type="button" class="acao-secundaria" @click="abrirModalAtribuirTecnico"><i class="bi bi-person-plus"></i> Atribuir para técnico</button>
          <button type="button" class="acao-secundaria" @click="abrirModalOutroSetor"><i class="bi bi-arrow-right-circle"></i> Atribuir para outro setor</button>
          <button type="button" @click="chamadoAbrirOS"><i class="bi bi-clipboard-plus"></i> Abrir Ordem de Serviço</button>
        </div>
        <div class="submit direita">
          <button type="button" class="acao-secundaria" @click="fecharModalAcoesChamado">Fechar</button>
        </div>
      </div>
    </div>

    <div v-show="modalAtribuirTecnico" class="modal-mask" @click.self="fecharModalAtribuirTecnico">
      <div class="jm margem" style="min-width: 28rem" @click.stop>
        <h3 class="m-b alinha-centro">Atribuir para técnico</h3>
        <p v-if="chamado" class="fonte-fraca m-b">{{ chamado.codigo }} — {{ chamado.tipoNome || '' }}</p>
        <form @submit.prevent="salvarAtribuirTecnico">
          <fieldset class="margem">
            <label for="tecnicoChamadoSelect">Técnico</label>
            <select id="tecnicoChamadoSelect" v-model="formAtribuir.tecnicoId" required>
              <option value="">Selecione o técnico</option>
              <option v-for="t in tecnicosDoSetor" :key="t.id" :value="t.id">{{ t.nome }}</option>
            </select>
          </fieldset>
          <div class="submit direita">
            <button type="button" class="acao-secundaria" @click="fecharModalAtribuirTecnico">Cancelar</button>
            <button type="submit">Atribuir</button>
          </div>
        </form>
      </div>
    </div>

    <div v-show="modalOutroSetor" class="modal-mask" @click.self="fecharModalOutroSetor">
      <div class="jm margem" style="min-width: 30rem; max-height: 90vh; overflow: auto" @click.stop>
        <h3 class="m-b alinha-centro">Atribuir para outro setor</h3>
        <p v-if="chamado" class="fonte-fraca m-b">{{ chamado.codigo }} — Atribuir para outro setor</p>
        <form @submit.prevent="salvarOutroSetor">
          <fieldset class="grid-4 bloco2 margem">
            <div>
              <label for="outroSetorSelect">Novo setor</label>
              <select id="outroSetorSelect" v-model="formOutroSetor.setorId" required>
                <option value="">Selecione o setor</option>
                <option v-for="s in outrosSetores" :key="s.id" :value="s.id">{{ s.nome }}</option>
              </select>
            </div>
            <div class="col-2">
              <label for="outroSetorJustificativa">Justificativa *</label>
              <textarea id="outroSetorJustificativa" v-model="formOutroSetor.justificativa" rows="4" required placeholder="Informe a justificativa"></textarea>
            </div>
          </fieldset>
          <div class="submit direita">
            <button type="button" class="acao-secundaria" @click="fecharModalOutroSetor">Cancelar</button>
            <button type="submit">Atribuir</button>
          </div>
        </form>
      </div>
    </div>

    <div v-show="modalNovaTarefaChamado" class="modal-mask" @click.self="fecharModalNovaTarefaChamado">
      <div class="jm margem" style="min-width: 32rem; max-height: 90vh; overflow: auto" @click.stop>
        <h3 class="m-b alinha-centro">Adicionar tarefa ao chamado</h3>
        <form @submit.prevent="salvarNovaTarefaChamado">
          <fieldset class="grid-4 bloco2 margem">
            <div><label for="tarefaNumero">N°</label><input id="tarefaNumero" v-model="formTarefa.numero" type="text" placeholder="Ex: História de usuário - 171" /></div>
            <div><label for="tarefaResponsavel">Responsável</label><select id="tarefaResponsavel" v-model="formTarefa.responsavelId">
              <option value="">Selecione</option>
              <option v-for="u in tecnicosDoSetorTarefa" :key="u.id" :value="u.id">{{ u.nome }}</option>
            </select></div>
            <div><label for="tarefaOrigem">Origem</label><input id="tarefaOrigem" v-model="formTarefa.origem" type="text" placeholder="Ex: PCM240223 Thalamus - Tarefas" /></div>
            <div><label for="tarefaEntrega">Entrega</label><input id="tarefaEntrega" v-model="formTarefa.entrega" type="text" placeholder="Ex: Evolução 2.0" /></div>
            <div><label for="tarefaSprint">Sprint</label><input id="tarefaSprint" v-model="formTarefa.sprint" type="text" placeholder="Ex: Backlogs" /></div>
            <div><label for="tarefaHp">H.P.</label><input id="tarefaHp" v-model.number="formTarefa.hp" type="number" min="0" /></div>
            <div><label for="tarefaInicioPrevisto">Início Previsto</label><input id="tarefaInicioPrevisto" v-model="formTarefa.inicioPrevisto" type="text" placeholder="dd/mm/aaaa" /></div>
            <div><label for="tarefaFimPrevisto">Fim Previsto</label><input id="tarefaFimPrevisto" v-model="formTarefa.fimPrevisto" type="text" placeholder="dd/mm/aaaa" /></div>
            <div><label for="tarefaStatus">Status</label><select id="tarefaStatus" v-model="formTarefa.status">
              <option v-for="s in STATUS_TAREFA" :key="s" :value="s">{{ s }}</option>
            </select></div>
            <div class="col-2"><label for="tarefaDescricao">Descrição</label><textarea id="tarefaDescricao" v-model="formTarefa.descricao" rows="3" placeholder="Descrição da tarefa"></textarea></div>
          </fieldset>
          <div class="submit direita">
            <button type="button" class="acao-secundaria" @click="fecharModalNovaTarefaChamado">Cancelar</button>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'
import { STATUS_TAREFA } from '@/data/constants'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const novoComentarioTexto = ref('')
const modalAcoesChamado = ref(false)
const modalAtribuirTecnico = ref(false)
const modalOutroSetor = ref(false)
const modalNovaTarefaChamado = ref(false)
const formAtribuir = ref({ tecnicoId: '' })
const formOutroSetor = ref({ setorId: '', justificativa: '' })
const formTarefa = ref({
  numero: '', responsavelId: '', origem: '', entrega: '', sprint: '', descricao: '', hp: 0,
  inicioPrevisto: '', fimPrevisto: '', status: 'A iniciar'
})

const chamadoId = computed(() => route.params.id ? parseInt(route.params.id, 10) : null)
const chamado = computed(() => (chamadoId.value ? store.getChamadoById(chamadoId.value) : null))

const tecnicosDoSetor = computed(() => {
  if (!chamado.value || !chamado.value.setorId) return []
  return store.USUARIOS.filter(u => u.papel === 'tecnico' && u.setorId === chamado.value.setorId)
})

const outrosSetores = computed(() => {
  if (!chamado.value) return store.SETORES
  return store.SETORES.filter(s => s.id !== chamado.value.setorId)
})

const tecnicosDoSetorTarefa = computed(() => {
  if (!chamado.value || !chamado.value.setorId) return []
  return store.USUARIOS.filter(u => u.papel === 'tecnico' && u.setorId === chamado.value.setorId)
})

const tarefasParaTabela = computed(() => {
  const list = chamado.value?.tarefas || []
  if (store.isTecnico) return list.filter(t => t.responsavelId === store.usuarioAtualId)
  return list
})

onMounted(() => {
  if (route.query.openAcoes === '1' && chamado.value && store.isLider) {
    modalAcoesChamado.value = true
  }
})

function enviarComentario() {
  const texto = (novoComentarioTexto.value || '').trim()
  if (!texto || !chamado.value) return
  const c = store.getChamadoById(chamado.value.id)
  if (!c) return
  if (!c.comentarios) c.comentarios = []
  c.comentarios.push({
    autor: store.usuarioAtual?.nome || store.USUARIOS[0]?.nome,
    data: formatarDataCurta(new Date()),
    texto
  })
  novoComentarioTexto.value = ''
}

function abrirModalAcoesChamado() {
  modalAtribuirTecnico.value = false
  modalOutroSetor.value = false
  modalAcoesChamado.value = true
}

function fecharModalAcoesChamado() {
  modalAcoesChamado.value = false
}

function abrirModalAtribuirTecnico() {
  modalAcoesChamado.value = false
  formAtribuir.value = { tecnicoId: '' }
  modalAtribuirTecnico.value = true
}

function fecharModalAtribuirTecnico() {
  modalAtribuirTecnico.value = false
}

function salvarAtribuirTecnico() {
  if (!chamado.value || !formAtribuir.value.tecnicoId) return
  const tecnico = store.USUARIOS.find(u => u.id === parseInt(formAtribuir.value.tecnicoId, 10))
  const c = store.getChamadoById(chamado.value.id)
  if (c) {
    c.tecnicoId = parseInt(formAtribuir.value.tecnicoId, 10)
    c.tecnicoNome = tecnico ? tecnico.nome : null
    c.responsavel = c.tecnicoNome
  }
  fecharModalAtribuirTecnico()
  alert('Técnico atribuído.')
}

function abrirModalOutroSetor() {
  modalAcoesChamado.value = false
  formOutroSetor.value = { setorId: '', justificativa: '' }
  modalOutroSetor.value = true
}

function fecharModalOutroSetor() {
  modalOutroSetor.value = false
}

function salvarOutroSetor() {
  if (!chamado.value || !formOutroSetor.value.setorId || !formOutroSetor.value.justificativa.trim()) {
    alert('Selecione o setor e informe a justificativa.')
    return
  }
  const setor = store.SETORES.find(s => s.id === parseInt(formOutroSetor.value.setorId, 10))
  const c = store.getChamadoById(chamado.value.id)
  if (c) {
    c.setorId = parseInt(formOutroSetor.value.setorId, 10)
    c.atribuicaoOutroSetor = { setorNome: setor ? setor.nome : '', justificativa: formOutroSetor.value.justificativa, data: formatarDataCurta(new Date()) }
  }
  fecharModalOutroSetor()
  alert('Chamado atribuído ao setor.')
}

function chamadoAbrirOS() {
  if (!chamado.value) return
  fecharModalAcoesChamado()
  router.push({ name: 'os-nova-chamado', params: { chamadoId: chamado.value.id } })
}

function abrirModalNovaTarefaChamado() {
  if (!chamado.value) return
  const u = store.usuarioAtual
  const tecnicos = store.USUARIOS.filter(t => t.papel === 'tecnico' && t.setorId === chamado.value.setorId)
  const preSelect = (u?.papel === 'tecnico' && tecnicos.some(t => t.id === store.usuarioAtualId)) ? store.usuarioAtualId : ''
  formTarefa.value = {
    numero: '', responsavelId: preSelect, origem: '', entrega: '', sprint: '',
    descricao: '', hp: 0, inicioPrevisto: '', fimPrevisto: '', status: 'A iniciar'
  }
  modalNovaTarefaChamado.value = true
}

function atualizarStatusTarefa(idx, valor) {
  if (!chamado.value) return
  const c = store.getChamadoById(chamado.value.id)
  if (!c?.tarefas || !c.tarefas[idx]) return
  c.tarefas[idx].status = valor
}

function excluirTarefa(idx) {
  if (!chamado.value) return
  const c = store.getChamadoById(chamado.value.id)
  if (!c?.tarefas) return
  c.tarefas.splice(idx, 1)
}

function fecharModalNovaTarefaChamado() {
  modalNovaTarefaChamado.value = false
}

function salvarNovaTarefaChamado() {
  if (!chamado.value) return
  const c = store.getChamadoById(chamado.value.id)
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
}
</script>
