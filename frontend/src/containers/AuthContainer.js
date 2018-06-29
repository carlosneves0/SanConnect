// @flow
import React from 'react'
import { Container, Subscribe } from 'unstated'
import { Base64 } from 'js-base64'

type AuthState = {
  auth: ?{
    data: ?string,
    error: ?string
  }
}

const KEY_AUTH = '__a'

class AuthContainer extends Container<AuthState> {
  constructor(props) {
    super(props)

    let auth = window.localStorage.getItem(KEY_AUTH)
    if (auth !== null) {
      try {
        auth = JSON.parse(Base64.decode(auth))
      } catch (error) {
        window.localStorage.removeItem(KEY_AUTH)
      }
    }

    this.state = {
      auth
    }
  }

  isLoading() {
    const { auth } = this.state
    return auth !== null && auth.data === null && auth.error === null
  }

  isSignedIn() {
    const { auth } = this.state
    return auth !== null && typeof auth.data === 'string'
  }

  signIn = (email: string, password: string) => {
    this.setState({
      auth: {
        data: null,
        error: null
      }
    })

    // setTimeout(() => {
    //   const auth = {
    //     data: 'accessToken',
    //     error: null
    //   }
    //   window.localStorage.setItem(
    //     KEY_AUTH,
    //     Base64.encode(JSON.stringify(auth))
    //   )
    //   this.setState({ auth })
    // }, 1200)
  }

  signOut = () => {
    window.localStorage.removeItem(KEY_AUTH)
    this.setState({ auth: null })
  }
}

export default AuthContainer

const withAuth = Component => (
  props => (
    <Subscribe to={[AuthContainer]}>
      {auth => <Component {...props} auth={auth} />}
    </Subscribe>
  )
)

export { withAuth }
