import React from 'react'
import { Container, Subscribe } from 'unstated'
import GetAllEventsQuery from '../graphql/GetAllEventsQuery'

type Event = {
  creator: string,
  titulo: string,
  beginsAt: ?string,
  description: ?string,
  minParticipants: ?string,
  maxParticipants: ?string,
  createdAt: ?string,
  place: ?string,
  categories: string,
  participants: ?string
}

type EventsState = {
  data: ?Array<Event>,
  error: ?string
}

class EventsContainer extends Container<EventsState> {
  constructor() {
    super()

    // this.notify = notify || { danger: () => console.warn('Default notify', arguments) }

    this.state = {
      events: null
    }

    this.poll()
  }

  async fetch() {
    this.setState({
      events: {
        data: null,
        error: null
      }
    })

    try {
      const data = await GetAllEventsQuery()
      this.setState({
        events: {
          data: data,
          error: null
        }
      })
    } catch (error) {
      this.setState({
        events: {
          data: null,
          error: error.message
        }
      })
    }
  }

  poll() {
    if (typeof this._polling === 'undefined' || this._polling === null) {
      this._polling = setInterval(
        () => {
          const { events } = this.state
          if (events === null) {
            console.log('[events] _polling')
            this.fetch()
          } else {
            const { data, error } = events
            if (data !== null) {
              clearInterval(this._polling)
              this._polling = null
              console.log('[events]', data)
            } else if (error !== null) {
              // this.notify.danger({ message: error })
              console.warn('[events]', error)
              throw error
            } else {
              // Loading...
            }
          }
        },
        1000
      )
    }
  }
}

export default EventsContainer

const withEvents = Component => (
  props => (
    <Subscribe to={[EventsContainer]}>
      {events => <Component {...props} events={events} />}
    </Subscribe>
  )
)

export { withEvents }
