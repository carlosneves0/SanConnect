import _query from './_query'

async function SignInQuery(email, password) {
  const query = `
    query SignInQuery($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        accessToken
      }
    }
  `

  const variables = { email, password }

  const { signIn: { accessToken } } = await _query(query, variables)

  return accessToken
}

export default SignInQuery
