// @flow
import { Container } from 'unstated'
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

    setTimeout(() => {
      const auth = {
        data: 'accessToken',
        error: null
      }
      window.localStorage.setItem(
        KEY_AUTH,
        Base64.encode(JSON.stringify(auth))
      )
      this.setState({ auth })
    }, 1200)
  }

  signOut = () => {
    window.localStorage.removeItem(KEY_AUTH)
    this.setState({ auth: null })
  }
}

export default AuthContainer
