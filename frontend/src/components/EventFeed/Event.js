import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const Participants = ({ min, max, participants }) => {
  if (max) {
    return (
      <span>
        <Icon name='users' />
        Participantes:{' '}{participants.length}/{max}{' '}
        <span className={participants.length < min ? 'danger' : ''}>
          (mínimo: {min})
        </span>
      </span>
    )
  } else {
    return (
      <span>
        <Icon name='users' />
        Participantes:{' '}{participants.length}{' '}
        <span className={participants.length < min ? 'danger' : ''}>
          (mínimo: {min})
        </span>
      </span>
    )
  }
}

const Category = ({ category }) => (
  <span className='Category'>{category}</span>
)

const Event = ({
  creator,
  title,
  beginsAt,
  description,
  minParticipants,
  maxParticipants,
  createdAt,
  location,
  categories,
  participants,
  onClick
}) => (
  <Card className='Event-Card' onClick={onClick}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
    </Card.Content>
    <Card.Content>
      <Card.Description>
        <Icon name='calendar alternate' />
        {new Date(beginsAt).toLocaleString()}
      </Card.Description>
      {location && (
        <Card.Description>
          <br />
          <Icon name='map marker alternate' />
          {location}
        </Card.Description>
      )}
      <br />
      <Card.Description>
        <Participants min={minParticipants} max={maxParticipants} participants={participants} />
      </Card.Description>
      {description && (
        <Card.Description>
          <br />
          {description}
        </Card.Description>
      )}
      <br />
      <Card.Meta>
        <Icon name='user' />
        <span>Criado por {creator.name}</span>
      </Card.Meta>
      <br />
      <Card.Meta>
        <Icon name='calendar alternate' />
        Criado em {new Date(createdAt).toLocaleString()}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      {categories.map(
        category => <Category key={category} category={category} />
      )}
    </Card.Content>
  </Card>
)

export default Event
