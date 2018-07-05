import _query from './_query'

async function CreateEventMutation(event) {
  const query = `
    mutation CreateEventMutation($event: CreateEventInput!) {
      createEvent(event: $event) {
        id
        creator {
          email
          name
          description
          picture
          likes
          dislikes
        }
        title
        beginsAt
        description
        minParticipants
        maxParticipants
        createdAt
        location
        categories
        participants {
          email
          name
          description
          picture
          likes
          dislikes
        }
        waitList {
          email
          name
          description
          picture
          likes
          dislikes
        }
      }
    }
  `

  const variables = { event }

  const { createEvent } = await _query(query, variables)

  return createEvent
}

export default CreateEventMutation
