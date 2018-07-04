import React from 'react'
import { Network } from 'react-fns'
import { Subscribe } from 'unstated'
import { withRouter } from 'react-router-dom'
import AuthContainer from '../containers/AuthContainer'
import NotificationContainer from '../containers/NotificationContainer'
import ViewerContainer from '../containers/ViewerContainer'
import PublicEventsContainer from '../containers/PublicEventsContainer'

const withState = Component => (
  props => (
    <Network>
      {({ online }) => (
        <Subscribe
          to={[
            AuthContainer,
            NotificationContainer,
            ViewerContainer,
            PublicEventsContainer
          ]}
        >
          {(auth, notify, viewer, publicEvents) => (
            <Component
              {...props}
              online={online}
              auth={auth}
              notify={notify}
              viewer={viewer}
              publicEvents={publicEvents}
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

    const { auth, viewer, publicEvents } = props

    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)

    auth.setOnError(this.handleError)
    auth.setOnSignUp(this.handleSignUp)
    auth.setOnSignIn(this.handleSignIn)
    auth.setOnSignOut(this.handleSignOut)

    viewer.setOnError(this.handleError)

    publicEvents.setOnError(this.handleError)
  }

  componentDidMount() {
    this.handleOnline()
  }

  componentWillUnmount() {
    this.handleOffline()
  }

  handleOnline = () => {
    const { online, auth, viewer, publicEvents } = this.props
    if (online) {
      if (auth.isSignedIn()) {
        viewer.poll()
      } else {
        publicEvents.poll()
      }
    }
  }

  handleOffline = () => {
    const { viewer, publicEvents } = this.props
    viewer.freeze()
    publicEvents.freeze()
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
    const { viewer, publicEvents } = this.props
    viewer.poll()
    publicEvents.clear()
    // privateFeed.poll()
  }

  handleSignOut = () => {
    const { viewer, publicEvents } = this.props
    viewer.clear()
    publicEvents.poll()
    // privateFeed.clear()
  }

  render() {
    return React.cloneElement(this.props.children, {...this.props})
  }
}

export default withState(withRouter(StateManager))
