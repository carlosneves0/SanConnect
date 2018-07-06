import React from 'react'
import { Link } from 'react-router-dom'
import { Base64 } from 'js-base64'
import defaultPicture from '../Layout/Avatar/default-picture.jpg'

const WaitList = ({ waitList }) => (
  waitList.length === 0 ? (
    <p className='WaitList'>Nenhum usuário na lista de espera</p>
  ) : (
    <div className='WaitList'>
      <h3>Lista de Espera</h3>
      <ul>
        {waitList.map(
          user => (
            <Link key={user.email} to={`/user/${Base64.encode(user.email)}`}>
              <li>
                {user.picture ? (
                  <img src={user.picture} alt='user profile' />
                ) : (
                  <img src={defaultPicture} alt='user profile' />
                )}
                <span>{user.name}</span>
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  )
)

export default WaitList
