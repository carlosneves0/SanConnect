import _query from './_query'

function convertPtToEn(
  {
    criador, titulo, data_hora_evento, descricao, min_participantes,
    max_participantes, data_hora_criacao, local, categorias, participantes
  }
) {
  return {
    creator: criador,
    title: titulo,
    beginsAt: data_hora_evento,
    description: descricao,
    minParticipants: min_participantes,
    maxParticipants: max_participantes,
    createdAt: data_hora_criacao,
    place: local,
    categories: categorias,
    participants: participantes
  }
}

async function GetAllEventsQuery() {
  const query = `
    query GetAllEventsQuery {
      events: getAllEvents {
        criador
        titulo
        data_hora_evento
        categorias
      }
    }
  `

  const variables = {}

  const { events } = await _query(query, variables)

  return events.map(convertPtToEn)
}

export default GetAllEventsQuery
