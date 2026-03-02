/**
 * Funções de formatação (datas, quantidades, status)
 */

export function formatarData (data) {
  if (!data) return '-'
  const d = data instanceof Date ? data : new Date(data)
  if (isNaN(d.getTime())) return '-'
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} às ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function formatarDataCurta (data) {
  if (!data) return '-'
  if (typeof data === 'string' && data.includes('/')) return data
  const d = data instanceof Date ? data : new Date(data)
  if (isNaN(d.getTime())) return '-'
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

export function formatarQuantidade (v) {
  if (v === null || v === undefined) return '-'
  const n = Number(v)
  return n % 1 === 0 ? Math.floor(n).toLocaleString('pt-BR') : n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export function getStatusClasse (s) {
  const m = {
    'Em Separação': 'bg-ok',
    'Requisição Criada': 'bg-ok',
    'Entregue': 'bg-sucesso',
    'Em análise': 'bg-alerta',
    'Cancelado': 'bg-erro',
    'Rascunho': 'bg-alerta',
    'Em atendimento': 'bg-ok',
    'Concluída': 'bg-sucesso',
    'A iniciar': 'bg-alerta',
    'Em andamento': 'bg-ok'
  }
  return m[s] || 'bg-alerta'
}
