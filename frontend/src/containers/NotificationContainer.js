// @flow
import { Container } from 'unstated'

type NotificationState = [{
  id: string,
  type: string,
  header: string,
  message: string
}]

type NotificationArg = {
  type: ?string,
  header: ?string,
  message: string,
  duration: ?number
}

class NotificationContainer extends Container<NotificationState> {
  state = {
    id: 0,
    notifications: []
  }

  notify = ({ type, header, message, duration }: NotificationArg) => {
    if (typeof duration === 'undefined') {
      duration = 4000
    }

    this.setState(prevState => {
      const notification = {
        id: prevState.id,
        type,
        header,
        message,
        duration
      }

      if (duration !== null) {
        setTimeout(() => {
          this.setState(prevState => ({
            notifications: prevState.notifications.filter(
              n => n.id !== notification.id
            )
          }))
        }, duration)
      }

      return {
        id: prevState.id + 1,
        notifications: [...prevState.notifications, notification]
      }
    })
  }

  info = ({ header, message, duration }: NotificationArg) => {
    this.notify({ type: 'info', header, message, duration })
  }

  success = ({ header, message, duration }: NotificationArg) => {
    this.notify({ type: 'success', header, message, duration })
  }

  warn = ({ header, message, duration }: NotificationArg) => {
    this.notify({ type: 'warning', header, message, duration })
  }

  danger = ({ header, message, duration }: NotificationArg) => {
    this.notify({ type: 'negative', header, message, duration })
  }

  dismiss = (id) => {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.id !== id)
    }))
  }
}

export default NotificationContainer
