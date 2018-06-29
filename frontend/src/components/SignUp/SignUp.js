import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import './SignUp.css'

class SignUp extends Component {
  state = { name: '', email: '', pw: '', submittedName: '', submittedEmail: '', submittedPw: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email, pw } = this.state

    this.setState({ submittedName: name, submittedEmail: email, submittedPw: pw })
  }

  render() {
    const { name, email, pw } = this.state

    return (
      <div className='SignUp'>
        <center>

          <Form onSubmit={this.handleSubmit}>
            <h1>Cadastro</h1>
            <br></br>

              <Form.Field className='SignUp-input'>
                <label>Nome</label>
                <Form.Input placeholder='Nome' name='name' value={name} onChange={this.handleChange} />
              </Form.Field>



              <Form.Field className='SignUp-input'>
                <label>Email</label>
                <Form.Input placeholder='Email' name='email' value={email} onChange={this.handleChange} />
              </Form.Field>



              <Form.Field className='SignUp-input'>
                <label>Senha</label>
                <Form.Input placeholder='Senha' name='pw' value={pw} onChange={this.handleChange} />
              </Form.Field>

              <br></br>

              <Form.Button className='SignUp-button' primary content='Cadastrar' />



          </Form>
        </center>
      </div>
    )
  }
}

export default SignUp
