import _query from './_query'

function convertPtToEn(
  { nome, foto, descricao, email, likes, dislikes }
) {
  return {
    name: nome,
    picture: foto,
    description: descricao,
    email,
    likes,
    dislikes
  }
}

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

  return convertPtToEn(viewer)
}

export default ViewerQuery
