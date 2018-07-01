import React from 'react'

class SignOut extends React.Component {
  componentDidMount() {
    const { auth, viewer } = this.props
    auth.signOut(viewer)
  }

  render() {
    return null
  }
}

export default SignOut
