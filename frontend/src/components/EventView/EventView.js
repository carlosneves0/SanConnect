import React from 'react'
import { Loader, Button, Icon, Dropdown, Label } from 'semantic-ui-react'
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

// const Title = ['Estudo em grupo de Cálculo I']
// const Date = ['2018-07-01']
// const Hour = ['01:30 PM']
// const Local = ['Biblioteca - ICMC - USP']
// const Tags = ['']
// const UsersConfirmed = ['3']
// const UsersTotal = ['5']
const EventDescription = ['Vamos nos reunir para resolver a segunda lista de exercícios.']

const confirmed = [
  { key: 'c1', text: 'Confirmado1', value: 'c1' },
  { key: 'c2', text: 'Confirmado2', value: 'c2' },
]

const waiting = [
  { key: 'w1', text: 'Espera1', value: 'w1' },
  { key: 'w2', text: 'Espera2', value: 'w2' },
]

const EventView = ({ match, viewer, events, isDesktop }) => {
  const request = events.state.events
  const request0 = viewer.state.viewer
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

    let action = null
    if (viewer.email !== creator.email) {
      if (userIsIn(viewer, participants)) {
        action = (
          <p><Button negative fluid><Icon name='remove user' />Cancelar Presença</Button></p>
        )
      } else if (userIsIn(viewer, waitList)) {
        action = (
          <p><Button negative fluid><Icon name='remove user' />Sair da Lista de Espera</Button></p>
        )
      } else {
        if (participants.length < maxParticipants) {
          action = <p><Button positive fluid><Icon name='add user' />Confirmar Presença</Button></p>
        } else {
          action = <p><Button primary fluid><Icon name='add user' />Entrar na Fila de Espera</Button></p>
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
        <p className='EventView-description'>{description}</p>
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

export default withDeviceWidth(EventView)
