// @flow
import React from 'react'
import { Container } from 'unstated'

type AuthState = {
  auth: ?{
    data: ?string,
    error: ?string
  }
}

const KEY_AUTH = '__a'

class AuthContainer extends Container<AuthState> {
  state = {
    auth: window.localStorage.getItem(KEY_AUTH) || null
  }

  componentWillMount() {
    console.log('AuthContainer will mount')
  }

  signIn = (email: string, password: string) => {
    this.setState({
      auth: {
        data: null,
        error: null
      }
    })

    setTimeout(() => {
      const accessToken = 'accessToken'
      window.localStorage.setItem(KEY_AUTH, accessToken)
      this.setState({
        auth: {
          data: accessToken,
          error: null
        }
      })
    }, 1200)
  }

  signOut = () => {
    window.localStorage.removeItem(KEY_AUTH)
    this.setState({ auth: null })
  }
}

export default AuthContainer
