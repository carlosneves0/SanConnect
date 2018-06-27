import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { Icon } from 'semantic-ui-react'
import Sidebar from 'react-sidebar'
// import { Subscribe } from 'unstated'
// import AuthContainer from '../../containers/AuthContainer'
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
            <div>
              <nav className='Layout-nav'>
                <Link to='/' className='Layout-brand'>SanConnect</Link>
                {IS_SIGNED_IN ? (
                  <p>is signed in</p>
                ) : (
                  <span>
                    <Link to='/sign-in' className={isOnline ? '' : 'anchor-disable'}>
                      Acessar Conta
                    </Link>
                    <Link to='/sign-up' className={isOnline ? '' : 'anchor-disable'}>
                      Cadastre-se
                    </Link>
                  </span>
                )}
              </nav>
              <div id='Layout-desktop'>
                {children}
              </div>
            </div>
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
              <div id='Layout-mobile'>
                {children}
              </div>
            </Sidebar>
          )}
        </MediaQuery>
      </div>
    )
  }
}

export default Layout
