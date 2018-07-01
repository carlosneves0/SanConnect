import React from 'react'
import { Redirect } from 'react-router-dom'

const NotFound = ({ notify }) => {
  notify.info({ message: 'Página não encontrada' })
  return <Redirect to='/' />
}

export default NotFound
