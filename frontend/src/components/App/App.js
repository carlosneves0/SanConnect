import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Network } from 'react-fns'
import Layout from '../Layout'
import Offline from '../Offline'
import Home from '../Home'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn'
import EventFeed from '../EventFeed'
import EventCreate from '../EventCreate'
import NotFound from '../NotFound'
import NotificationManager from '../NotificationManager'
import { withAuth } from '../../containers/AuthContainer'
import { withNotify } from '../../containers/NotificationContainer'

class App extends React.Component {
  componentDidUpdate() {
    const { auth, notify } = this.props
    const authError = auth.getError()
    if (authError) {
      auth.clearError()
      notify.danger({ message: authError })
    }
  }

  render() {
    const { auth, notify } = this.props
    return (
      <Layout auth={auth}>
        <NotificationManager />
        <Network
          render={({ online }) => (
            online ? (
              auth.isSignedIn() ? (
                <Switch>
                  <Redirect from='/sign-in' to='/' />
                  <Redirect from='/sign-up' to='/' />
                  <Route path='/' exact component={EventCreate} />
                  <Route path='/create-event' component={EventCreate} />
                  <Route render={() => <NotFound notify={notify} />} />
                </Switch>
              ) : (
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route
                    path='/sign-in'
                    render={() => <SignIn auth={auth} notify={notify} />}
                  />
                  <Route
                    path='/sign-up'
                    render={() => <SignUp auth={auth} notify={notify} />}
                  />
                  <Route path='/explore' component={EventFeed} />
                  <Route render={() => <NotFound notify={notify} />} />
                </Switch>
              )
            ) : (
              <Offline />
            )
          )}
        />
      </Layout>
    )
  }
}

export default withAuth(withNotify(App))
