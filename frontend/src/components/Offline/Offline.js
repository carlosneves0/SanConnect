import React from 'react'
import rex from './rex.gif'
import './Offline.css'

const Offline = () => (
  <div className='Offline-div'>
    <img
      src={rex}
      className='Offline-rex'
      alt='Animation to indicate the user is offline'
    />
    <h1>Você está offline</h1>
  </div>
)

export default Offline
