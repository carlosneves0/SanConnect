import React from 'react'
import { Loader, Icon } from 'semantic-ui-react'
import PublicEvent from './PublicEvent'
import './EventFeed.css'

const EventFeed = ({ auth, notify, publicEvents }) => {
  if (auth.isSignedIn()) {
    return (
      <div>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
        <h1>Signed in EventFeed</h1>
      </div>
    )
  } else {
    const request = publicEvents.state.publicEvents
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
            (event, index) => (
              <PublicEvent
                key={index}
                onClick={() => {
                  notify.info({
                    message: 'Cadastre-se para ver mais informações!',
                    duration: 1400
                  })
                }}
                {...event}
              />
            )
          )}
        </div>
      )
    }
  }
}

export default EventFeed
