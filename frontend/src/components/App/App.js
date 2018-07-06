import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Layout from '../Layout'
import Offline from '../Offline'
import Home from '../Home'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import SignOut from '../SignOut'
import EventFeed from '../EventFeed'
import MyProfile from '../MyProfile'
import MyEvents from '../MyEvents'
import EventCreate from '../EventCreate'
import EventView from '../EventView'
import UserView from '../UserView'
import NotFound from '../NotFound'
import NotificationManager from '../NotificationManager'
import './App.css'

const App = ({ online, auth, notify, publicEvents, events, viewer, categories }) => (
  <Layout auth={auth} viewer={viewer}>
    <NotificationManager />
    {online ? (
      auth.isSignedIn() ? (
        <Switch>
          <Redirect from='/sign-in' to='/' />
          <Redirect from='/sign-up' to='/' />
          <Redirect from='/explore' to='/' />
          <Route
            path='/' exact
            render={() => (
              <EventFeed
                auth={auth}
                events={events}
                viewer={viewer}
              />
            )}
          />
          <Route
            path='/sign-out'
            render={() => <SignOut auth={auth} viewer={viewer} />}
          />
          <Route path='/my-profile' component={MyProfile} />
          <Route
            path='/my-events'
            render={() => <MyEvents events={events} viewer={viewer} />}
          />
          <Route
            path='/event/:id'
            render={({ match }) => <EventView match={match} events={events} viewer={viewer} />}
          />
          <Route
            path='/user/:id'
            render={({ match }) => <UserView match={match} events={events} />}
          />
          <Route
            path='/create-event'
            render={() => (
              <EventCreate
                events={events}
                notify={notify}
                categories={categories}
              />
            )}
          />
          <Route render={() => <NotFound notify={notify} />} />
        </Switch>
      ) : (
        <Switch>
          <Redirect from='/sign-out' to='/' />
          <Route path='/' exact component={Home} />
          <Route
            path='/sign-in'
            render={() => <SignIn auth={auth} viewer={viewer} />}
          />
          <Route
            path='/sign-up'
            render={() => <SignUp auth={auth} />}
          />
          <Route
            path='/explore'
            render={() => (
              <EventFeed
                auth={auth}
                notify={notify}
                publicEvents={publicEvents}
              />
            )}
          />
          <Route render={() => <NotFound notify={notify} />} />
        </Switch>
      )
    ) : (
      <Offline />
    )}
  </Layout>
)

export default App
