// @flow
import { Container } from 'unstated'
import ViewerQuery from '../graphql/ViewerQuery'

type ViewerState = {
  viewer: ?{
    email: string,
    name: string,
    description: ?string,
    picture: ?string,
    likes: number,
    dislikes: number
  }
}

class ViewerContainer extends Container<ViewerState> {
  state = {
    viewer: null
  }

  constructor() {
    super()
    this.polling = null
  }

  setOnError(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to ViewerContainer must be a funcion.')
    }
    this.onError = callback
  }

  set = data => {
    this.setState({
      viewer: {
        data: data,
        error: null
      }
    })
  }

  clear = () => {
    this.setState({ viewer: null })
  }

  fetch = async () => {
    this.setState({
      viewer: {
        data: null,
        error: null
      }
    })

    try {
      const data = await ViewerQuery()
      this.setState({
        viewer: {
          data,
          error: null
        }
      })
    } catch (error) {
      this.onError(error)
      this.setState({ viewer: null })
    }
  }

  poll = () => {
    if (this.polling === null) {
      this.polling = setInterval(() => {
        const { viewer } = this.state
        if (viewer === null) {
          this.fetch()
        } else {
          const { data, error } = viewer
          if (data !== null) {
            this.freeze()
          } else if (error !== null) {
            throw new Error('Should never reach this. Error is never set with setState.')
          } else {
            // Still loading...let's wait.
          }
        }
      }, 1000)
    }
  }

  freeze = () => {
    clearInterval(this.polling)
    this.polling = null
  }
}

export default ViewerContainer
