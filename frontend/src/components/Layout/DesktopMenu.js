import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'
import Avatar from './Avatar'

class DesktopMenu extends React.Component {
  state = {
    open: false
  }

  onClickAvatar = () => {
    this.setState({ open: false })
  }

  render() {
    const { viewer } = this.props
    const { open } = this.state

    return (
      <span
        onMouseEnter={() => this.setState({ open: true })}
        onMouseLeave={() => this.setState({ open: false })}
      >
        <Link
          to='/create-event'
          onMouseEnter={() => this.setState({ open: false })}
          onMouseLeave={() => this.setState({ open: true })}
        >
          <Button color='olive' size='mini'>Criar um Evento</Button>
        </Link>
        <Avatar viewer={viewer} onClickAvatar={this.onClickAvatar} />
        <Segment
          className='DesktopMenu-Segment'
          onMouseEnter={() => this.setState({ open: true })}
          onMouseLeave={() => this.setState({ open: false })}
          style={{ display: open ? 'block' : 'none' }}
        >
          <Link to='/'>
            <Button
              primary size='mini'
              onClick={() => this.setState({ open: false })}
            >
              Feed de Eventos
            </Button>
          </Link>
          <Link to='/my-events'>
            <Button
              primary size='mini'
              onClick={() => this.setState({ open: false })}
            >
              Meus Eventos
            </Button>
          </Link>
          <Link to='/my-profile'>
            <Button
              primary size='mini'
              onClick={() => this.setState({ open: false })}
            >
              Minha Conta
            </Button>
          </Link>
          <Link to='/sign-out'>
            <Button secondary size='mini'>Sair</Button>
          </Link>
        </Segment>
      </span>
    )
  }
}

export default DesktopMenu
