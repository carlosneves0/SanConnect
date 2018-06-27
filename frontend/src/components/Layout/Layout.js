import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { Icon, Button } from 'semantic-ui-react'
import Sidebar from 'react-sidebar';
import './Layout.css'

const IS_SIGNED_IN = false

const SidebarContent = () => (
  <div className='Layout-Sidebar'>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
    </nav>
    {IS_SIGNED_IN ? (
      <p>signed in</p>
    ) : (
      <div>
        <h2>
          <Link to='/sign-up'>Crie uma conta</Link>
        </h2>
        <h2>ou</h2>
        <h2>
          <Link to='/sign-in'>Acesse sua conta</Link>
        </h2>
      </div>
    )}
  </div>
)

class Layout extends React.Component {
  state = {
    sidebarOpen: true
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
    return (
      <div>
        <MediaQuery minDeviceWidth={880}>
          {matches => matches ? (
            <nav className='Layout-nav'>
              <Link to='/' className='Layout-brand'>SanConnect</Link>
              <Icon
                id='Layout-Icon'
                name='bars' size='large'
                onClick={this.toggleSidebar}
              />
            </nav>
          ) : (
            <Sidebar
              sidebar={<SidebarContent />}
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
        </section>
      </div>
    )
  }
}

export default Layout
