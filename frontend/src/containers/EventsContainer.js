import { Container } from 'unstated'
import EventsQuery from '../graphql/EventsQuery'
import CreateEventMutation from '../graphql/CreateEventMutation'
import ParticipateMutation from '../graphql/ParticipateMutation'
import QuitListMutation from '../graphql/QuitListMutation'

class EventsContainer extends Container {
  state = {
    events: null,
    participate: null,
    quitList: null
  }

  constructor() {
    super()
    this._polling = null
  }

  setOnError(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback provided to EventsContainer must be a funcion.'
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

  async createEvent(event) {
    await CreateEventMutation(event)
    this.setState({ events: null }, () => this.poll())
  }

  userIsIn(user, arrayOfUsers) {
    for (let i = 0; i < arrayOfUsers.length; i++) {
      if (user.email === arrayOfUsers[i].email) {
        return true
      }
    }
    return false
  }

  initRequest(key) {
    this.setState({
      [key]: {
        data: null,
        error: null
      }
    })
  }

  onData(key, data) {
    this.setState({
      [key]: {
        data,
        error: null
      }
    })
  }

  _onError(key, error) {
    this.setState({
      [key]: {
        data: null,
        error
      }
    })
  }

  async participate(viewer, eventId) {
    this.initRequest('participate')

    let result = null
    try {
      this.onData('participate', await ParticipateMutation(eventId))
      this.setState(({ events }) => {
        const data = events.data.slice()
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === eventId) {
            const max = data[i].maxParticipants
            if (max  === parseInt(max, 10)) {
              if (data[i].participants.length < data[i].maxParticipants) {
                data[i].participants.push(viewer)
              } else {
                data[i].waitList.push(viewer)
              }
            } else {
              data[i].participants.push(viewer)
            }
          }
        }
        return { events: { data, error: null } }
      })
    } catch (error) {
      this._onError('participate', error)
    }
  }

  async quitList(viewer, eventId) {
    this.initRequest('quitList')

    let result = null
    try {
      this.onData('quitList', await QuitListMutation(eventId))
      this.setState(({ events }) => {
        const data = events.data.slice()
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === eventId) {
            if (this.userIsIn(viewer, data[i].participants)) {
              if (data[i].participants.length === data[i].maxParticipants) {
                // Take the first from waitList.
                if (data[i].waitList.length > 0) {
                  const nextInLine = data[i].waitList[0]
                  data[i].waitList.splice(0, 1)
                  data[i].participants.push(nextInLine)
                }
              }
              data[i].participants = data[i].participants.filter(
                user => user.email !== viewer.email
              )
            } else if (this.userIsIn(viewer, data[i].waitList)) {
              data[i].waitList = data[i].waitList.filter(
                user => user.email !== viewer.email
              )
            }
          }
        }
        return { events: { data, error: null } }
      })
    } catch (error) {
      this._onError('quitList', error)
    }
  }
}

export default EventsContainer
