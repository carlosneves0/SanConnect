import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { Icon } from 'semantic-ui-react'
import Sidebar from 'react-sidebar';
import './Layout.css'

const IS_SIGNED_IN = false

const SidebarContent = ({ toggleSidebar }) => (
  <div className='Layout-Sidebar'>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
    </nav>
    {IS_SIGNED_IN ? (
      <p>signed in</p>
    ) : (
      <div>
        <h2>
          <Link to='/sign-up' onClick={toggleSidebar}>
            Crie uma conta
          </Link>
        </h2>
        <h2>ou</h2>
        <h2>
          <Link to='/sign-in' onClick={toggleSidebar}>
            Acesse sua conta
          </Link>
        </h2>
      </div>
    )}
  </div>
)

class Layout extends React.Component {
  state = {
    sidebarOpen: false
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }), () => console.log(this.state))
  }

  onSetSidebarOpen = sidebarOpen => {
    this.setState({ sidebarOpen })
  }

  render() {
    const { isOnline, children } = this.props
    return (
      <div>
        <MediaQuery minDeviceWidth={880}>
          {matches => matches ? (
            <nav className='Layout-nav'>
              <Link to='/' className='Layout-brand'>SanConnect</Link>
              {IS_SIGNED_IN ? (
                <p>is signed in</p>
              ) : (
                <span>
                  <Link to='/sign-in' className={isOnline ? '' : 'anchor-disable'}>
                    Acessar minha conta
                  </Link>
                  <Link to='/sign-up' className={isOnline ? '' : 'anchor-disable'}>
                    Criar uma conta
                  </Link>
                </span>
              )}
            </nav>
          ) : (
            <Sidebar
              sidebar={<SidebarContent toggleSidebar={this.toggleSidebar} />}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
            >
              <nav className='Layout-nav'>
                <Link to='/' className='Layout-brand'>SanConnect</Link>
                <Icon
                  id='Layout-Icon'
                  name='bars' size='large'
                  onClick={this.toggleSidebar}
                />
              </nav>
            </Sidebar>
          )}
        </MediaQuery>
        <section>
          {children}
        </section>
      </div>
    )
  }
}

export default Layout
