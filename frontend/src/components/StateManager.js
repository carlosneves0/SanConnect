import React from 'react'
import { Network } from 'react-fns'
import { Subscribe } from 'unstated'
import { withRouter } from 'react-router-dom'
import AuthContainer from '../containers/AuthContainer'
import NotificationContainer from '../containers/NotificationContainer'
import ViewerContainer from '../containers/ViewerContainer'
import PublicEventsContainer from '../containers/PublicEventsContainer'
import EventsContainer from '../containers/EventsContainer'

const withState = Component => (
  props => (
    <Network>
      {({ online }) => (
        <Subscribe
          to={[
            AuthContainer,
            NotificationContainer,
            ViewerContainer,
            PublicEventsContainer,
            EventsContainer
          ]}
        >
          {(auth, notify, viewer, publicEvents, events) => (
            <Component
              {...props}
              online={online}
              auth={auth}
              notify={notify}
              viewer={viewer}
              publicEvents={publicEvents}
              events={events}
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

    const { auth, viewer, publicEvents, events } = props

    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)

    auth.setOnError(this.handleError)
    auth.setOnSignUp(this.handleSignUp)
    auth.setOnSignIn(this.handleSignIn)
    auth.setOnSignOut(this.handleSignOut)

    viewer.setOnError(this.handleError)

    publicEvents.setOnError(this.handleError)

    events.setOnError(this.handleError)
  }

  componentDidMount() {
    this.handleOnline()
  }

  componentWillUnmount() {
    this.handleOffline()
  }

  handleOnline = () => {
    const { online, auth, viewer, publicEvents, events } = this.props
    if (online) {
      if (auth.isSignedIn()) {
        viewer.poll()
        events.poll()
      } else {
        publicEvents.poll()
      }
    }
  }

  handleOffline = () => {
    const { viewer, publicEvents, events } = this.props
    viewer.freeze()
    events.freeze()
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
    const { viewer, publicEvents, events } = this.props
    viewer.poll()
    events.poll()
    publicEvents.clear()
    // privateFeed.poll()
  }

  handleSignOut = () => {
    const { viewer, publicEvents, events } = this.props
    viewer.clear()
    events.clear()
    publicEvents.poll()
    // privateFeed.clear()
  }

  render() {
    return React.cloneElement(this.props.children, {...this.props})
  }
}

export default withState(withRouter(StateManager))
