import React from 'react'
import Sidebar from 'react-sidebar'
import { Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SidebarContent = ({ isSignedIn, toggleSidebar }) => (
  <div className='Layout-Sidebar'>
    <nav className='Layout-nav'>
      <Link to='/' className='Layout-brand'>SanConnect</Link>
    </nav>
    {isSignedIn ? (
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

class LayoutMobile extends React.Component {
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
    const { isSignedIn, children } = this.props
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
    )
  }
}

export default LayoutMobile
