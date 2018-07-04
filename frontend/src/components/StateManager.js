import React from 'react'
import { Network } from 'react-fns'
import { Subscribe } from 'unstated'
import { withRouter } from 'react-router-dom'
import AuthContainer from '../containers/AuthContainer'
import NotificationContainer from '../containers/NotificationContainer'
import ViewerContainer from '../containers/ViewerContainer'

const withState = Component => (
  props => (
    <Network>
      {({ online }) => (
        <Subscribe
          to={[
            AuthContainer,
            NotificationContainer,
            ViewerContainer
          ]}
        >
          {(auth, notify, viewer) => (
            <Component
              {...props}
              online={online}
              auth={auth}
              notify={notify}
              viewer={viewer}
            />
          )}
        </Subscribe>
      )}
    </Network>
  )
)

class StateManager extends React.Component {
  constructor(props) {
    super(props)

    const { auth, viewer } = props

    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)

    auth.setOnError(this.handleError)
    auth.setOnSignUp(this.handleSignUp)
    auth.setOnSignIn(this.handleSignIn)
    auth.setOnSignOut(this.handleSignOut)

    viewer.setOnError(this.handleError)
  }

  componentDidMount() {
    const { online, auth, viewer } = this.props
    if (online) {
      if (auth.isSignedIn()) {
        viewer.poll()
      } else {
        // publicFeed.poll()
      }
    }
  }

  componentWillUnmount() {
    const { viewer } = this.props
    viewer.freeze()
  }

  handleOnline = () => {
    const { viewer } = this.props
    viewer.poll()
  }

  handleOffline = () => {
    const { viewer } = this.props
    viewer.freeze()
  }

  handleError = error => {
    this.props.notify.danger({ message: error.message })
  }

  handleSignUp = () => {
    const { notify, history } = this.props
    notify.success({ message: 'Conta criada com sucesso' })
    history.push('/sign-in')
  }

  handleSignIn = () => {
    const { viewer } = this.props
    viewer.poll()
    // publicFeed.clear()
    // privateFeed.poll()
  }

  handleSignOut = () => {
    const { viewer } = this.props
    viewer.clear()
    // privateFeed.clear()
    // publicFeed.poll()
  }

  render() {
    return (
      <div>
        {React.cloneElement(
          this.props.children,
          {...this.props}
        )}
      </div>
    )
  }
}

export default withState(withRouter(StateManager))
