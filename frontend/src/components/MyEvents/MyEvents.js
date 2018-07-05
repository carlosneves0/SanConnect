import React from 'react'
import { Loader, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './MyEvents.css'

const Event = ({
  title,
  beginsAt,
  location,
  participants,
  minParticipants,
  maxParticipants,
  categories
}) => (
  <li>
    <h1>{title}</h1>
    <p><Icon name='calendar alternate' />{new Date(beginsAt).toLocaleString()}</p>
    {location && (
      <p><Icon name='map marker alternate' />{location}</p>
    )}
    <p>
      <Icon name='users' />
      {participants.length}
      {maxParticipants ? `/${maxParticipants}` : ''}
      {' '}
      <span className={participants.length < minParticipants ? 'danger' : ''}>
        (mínimo: {minParticipants})
      </span>
    </p>
    <p>
      {categories.map(
        category => <span key={category} className='Category'>{category}</span>
      )}
    </p>
  </li>
)

const MyEvents = ({ events, viewer }) => {
  const request = events.state.events
  const request0 = viewer.state.viewer
  if (
    request === null || (
      request.error === null && request.data === null
    ) ||
    request0 === null || (
      request0.error === null && request0.data === null
    )
  ) {
    return (
      <Loader className='App-fixed-content' active>
        Carregando Eventos...
      </Loader>
    )
  } else if (request.error !== null || request0.error !== null) {
    return (
      <h3 className='App-fixed-center danger'>
        <Icon name='warning circle' />
        Erro ao carregar os eventos
      </h3>
    )
  } else if (request.data !== null && request0.data !== null) {
    const data = request.data.filter(
      event => event.creator.email === viewer.state.viewer.data.email
    )

    if (data.length === 0) {
      return (
        <div
          className='App-fixed-center'
          style={{ width: '90vw' }}
        >
          <h1>Você não possui nenhum evento</h1>
          <p><Link to='/create-event'>
            <Button>Criar um Evento</Button>
          </Link></p>
        </div>
      )
    }

    return (
      <div className='MyEvents'>
        <h2 style={{ textAlign: 'center', marginTop: '2vh' }}>Meus Eventos</h2>
        <ul>
          {data.map(
            (event, index) => <Event key={index} {...event} />
          )}
        </ul>
      </div>
    )
  }

  // Should never reach this.
  return null;
}

export default MyEvents
