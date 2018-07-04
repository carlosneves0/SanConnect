import _query from './_query'

async function EventsQuery() {
  const query = `
    query EventsQuery {
      events {
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
      }
    }
  `

  const { events } = await _query(query, {})

  return events
}

export default EventsQuery
