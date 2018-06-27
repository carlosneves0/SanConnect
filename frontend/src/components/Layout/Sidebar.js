import React from 'react'
import Sidebar from 'react-sidebar'

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

class CustomSidebar extends React.Component {
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
    return ()
  }
}
