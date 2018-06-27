const auth = require('../../authentication')

async function signIn({ email, password }, { pool }) {
  
  /* Autentica um determinado usuário. */
  if(await auth.authenticate(email, password, pool) === true) {
    console.log('Autenticado.') 
  } else {
    throw new Error('Usuário ou senha inválido.')
  }
  
  return {
    accessToken: `a-jwt-with-the-user-email|${email}`
  }
  // We can also return a Promise.
  // return new Promise((resolve, reject) => {
  //    // postgres from context
  //    postgres.query('select * from ...', (res, err) => {
  //      if (err) reject(err)
  //      resolve(res[0])
  //   })
  // })
}

module.exports = signIn
