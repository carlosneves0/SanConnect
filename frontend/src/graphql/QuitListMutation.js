import _query from './_query'

async function QuitListMutation(eventId) {
  const query = `
    mutation QuitListMutation($eventId: ID!) {
      quitList: deleteParticipates(event: $eventId)
    }
  `

  const variables = { eventId }

  const { quitList } = await _query(query, variables)

  return quitList
}

export default QuitListMutation
