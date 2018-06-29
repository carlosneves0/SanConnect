import { getAccessToken } from '../containers/AuthContainer'

async function _query(query, variables) {
  const accessToken = getAccessToken()

  const headers = {
    'Content-Type': 'application/json'
  }
  if (typeof accessToken === 'string' && accessToken.length > 0) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  let response = await fetch(
    'http://localhost:4000/graph',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    }
  )

  if (response.status === 200) {
    const { data } = await response.json()
    return data
  } else {
    const { errors } = await response.json()
    throw new Error(errors[0].message)
  }
}

export default _query
