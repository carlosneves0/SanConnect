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
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sign-up'>Sign up</Link></li>
        <li><Link to='/sign-in'>Sign in</Link></li>
        <li><Link to='/logged'>Logged</Link></li>
        <li><Link to='/create-event'>Create Event</Link></li>
        <li><Link to='/view-event'>View Event</Link></li>
        <li><Link to='/edit-user'>Edit User in</Link></li>
        <li><Link to='/view-user'>View User</Link></li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/logged" component={Logged} />
      <Route path="/view-event" component={EventView} />
      <Route path="/create-event" component={EventCreate} />
      <Route path="/edit-user" component={UserEdit} />
      <Route path="/view-user" component={UserView} />
      <button type="button" class="pt-button pt-intent-success">
        Next step
        <span class="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
      </button>
    </div>
  </Router>
)

export default App