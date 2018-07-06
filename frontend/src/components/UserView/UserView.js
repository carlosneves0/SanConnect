import React from 'react'
import { Loader, Icon } from 'semantic-ui-react'
import { Base64 } from 'js-base64'
import defaultPicture from '../Layout/Avatar/default-picture.jpg'
import './UserView.css'

function findUser(events, userEmail) {
  for (let i = 0; i < events.length; i++) {
    const users = [...events[i].participants, ...events[i].waitList]
    for (let j = 0; j < users.length; j++) {
      if (users[j].email === userEmail) {
        return users[j]
      }
    }
  }
  return null;
}

const UserView = ({ events, match }) => {
  const request = events.state.events
  if (
    request === null || (
      request.error === null && request.data === null
    )
  ) {
    return (
      <Loader className='App-fixed-content' active>
        Carregando Evento...
      </Loader>
    )
  } else if (request.error !== null) {
    return (
      <h3 className='App-fixed-center danger'>
        <Icon name='warning circle' />
        Erro ao carregar o evento
      </h3>
    )
  } else if (request.data !== null) {
    const {
      email,
      name,
      description,
      picture,
      likes,
      dislikes
    } = findUser(request.data, Base64.decode(match.params.id))
    return (
      <div className='UserView'>
        {picture ? (
          <img src={picture} alt='user profile' />
        ) : (
          <img src={defaultPicture} alt='user profile' />
        )}
        <h1>{name}</h1>
        <h2>{email}</h2>
        {description && (
          <div className='UserView-description'>
            {description.split('\n').map(
              (line, index) => <h4 key={index}>{line}</h4>
            )}
          </div>
        )}
        <span className='UserView-thumbs-up'>
          <Icon circular color='green' name='thumbs up outline' />{' '}{likes}
        </span>
        <span className='UserView-thumbs-down'>
          <Icon circular color='red' name='thumbs down outline' />{' '}{dislikes}
        </span>
      </div>
    )
  }
}

export default UserView
