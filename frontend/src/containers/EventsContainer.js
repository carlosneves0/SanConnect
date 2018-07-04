import { Container } from 'unstated'
import EventsQuery from '../graphql/EventsQuery'

class PublicEventsContainer extends Container {
  state = {
    events: null
  }

  constructor() {
    super()
    this._polling = null
  }

  setOnError(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback provided to PublicEventsContainer must be a funcion.'
      )
    }
    this.onError = callback
  }

  clear() {
    this.setState({ events: null })
  }

  async fetch() {
    this.setState({
      events: {
        data: null,
        error: null
      }
    })

    try {
      const data = await EventsQuery()
      this.setState({
        events: {
          data: data,
          error: null
        }
      })
    } catch (error) {
      this.onError(new Error(
        'Falha ao carregar os eventos atuais. Tentando novamente...'
      ))
      // Retry after 8s
      setTimeout(() => this.setState({ events: null }), 8000)
    }
  }

  freeze() {
    clearInterval(this._polling)
    this._polling = null
  }

  poll() {
    if (this._polling === null) {
      this._polling = setInterval(() => {
        const { events } = this.state
        if (events === null) {
          this.fetch()
        } else {
          const { data, error } = events
          if (data !== null) {
            this.freeze()
          } else if (error !== null) {
            // There was an error fetching.
          } else {
            // Still loading...just wait.
          }
        }
      }, 1000)
    }
  }
}

export default PublicEventsContainer
