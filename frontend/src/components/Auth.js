import React from 'react'
import { Subscribe } from 'unstated'
import AuthContainer from '../containers/AuthContainer'

const Auth = () => (
  <Subscribe to={[AuthContainer]}>
    {auth => (
      
    )}
  </Subscribe>
)
