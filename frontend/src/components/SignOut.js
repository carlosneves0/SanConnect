import React from 'react'

class SignOut extends React.Component {
  componentDidMount() {
    this.props.auth.signOut()
  }

  render() {
    return null
  }
}

export default SignOut
