const jwt = require('jsonwebtoken')
const auth = require('../../authentication')
const JWT_SECRET = require('../../jwt-secret')

async function signIn({ email, password }, { pool }) {
  /* Autentica um determinado usuário. */
  if(await auth.authenticate(email, password, pool) !== true) {
    throw new Error('Usuário ou senha inválido.')
  }

  return {
    accessToken: jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' })
  }
}

module.exports = signIn
