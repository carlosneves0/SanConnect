import _query from './_query'

async function SignUpMutation(user) {
  const query = `
    mutation SignUpMutation($user: SignUpInput!) {
      vewier: signUp(user: $user) {
        email
        name
        description
        picture
        likes
        dislikes
      }
    }
  `

  const variables = { user }

  const { viewer } = await _query(query, variables)

  return viewer
}

export default SignUpMutation
