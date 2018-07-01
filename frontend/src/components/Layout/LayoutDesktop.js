import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Avatar from './Avatar'

const LayoutDesktop = ({ isSignedIn, viewer, children }) => (
  <div>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
      {isSignedIn ? (
        <span>
          <Link to='/create-event'>
            <Button color='olive' size='mini'>Criar um Evento</Button>
          </Link>
          <Link to='/'>
            <Button primary size='mini'>Feed de Eventos</Button>
          </Link>
          {/* <Link to='/'>
            Feed de Eventos
          </Link> */}
          <Link to='/my-events'>
            <Button primary size='mini'>Meus Eventos</Button>
          </Link>
          {/* <Link to='/my-events'>
            Meus Eventos
          </Link> */}
          <Link to='/sign-out'>
            <Button secondary size='mini'>Sair</Button>
          </Link>
          {/* <Link to='/my-events'>
            Sair
          </Link> */}
          <Avatar viewer={viewer.viewer} />
        </span>
      ) : (
        <span>
          <Link to='/sign-in'>
            <Button secondary size='tiny'>Acessar minha Conta</Button>
          </Link>
          <Link to='/sign-up'>
            <Button primary size='tiny'>Cadastrar-se</Button>
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
