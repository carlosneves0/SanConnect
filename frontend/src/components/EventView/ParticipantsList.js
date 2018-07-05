import React from 'react'
import defaultPicture from '../Layout/Avatar/default-picture.jpg'

const ParticipantsList = ({ participants }) => (
  participants.length === 0 ? (
    <p className='ParticipantsList'>Nenhum participante no evento</p>
  ) : (
    <div className='ParticipantsList'>
      <h3>Participantes</h3>
      <ul>
        {participants.map(
          participant => (
            <li key={participant.email}>
              {participant.picture ? (
                <img src={participant.picture} />
              ) : (
                <img src={defaultPicture} />
              )}
              <span>{participant.name}</span>
            </li>
          )
        )}
      </ul>
    </div>
  )
)

export default ParticipantsList
