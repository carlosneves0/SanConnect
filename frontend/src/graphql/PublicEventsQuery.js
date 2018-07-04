import _query from './_query'

async function PublicEventsQuery() {
  const query = `
    query PublicEventsQuery {
      publicEvents {
        creator
        title
        beginsAt
        categories
      }
    }
  `

  const { publicEvents } = await _query(query, {})

  return publicEvents
}

export default PublicEventsQuery
