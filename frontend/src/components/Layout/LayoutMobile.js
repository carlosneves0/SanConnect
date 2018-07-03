import React from 'react'
import Sidebar from 'react-sidebar'
import { Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

const SidebarContent = ({ isSignedIn, toggleSidebar }) => (
  <div className='Layout-Sidebar'>
    <nav className='Layout-nav'>
      <Link
        to='/'
        className='Layout-brand'
        onClick={toggleSidebar}
      >
        SanConnect
      </Link>
    </nav>
    {isSignedIn ? (
      <div>
        <Link to='/create-event' onClick={toggleSidebar}>
          <Button color='olive' size='huge' className='LayoutMobile-Button'>
            Criar um Evento
          </Button>
        </Link>
        <Link to='/' onClick={toggleSidebar}>
          <Button primary size='huge' className='LayoutMobile-Button'>
            Feed de Eventos
          </Button>
        </Link>
        <Link to='/my-events' onClick={toggleSidebar}>
          <Button primary size='huge' className='LayoutMobile-Button'>
            Meus Eventos
          </Button>
        </Link>
        <Link to='/my-profile' onClick={toggleSidebar}>
          <Button primary size='huge' className='LayoutMobile-Button'>
            Meu Perfil
          </Button>
        </Link>
        <Link to='/sign-out' onClick={toggleSidebar}>
          <Button secondary size='huge' className='LayoutMobile-Button'>
            Sair
          </Button>
        </Link>
      </div>
    ) : (
      <div>
        <Link to='/sign-up' onClick={toggleSidebar}>
          <Button primary size='huge' className='LayoutMobile-Button'>
            Criar uma Conta
          </Button>
        </Link>
        <Link to='/explore' onClick={toggleSidebar}>
          <Button color='olive' size='huge' className='LayoutMobile-Button'>
            Explorar Eventos
          </Button>
        </Link>
        <Link to='/sign-in' onClick={toggleSidebar}>
          <Button secondary size='huge' className='LayoutMobile-Button'>
            Acessar minha Conta
          </Button>
        </Link>
      </div>
    )}
  </div>
)

class LayoutMobile extends React.Component {
  state = {
    sidebarOpen: false
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }))
  }

  onSetSidebarOpen = sidebarOpen => {
    this.setState({ sidebarOpen })
  }

  render() {
    const { isSignedIn, viewer, children } = this.props
    return (
      <Sidebar
        sidebar={(
          <SidebarContent
            isSignedIn={isSignedIn}
            toggleSidebar={this.toggleSidebar}
          />
        )}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: { zIndex: 3 },
          content: { overflowY: 'auto' },
          overlay: { zIndex: 2 },
          dragHandle: { zIndex: 2 }
        }}
      >
        <nav className='Layout-nav'>
          <Link to='/' className='Layout-brand'>SanConnect</Link>
          <Icon
            id='Layout-Icon'
            name='bars' size='large'
            onClick={this.toggleSidebar}
          />
          {isSignedIn && <Avatar viewer={viewer.viewer} />}
        </nav>
        <div>
          {children}
        </div>
      </Sidebar>
    )
  }
}

export default LayoutMobile
