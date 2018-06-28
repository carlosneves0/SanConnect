import React from 'react'
import './SignIn.css'

class SignIn extends React.Component {
  componentWillMount() {
    this.props.notify.danger({
      message: '[componentWillMount] Yolo, bitch!',
      duration: null
    })
  }

  componentDidMount() {
    this.props.notify.success({
      message: '[componentDidMount] Yolo, bitch!',
      duration: null
    })
  }

  render() {
    return (
      <div className='SignIn'>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <h1>Sign in</h1>
        <button onClick={() => {
          this.props.notify.warn({
            message: '[onClick] Yolo, bitch!'
          })
        }}>notify</button>
      </div>
    )
  }
}

export default SignIn
