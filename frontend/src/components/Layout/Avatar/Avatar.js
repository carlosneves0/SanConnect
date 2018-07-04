import React from 'react'
import { withRouter } from 'react-router-dom'
import defaultPicture from './default-picture.jpg'
import errorPicture from './error-picture.jpg'
import './Avatar.css'

const Avatar = ({ viewer, history, onClickAvatar }) => {
  if (
    viewer === null || (
      viewer.data === null && viewer.error === null
    )
  ) {
    return (
      <img
        className='Avatar Avatar-loading'
        src={defaultPicture}
        alt='Carregando foto do Perfil do Usuário'
      />
    )
  } else if (viewer.error !== null) {
    return (
      <img
        className='Avatar'
        src={errorPicture}
        alt='Erro ao carregar foto do Perfil do Usuário'
      />
    )
  } else if (viewer.data !== null) {
    return (
      <img
        className='Avatar Avatar-loaded'
        src={viewer.data.picture || defaultPicture}
        alt='Foto do Perfil do Usuário'
        onClick={() => {
          history.push('/my-profile')
          if (onClickAvatar) {
            onClickAvatar()
          }
        }}
      />
    )
  }
}

export default withRouter(Avatar)
