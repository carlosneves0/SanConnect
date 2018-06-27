import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Network } from 'react-fns'
import Layout from '../Layout'
import Offline from '../Offline'
import Home from '../Home'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import NotFound from '../NotFound'

const App = () => (
  <Layout>
    <Network
      render={({ online }) => (
        online ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Offline />
        )
      )}
    />
  </Layout>
)

export default App
