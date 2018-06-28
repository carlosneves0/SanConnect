import React from 'react'
import { Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated'
import NotificationContainer from '../containers/NotificationContainer'

const NOTIFICATION_CONTAINER_STYLE = {
    position: 'fixed',
    top: '2vh',
    right: 0,
    left: 0,
    zIndex: 1000,
    width: '80vw',
    maxWidth: '400px',
    margin: 'auto',
}

const Notification = ({ id, type, message, header, onClickClose }) => {
  if (header === null || typeof header === 'undefined') {
    if (message === null || typeof message === 'undefined') {
      throw new Error('Received invalid notification with neither header nor message.')
    }
    header = message
    message = null
  }

  return (
    <Message
      {...{ [type]: true }}
      onDismiss={() => onClickClose(id)}
    >
      <Message.Header>{header}</Message.Header>
      <Message.Content>
        {message && message.split('\n').map(
          line => <div>{line}</div>
        )}
      </Message.Content>
    </Message>
  )
}

const NotificationManager = () => (
  <Subscribe to={[NotificationContainer]}>
    {manager => (
      <div style={NOTIFICATION_CONTAINER_STYLE}>
        {manager.state.notifications.map(
          notification => (
            <Notification
              key={notification.id}
              {...notification}
              onClickClose={manager.dismiss}
            />
          )
        )}
      </div>
    )}
  </Subscribe>
)

export default NotificationManager
