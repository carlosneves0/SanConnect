// @flow
import { Container } from 'unstated'
import { Base64 } from 'js-base64'
import SignUpMutation from '../graphql/SignUpMutation'
import SignInQuery from '../graphql/SignInQuery'

type AuthState = {
  auth: ?{
    data: ?string,
    error: ?string
  }
}

const KEY_AUTH = '__a'

class AuthContainer extends Container<AuthState> {
  constructor() {
    super()

    let auth = window.localStorage.getItem(KEY_AUTH)
    if (auth !== null) {
      try {
        auth = JSON.parse(Base64.decode(auth))
      } catch (error) {
        window.localStorage.removeItem(KEY_AUTH)
        auth = null
      }
    }

    this.state = {
      auth
    }
  }

  isLoading = () => {
    const { auth } = this.state
    return auth !== null && auth.data === null && auth.error === null
  }

  isSignedIn = () => {
    const { auth } = this.state
    return auth !== null && typeof auth.data === 'string'
  }

  setOnError(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to AuthContainer must be a funcion.')
    }
    this.onError = callback
  }

  setOnSignUp(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to AuthContainer must be a funcion.')
    }
    this.onSignUp = callback
  }

  setOnSignIn(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to AuthContainer must be a funcion.')
    }
    this.onSignIn = callback
  }

  setOnSignOut(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to AuthContainer must be a funcion.')
    }
    this.onSignOut = callback
  }

  signUp = async input => {
    try {
      await SignUpMutation(input)
      this.onSignUp()
    } catch (error) {
      this.onError(error)
      this.setState({
        auth: {
          data: null,
          error
        }
      })
      throw error
    }
  }

  signIn = async (email: string, password: string) => {
    this.setState({
      auth: {
        data: null,
        error: null
      }
    })

    try {
      const accessToken = await SignInQuery(email, password)

      const auth = {
        data: accessToken,
        error: null
      }

      window.localStorage.setItem(
        KEY_AUTH,
        Base64.encode(JSON.stringify(auth))
      )

      this.setState({ auth })

      this.onSignIn()
    } catch(error) {
      this.onError(error)
      this.setState({
        auth: {
          data: null,
          error: error
        }
      })
      throw error
    }
  }

  signOut = () => {
    window.localStorage.removeItem(KEY_AUTH)
    this.setState({ auth: null })
    this.onSignOut()
  }
}

export default AuthContainer

function getAccessToken() {
  let auth = window.localStorage.getItem(KEY_AUTH)
  if (auth !== null) {
    try {
      const { data } = JSON.parse(Base64.decode(auth))
      return data || ''
    } catch (error) {
    }
  }
  return ''
}

export { getAccessToken }
