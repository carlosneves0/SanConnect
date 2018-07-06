import React from 'react'
import { Loader, Button, Icon, Dropdown, Label, Confirm } from 'semantic-ui-react'
import { withDeviceWidth } from '../DeviceWidth'
import { Base64 } from 'js-base64'
import moment from 'moment'
import ParticipantsList from './ParticipantsList'
import WaitList from './WaitList'
import './EventView.css'

function userIsIn(user, arrayOfUsers) {
  for (let i = 0; i < arrayOfUsers.length; i++) {
    if (user.email === arrayOfUsers[i].email) {
      return true
    }
  }
  return false
}

const Participants = ({ min, max, participants }) => {
  if (max) {
    return (
      <span>
        <Icon disabled name='users' />
        {participants.length}/{max}{' '}
        <span className={participants.length < min ? 'danger' : ''}>
          (mínimo: {min})
        </span>
      </span>
    )
  } else {
    return (
      <span>
        <Icon disabled name='users' />
        Participantes:{' '}{participants.length}{' '}
        <span className={participants.length < min ? 'danger' : ''}>
          (mínimo: {min})
        </span>
      </span>
    )
  }
}

class EventView extends React.Component {
  state = {
    confirm: false
  }

  handleClickCancel = (viewer, event) => {
    if (event.participants.length === event.maxParticipants) {
      this.setState({ confirm: true, viewer, event })
    } else {
      this.props.events.quitList(viewer, event.id)
    }
  }

  handleConfirm = () => {
    const { events } = this.props
    const { viewer, event } = this.state
    events.quitList(viewer, event.id)
    this.setState({ confirm: false, viewer: null, event: null })
  }

  handleCancel = () => {
    this.setState({ confirm: false })
  }

  render() {
    let { match, viewer, events, isDesktop } = this.props
    const { confirm } = this.state

    const request = events.state.events
    const request0 = viewer.state.viewer
    const { participate, quitList } = events.state
    if (
      request === null || (
        request.error === null && request.data === null
      ) || request0 === null || (
        request0.error === null && request0.data === null
      )
    ) {
      return (
        <Loader className='App-fixed-content' active>
          Carregando Evento...
        </Loader>
      )
    } else if (request.error !== null || request0.error !== null) {
      return (
        <h3 className='App-fixed-center danger'>
          <Icon name='warning circle' />
          Erro ao carregar o evento
        </h3>
      )
    } else if (request.data !== null && request0.data !== null) {
      const event = request.data.filter(({ id }) => id === Base64.decode(match.params.id))[0]
      viewer = request0.data
      const {
        title,
        beginsAt,
        minParticipants,
        maxParticipants,
        participants,
        location,
        categories,
        description,
        creator,
        waitList
      } = event

      let message = 'Você tem certeza que deseja cancelar sua presença? Ao cancelar você poderá perder sua vaga.'
      if (event.waitList.length > 0 && event.participants.length === event.maxParticipants) {
        message = 'Você tem certeza que deseja cancelar sua presença? Ao cancelar você perderá sua vaga imediatamente.'
      }

      let action = null
      if (viewer.email !== creator.email) {
        if (userIsIn(viewer, participants)) {
          action = (
            <p>
              <Confirm
                open={confirm}
                content={message}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
              <Button
                negative fluid
                loading={quitList && quitList.data === null && quitList.error === null}
                onClick={() => this.handleClickCancel(viewer, event)}
              >
                <Icon name='remove user' />
                Cancelar Presença
              </Button>
            </p>
          )
        } else if (userIsIn(viewer, waitList)) {
          action = (
            <p>
              <Button
                negative fluid
                loading={quitList && quitList.data === null && quitList.error === null}
                onClick={() => events.quitList(viewer, event.id)}
              >
                <Icon name='remove user' />
                Sair da Lista de Espera
              </Button>
            </p>
          )
        } else {
          if (participants.length < maxParticipants) {
            action = (
              <p>
                <Button
                  positive fluid
                  loading={participate && participate.data === null && participate.error === null}
                  onClick={() => events.participate(viewer, event.id)}
                >
                  <Icon name='add user' />
                  Confirmar Presença
                </Button>
              </p>
            )
          } else {
            action = (
              <p>
                <Button
                  primary fluid
                  loading={participate && participate.data === null && participate.error === null}
                  onClick={() => events.participate(viewer, event.id)}
                >
                  <Icon name='add user' />
                  Entrar na Fila de Espera
                </Button>
              </p>
            )
          }
        }
      }

      return (
        <div className='EventView'>
          <h1>{title}</h1>
          <p>
            <span className='EventView-Icon'>
              <Icon disabled name='calendar' /> {moment(beginsAt).format('DD/MM/YYYY')}
            </span>
            <span className='EventView-Icon'>
              <Icon disabled name='clock' /> {moment(beginsAt).format('HH:mm')}
            </span>
            {!isDesktop && <br />}
            <span className='EventView-Icon'>
              <Participants min={minParticipants} max={maxParticipants} participants={participants} />
            </span>
            {!isDesktop && <br />}
            <span className='EventView-Icon'>
              <Icon disabled name='location arrow' /> {location}
            </span>
          </p>
          <p>{categories.map(category => (
              <span key={category} className='Category'>{category}</span>
          ))}</p>
          <div className='EventView-description'>
            {description.split('\n').map(
              (line, index) => <p key={index}>{line}</p>
            )}
          </div>
          <div className='EventView-action'>{action}</div>
          <br />
          <ParticipantsList participants={participants} />
          <br />
          <WaitList waitList={waitList} />
          <p style={{ color: '#ccc'}}>Evento craido por {creator.name}</p>
        </div>
      )
    }

    return null
  }
}

export default withDeviceWidth(EventView)
