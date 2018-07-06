import _query from './_query'

async function ParticipateMutation(eventId) {
  const query = `
    mutation ParticipateMutation($eventId: ID!) {
      participate: createParticipates(event: $eventId)
    }
  `

  const variables = { eventId }

  const { participate } = await _query(query, variables)

  return participate
}

export default ParticipateMutation
