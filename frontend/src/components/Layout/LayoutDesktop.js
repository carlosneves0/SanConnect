import React from 'react'
import { Link } from 'react-router-dom'

const LayoutDesktop = ({ isSignedIn, children }) => (
  <div>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
      {isSignedIn ? (
        <p>is signed in</p>
      ) : (
        <span>
          <Link to='/sign-in'>Acessar Conta</Link>
          <Link to='/sign-up'>Cadastre-se</Link>
        </span>
      )}
    </nav>
    <div id='Layout-desktop'>
      {children}
    </div>
  </div>
)

export default LayoutDesktop
