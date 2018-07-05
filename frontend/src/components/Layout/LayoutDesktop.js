import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'

const LayoutDesktop = ({ isSignedIn, viewer, children }) => (
  <div>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
      {isSignedIn ? (
        <DesktopMenu viewer={viewer} />
      ) : (
        <span>
          <Link to='/sign-up'>
            <Button primary size='tiny'>Cadastrar-se</Button>
          </Link>
          <Link to='/sign-in'>
            <Button secondary size='tiny'>Acessar minha Conta</Button>
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
