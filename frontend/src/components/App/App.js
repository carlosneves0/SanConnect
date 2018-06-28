import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Network } from 'react-fns'
import { Subscribe } from 'unstated'
import Layout from '../Layout'
import Offline from '../Offline'
import Home from '../Home'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn'
import NotFound from '../NotFound'
import NotificationManager from '../NotificationManager'
import NotificationContainer from '../../containers/NotificationContainer'

const App = () => (
  <Layout>
    <NotificationManager />
    <Network
      render={({ online }) => (
        online ? (
          <Subscribe to={[NotificationContainer]}>
            {notify => (
              <Switch>
                <Route path='/' exact component={Home} />
                <Route
                  path='/sign-in'
                  render={() => <SignIn notify={notify} />}
                />
                <Route path='/sign-up' component={SignUp} />
                <Route component={NotFound} />
              </Switch>
            )}
          </Subscribe>
        ) : (
          <Offline />
        )
      )}
    />
  </Layout>
)

export default App
