import React from 'react'
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
            <li key={user.email}>
              {user.picture ? (
                <img src={user.picture} />
              ) : (
                <img src={defaultPicture} />
              )}
              <span>{user.name}</span>
            </li>
          )
        )}
      </ul>
    </div>
  )
)

export default WaitList
