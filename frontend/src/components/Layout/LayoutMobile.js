import React from 'react'
import Sidebar from 'react-sidebar'
import { Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

const SidebarContent = ({ isSignedIn, toggleSidebar }) => (
  <div className='Layout-Sidebar'>
    <nav className='Layout-nav'>
      <Link
        to='/' className='Layout-brand'>SanConnect</Link>
    </nav>
    {isSignedIn ? (
      <p>signed in</p>
    ) : (
      <div>
        <Link to='/sign-up' onClick={toggleSidebar}>
          <Button
            primary size='huge'
            style={{ width: '-webkit-fill-available', marginTop: '2vh' }}
          >
            Criar uma Conta
          </Button>
        </Link>
        <Link to='/explore' onClick={toggleSidebar}>
          <Button
            color='olive' size='huge'
            style={{ width: '-webkit-fill-available', marginTop: '2vh' }}
          >
            Explorar Eventos
          </Button>
        </Link>
        <Link to='/sign-in' onClick={toggleSidebar}>
          <Button
            secondary size='huge'
            style={{ width: '-webkit-fill-available', marginTop: '2vh' }}
          >
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
        styles={{ content: { overflowY: 'auto' } }}
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
