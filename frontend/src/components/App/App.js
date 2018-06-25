import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from '../Home'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Logged from '../Logged'
import EventView from '../EventView'
import EventCreate from '../EventCreate'
import UserView from '../UserView'
import UserEdit from '../UserEdit'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/logged" component={Logged} />
      <Route path="/view-event" component={EventView} />
      <Route path="/create-event" component={EventCreate} />
      <Route path="/edit-user" component={UserEdit} />
      <Route path="/view-user" component={UserView} />
    </div>
  </Router>
)

export default App