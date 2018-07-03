import React from 'react'
import { Loader, Icon } from 'semantic-ui-react'
import Event from './PublicEvent'
import { withEvents } from '../../containers/EventsContainer'
import './EventFeed.css'

const EventFeed = ({ auth, events }) => {
  return (
    <div>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
      <h1>EventFeed</h1>
    </div>
  )
  const request = events.state.events
  if (
    request === null || (
      request.error === null && request.data === null
    )
  ) {
    return (
      <Loader className='App-fixed-content' active>
        Carregando Eventos...
      </Loader>
    )
  } else if (request.error !== null) {
    return (
      <h3 className='App-fixed-center danger'>
        <Icon name='warning circle' />
        Erro ao carregar os eventos
      </h3>
    )
  } else if (request.data !== null) {
    return (
      <div className='EventFeed'>
        {request.data.map(
          (event, index) => <Event key={index} {...event} />
        )}
      </div>
    )
  }
}

export default withEvents(EventFeed)
