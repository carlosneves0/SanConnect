import React from 'react'
import { Link } from 'react-router-dom'

const Layout = props => (
	<div>
		<ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
		<div>{props.children}</div>
		<h2>footer</h2>
	</div>
)

export default Layout