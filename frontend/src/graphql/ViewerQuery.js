import _query from './_query'

async function ViewerQuery() {
  const query = `
    query ViewerQuery {
      viewer {
        email
        nome
        descricao
        foto
        likes
        dislikes
      }
    }
  `

  const variables = {}

  const { viewer } = await _query(query, variables)

  return viewer
}

export default ViewerQuery
