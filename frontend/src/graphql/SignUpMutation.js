import _query from './_query'

function convertEnToPt(
  { fullName, picture, description, email, password }
) {
  return {
    nome: fullName,
    foto: picture,
    descricao: description,
    email,
    password
  }
}

async function SignUpMutation(user) {
  const query = `
    mutation SignUpMutation($user: SignUpInput!) {
      vewier: signUp(user: $user) {
        email
        nome
        descricao
        foto
        likes
        dislikes
      }
    }
  `

  const variables = { user: convertEnToPt(user) }

  const { viewer } = await _query(query, variables)

  return viewer
}

export default SignUpMutation
