import React from 'react'
import { Loader, Icon } from 'semantic-ui-react'
import { Base64 } from 'js-base64'
import { withRouter } from 'react-router-dom'
import Event from './Event'
import PublicEvent from './PublicEvent'
import './EventFeed.css'

const EventFeed = ({ auth, events, viewer, history, notify, publicEvents }) => {
  if (auth.isSignedIn()) {
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
      viewer = request0.data
      const data = request.data.filter(
        event => new Date(event.beginsAt) > new Date() &&
        event.creator.email !== viewer.email
      )
      return (
        <div className='EventFeed'>
          {data.map(
            (event, index) => (
              <Event
                key={index}
                onClick={() => history.push(`/event/${Base64.encode(event.id)}`)}
                {...event}
              />
            )
          )}
        </div>
      )
    }
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
      const data = request.data.filter(
        event => new Date(event.beginsAt) > new Date()
      )
      return (
        <div className='EventFeed'>
          {data.map(
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

export default withRouter(EventFeed)
