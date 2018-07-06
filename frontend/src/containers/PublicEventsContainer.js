//  @flow
import { Container } from 'unstated'
import PublicEventsQuery from '../graphql/PublicEventsQuery'

type PublicEvent = {
  creator: string,
  title: string,
  beginsAt: string,
  categories: Array<string>
}

type PublicEventsState = {
  data: ?Array<PublicEvent>,
  error: ?{}
}

class PublicEventsContainer extends Container<PublicEventsState> {
  state = {
    publicEvents: null
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
    this.setState({ publicEvents: null })
  }

  async fetch() {
    this.setState({
      publicEvents: {
        data: null,
        error: null
      }
    })

    try {
      const data = await PublicEventsQuery()
      this.setState({
        publicEvents: {
          data: data,
          error: null
        }
      })
    } catch (error) {
      this.onError(new Error(
        'Falha ao carregar os eventos públicos atuais. Tentando novamente...'
      ))
      // Retry after 8s
      setTimeout(() => this.setState({ publicEvents: null }), 8000)
    }
  }

  freeze() {
    if (this._polling !== null) {
      clearInterval(this._polling)
      this._polling = null
    }
  }

  poll() {
    if (this._polling === null) {
      this._polling = setInterval(() => {
        const { publicEvents } = this.state
        if (publicEvents === null) {
          this.fetch()
        } else {
          const { data, error } = publicEvents
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
