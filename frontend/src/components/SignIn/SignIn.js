import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { Form, Input, Button } from 'semantic-ui-react'
import './SignIn.css'

class SignIn extends Component {
  state = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })

    if (value === '') {
      const displayName = name === 'email' ? 'email' : 'senha'
      this.setState({
        [`${name}Error`]: `O campo ${displayName} não pode estar vazio`
      })
    } else {
      this.setState({ [`${name}Error`]: null })
    }
  }

  handleSubmit = () => {
    const { email, password } = this.state

    let valid = true
    if (email === '') {
      this.setState({
        emailError: `O campo email não pode estar vazio`
      })
      valid = false
    }

    if (password === '') {
      this.setState({
        passwordError: `O campo senha não pode estar vazio`
      })
      valid = false
    }

    // Valid data.
    if (valid) {
      this.props.auth.signIn(email, password)
    }
  }

  render() {
    const { auth } = this.props
    const { email, emailError, password, passwordError } = this.state

    const isLoading = auth.isLoading()

    return (
      <MediaQuery minDeviceWidth={880}>
        {matches => (
          <div className='SignIn'>
            <h2>Acessar Conta</h2>
            <Form
              className='SignIn-Form'
              onSubmit={this.handleSubmit}
              size={matches ? 'small' : 'big'}
            >
              <Form.Field>
                <label>Email</label>
                <Input
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  loading={isLoading}
                  disabled={isLoading}
                  error={emailError !== null}
                />
                {emailError !== null && (
                  <span className='SignIn-error'>{emailError}</span>
                )}
              </Form.Field>
              <Form.Field>
                <label>Senha</label>
                <Input
                  placeholder='Senha'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                  loading={isLoading}
                  disabled={isLoading}
                  error={passwordError !== null}
                />
                {passwordError !== null && (
                  <span className='SignIn-error'>{passwordError}</span>
                )}
              </Form.Field>
              <Button
                primary fluid type='submit'
                size={matches ? 'small' : 'big'}
                loading={isLoading}
                disabled={isLoading}
              >
                Acessar
              </Button>
            </Form>
          </div>
        )}
      </MediaQuery>
    )
  }
}

export default SignIn
