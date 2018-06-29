import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const LayoutDesktop = ({ isSignedIn, children }) => (
  <div>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
      {isSignedIn ? (
        <p>is signed in</p>
      ) : (
        <span>
          <Link to='/sign-in'>
            <Button secondary size='tiny'>Acessar Conta</Button>
          </Link>
          <Link to='/sign-up'>
            <Button primary size='tiny'>Cadastre-se</Button>
          </Link>
        </span>
      )}
    </nav>
    <div>
      {children}
    </div>
  </div>
)

export default LayoutDesktop
