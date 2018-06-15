import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from '../Home'
import SignUp from '../SignUp'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sign-up'>Sign up</Link></li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
    </div>
  </Router>
)

export default App