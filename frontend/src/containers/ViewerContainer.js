// @flow
import React from 'react'
import { Container, Subscribe } from 'unstated'
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
          data: data,
          error: null
        }
      })
    } catch (error) {
      this.setState({
        viewer: {
          data: null,
          error: error.message
        }
      })
    }
  }

  poll = notify => {
    if (typeof this.polling === 'undefined' || this.polling === null) {
      this.polling = setInterval(() => {
        const { viewer } = this.state
        if (viewer === null) {
          this.fetch()
        } else {
          const { data, error } = viewer
          if (data !== null) {
            clearInterval(this.polling)
            this.polling = null
          } else if (error !== null) {
            notify.danger({ message: error })
          } else {
            // Loading...
          }
        }
      }, 1000)
    }
  }
}

export default ViewerContainer

const withViewer = Component => (
  props => (
    <Subscribe to={[ViewerContainer]}>
      {viewer => <Component {...props} viewer={viewer} />}
    </Subscribe>
  )
)

export { withViewer }
