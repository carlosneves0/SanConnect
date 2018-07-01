import _query from './_query'

async function SignUpMutation(user) {
  const query = `
    mutation SignUpMutation($user: SignUpInput!) {
      signUp(user: $user) {
        email
        nome
        descricao
        foto
        likes
        dislikes
      }
    }
  `

  const variables = { user }

  const { signUp } = await _query(query, variables)

  return signUp
}

export default SignUpMutation
