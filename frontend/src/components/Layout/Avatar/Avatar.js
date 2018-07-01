import React from 'react'
import defaultPicture from './default-picture.jpg'
import errorPicture from './error-picture.jpg'
import './Avatar.css'

const Avatar = ({ viewer }) => {
  console.log(viewer)
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
        className='Avatar'
        src={viewer.data.picture || defaultPicture}
        alt='Foto do Perfil do Usuário'
      />
    )
  }
}

export default Avatar
