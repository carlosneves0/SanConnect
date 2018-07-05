import { Container } from 'unstated'
import CategoriesQuery from '../graphql/CategoriesQuery'

class CategoriesContainer extends Container {
  state = {
    categories: null
  }

  constructor() {
    super()
    this._polling = null
  }

  // No need to notify the user about this one.
  // setOnError(callback) {
  //   if (typeof callback !== 'function') {
  //     throw new Error(
  //       'Callback provided to CategoriesContainer must be a funcion.'
  //     )
  //   }
  //   this.onError = callback
  // }

  clear() {
    this.setState({ categories: null })
  }

  async fetch() {
    this.setState({
      categories: {
        data: null,
        error: null
      }
    })

    try {
      const data = await CategoriesQuery()
      this.setState({
        categories: {
          data: data,
          error: null
        }
      })
    } catch (error) {
      // this.onError(new Error(
      //   'Falha ao carregar os eventos atuais. Tentando novamente...'
      // ))
      // Retry immediately
      this.setState({ categories: null })
    }
  }

  freeze() {
    clearInterval(this._polling)
    this._polling = null
  }

  poll() {
    if (this._polling === null) {
      this._polling = setInterval(() => {
        const { categories } = this.state
        if (categories === null) {
          this.fetch()
        } else {
          const { data, error } = categories
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

export default CategoriesContainer
