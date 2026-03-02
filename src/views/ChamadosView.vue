<template>
  <div class="titulo">
    <div class="margem container">
      <div class="m-icone direita">
        <div class="pesquisa">
          <input v-model="pesquisa" type="text" placeholder="Pesquise aqui" />
          <a href="#" class="icone-pesquisa" title="Pesquise"></a>
        </div>
      </div>
      <div class="m-icone esquerda"><a href="#" class="icone-voltar m-d" @click.prevent="$router.back()"></a></div>
      <h2>Chamados</h2>
    </div>
  </div>
  <div class="margem container">
    <fieldset class="grid-4 bloco2 margem m-b">
      <div><label>Simular usuário</label><select v-model="usuarioId" @change="store.setUsuario(usuarioId)"><option v-for="u in store.USUARIOS" :key="u.id" :value="u.id">{{ u.nome }}</option></select></div>
    </fieldset>
    <div class="submit m-b"><button type="button" @click="abrirModalNovoChamado"><i class="bi bi-plus-lg"></i> Novo Chamado</button></div>
    <!-- Lista de chamados -->
    <div id="listaChamados" class="bloco margem">
      <table class="tabela">
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Classificação</th>
              <th>Solicitante</th>
              <th>Data</th>
              <th>Status</th>
              <th>Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in chamadosFiltrados" :key="c.id" class="clicavel" @click="irParaChamado(c.id)">
              <td>{{ c.codigo }}</td>
              <td>{{ c.tipoNome }}</td>
              <td>{{ c.classificacaoNome || '-' }}</td>
              <td>{{ c.solicitante }}</td>
              <td>{{ c.dataCriacao }}</td>
              <td><span class="chip bg-alerta">{{ c.status }}</span></td>
              <td>{{ c.responsavel || c.tecnicoNome || '-' }}</td>
              <td @click.stop>
                <button v-if="store.isLider" type="button" class="acao-secundaria" @click="irParaChamadoAcoes(c.id)">Ações</button>
              </td>
            </tr>
            <tr v-if="chamadosFiltrados.length === 0">
              <td colspan="8" class="alinha-centro fonte-fraca">Nenhum chamado.</td>
            </tr>
          </tbody>
      </table>
    </div>

  </div>

  <Teleport to="body">
    <!-- Modal Novo Chamado -->
    <div v-show="modalNovoChamado" class="modal-mask" @click.self="fecharModalNovoChamado">
      <div class="jm margem" style="min-width: 30rem; max-height: 90vh; overflow: auto" @click.stop>
        <h3 class="m-b alinha-centro">Novo Chamado</h3>
        <form @submit.prevent="salvarNovoChamado">
          <fieldset class="grid-4 bloco2 margem">
            <div>
              <label for="chamadoTipo">Tipo do Chamado *</label>
              <select id="chamadoTipo" v-model="formChamado.tipoId" required>
                <option value="">Selecione o tipo</option>
                <option v-for="t in store.TIPOS_CHAMADO" :key="t.id" :value="t.id">{{ t.nome }}</option>
              </select>
            </div>
            <div v-if="classificacoesTipo.length">
              <label for="chamadoClassificacao">Classificação</label>
              <select id="chamadoClassificacao" v-model="formChamado.classificacaoId">
                <option value="">—</option>
                <option v-for="cl in classificacoesTipo" :key="cl.id" :value="cl.id">{{ cl.nome }}</option>
              </select>
            </div>
            <div class="col-2">
              <label for="chamadoDescricao">Descrição *</label>
              <textarea id="chamadoDescricao" v-model="formChamado.descricao" rows="4" required placeholder="Descreva o chamado"></textarea>
            </div>
          </fieldset>
          <div class="submit direita">
            <button type="button" class="acao-secundaria" @click="fecharModalNovoChamado">Cancelar</button>
            <button type="submit">Enviar Chamado</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'
import { formatarDataCurta } from '@/utils/formatadores'

const router = useRouter()
const store = useAppStore()
const { chamados: chamadosRef, proximoChamado: proximoChamadoRef } = storeToRefs(store)
const usuarioId = ref(store.usuarioAtualId)
const pesquisa = ref('')

const modalNovoChamado = ref(false)
const formChamado = ref({ tipoId: '', classificacaoId: '', descricao: '' })

const classificacoesTipo = computed(() => {
  if (!formChamado.value.tipoId) return []
  return store.getClassificacoesPorTipo(formChamado.value.tipoId)
})

const chamadosPorPerfil = computed(() => {
  const u = store.usuarioAtual
  if (!u) return []
  const lista = [...store.chamados]
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

function irParaChamado(id) {
  router.push({ name: 'chamado-detalhe', params: { id } })
}

function irParaChamadoAcoes(id) {
  router.push({ name: 'chamado-detalhe', params: { id }, query: { openAcoes: '1' } })
}

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
</script>

