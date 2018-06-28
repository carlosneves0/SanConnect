import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import './SignIn.css'

class SignIn extends Component {
  state = { email: '', pw: '', submittedEmail: '', submittedPw: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { email, pw } = this.state

    this.setState({ submittedEmail: email, submittedPw: pw })
  }

  handleClick() {

  }

  render() {
    const { email, pw, submittedEmail, submittedPw } = this.state
    return (
      <div className='SignIn'>
        <center>
          <Form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <br></br>
            
              <Form.Field className='SignIn-input'>
                <label>Email</label>
                <Form.Input placeholder='Email' name='email' value={email} onChange={this.handleChange} />
              </Form.Field>
            
              <Form.Field className='SignIn-input'>
                <label>Senha</label>
                <Form.Input placeholder='Senha' name='pw' value={pw} onChange={this.handleChange} />
              </Form.Field>
            
              <br></br>
              <Form.Button className='SignIn-button' primary content='Submit' onClick={this.handleClick} />
            
          </Form>
        </center>
      </div>
    )
  }
}

export default SignIn