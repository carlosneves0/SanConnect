import React from 'react'
import { Link } from 'react-router-dom'
import { Base64 } from 'js-base64'
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
            <Link key={participant.email} to={`/user/${Base64.encode(participant.email)}`}>
              <li>
                {participant.picture ? (
                  <img src={participant.picture} alt='user profile' />
                ) : (
                  <img src={defaultPicture} alt='user profile' />
                )}
                <span>{participant.name}</span>
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  )
)

export default ParticipantsList
