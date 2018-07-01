import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Network } from 'react-fns'
import Layout from '../Layout'
import Offline from '../Offline'
import Home from '../Home'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn'
import SignOut from '../SignOut'
import EventFeed from '../EventFeed'
import MyProfile from '../MyProfile'
import MyEvents from '../MyEvents'
import EventCreate from '../EventCreate'
import EventView from '../EventView'
import NotFound from '../NotFound'
import NotificationManager from '../NotificationManager'
import { withAuth } from '../../containers/AuthContainer'
import { withNotify } from '../../containers/NotificationContainer'
import { withViewer } from '../../containers/ViewerContainer'
import './App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.viewer.poll()
  }

  componentDidUpdate() {
    const { auth, notify } = this.props
    const authError = auth.getError()
    if (authError) {
      auth.clearError()
      notify.danger({ message: authError })
    }
  }

  render() {
    const { auth, notify, viewer } = this.props
    return (
      <Layout auth={auth} viewer={viewer}>
        <NotificationManager />
        <Network
          render={({ online }) => (
            online ? (
              auth.isSignedIn() ? (
                <Switch>
                  <Redirect from='/sign-in' to='/' />
                  <Redirect from='/sign-up' to='/' />
                  <Redirect from='/explore' to='/' />
                  <Route path='/' exact component={EventFeed} />
                  <Route
                    path='/sign-out'
                    render={() => <SignOut auth={auth} viewer={viewer} />}
                  />
                  <Route path='/my-profile' component={MyProfile} />
                  <Route path='/my-events' component={MyEvents} />
                  <Route path='/create-event' component={EventCreate} />
                  <Route render={() => <NotFound notify={notify} />} />
                </Switch>
              ) : (
                <Switch>
                  <Redirect from='/sign-out' to='/' />
                  <Route path='/' exact component={Home} />
                  <Route path='/view-event' component={EventView} />
                  <Route
                    path='/sign-in'
                    render={() => <SignIn auth={auth} viewer={viewer} />}
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

export default withAuth(withNotify(withViewer(App)))
