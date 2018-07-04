import _query from './_query'

function convertPtToEn(
  { criador, titulo, data_hora_evento, categorias }
) {
  return {
    creator: criador,
    title: titulo,
    beginsAt: data_hora_evento,
    categories: categorias
  }
}

async function PublicEventsQuery() {
  const query = `
    query PublicEventsQuery {
      publicEvents {
        criador
        titulo
        data_hora_evento
        categorias
      }
    }
  `

  const { publicEvents } = await _query(query, {})

  return publicEvents.map(convertPtToEn)
}

export default PublicEventsQuery
