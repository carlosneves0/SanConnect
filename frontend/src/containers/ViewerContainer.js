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
    this._polling = null
  }

  setOnError(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback provided to ViewerContainer must be a funcion.')
    }
    this.onError = callback
  }

  clear() {
    this.setState({ viewer: null })
  }

  async fetch() {
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
      this.onError(new Error(
        'Falha ao carregar os dados da conta. Tentando novamente...'
      ))
      // Retry after 8s
      setTimeout(() => this.setState({ viewer: null }), 8000)
    }
  }

  freeze() {
    clearInterval(this._polling)
    this._polling = null
  }

  poll() {
    if (this._polling === null) {
      this._polling = setInterval(() => {
        const { viewer } = this.state
        if (viewer === null) {
          this.fetch()
        } else {
          const { data, error } = viewer
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

export default ViewerContainer
