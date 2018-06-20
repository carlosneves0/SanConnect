import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Network } from 'react-fns'
import Offline from './Offline'
import App from '../App'

const Root = () => (
  <BrowserRouter>
    <Network
      render={
        network => network.online ? <App /> : <Offline />
      }
    />
  </BrowserRouter>
)

export default Root
