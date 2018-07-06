import _query from './_query'

async function CreateEventMutation(event) {
  const query = `
    mutation CreateEventMutation($event: CreateEventInput!) {
      createEvent(event: $event)
    }
  `

  const variables = { event }

  const { createEvent } = await _query(query, variables)

  return createEvent
}

export default CreateEventMutation
