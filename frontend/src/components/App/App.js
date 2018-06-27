import React from 'react'
import { Route } from 'react-router-dom'
import { Network } from 'react-fns'
import Layout from '../Layout'
import Offline from '../Offline'
// import NotFound from '../NotFound'
// import Home from '../Home'
// import SignUp from '../SignUp'
// import SignIn from '../SignIn'

const App = () => (
  <Network
    render={({ online }) => (
      <Layout isOnline={online}>
        {online ? (
          <h1>Yey, we're online.</h1>
        ) : (
          <Offline />
        )}
      </Layout>
    )}
  />
)

export default App
