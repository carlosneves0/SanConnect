const auth = require('../../authentication')

async function signIn({ email, password }, { pool }) {
	
	/* Autentica um determinado usuário. */
	if(await auth.authenticate(email, password, pool) === true) {
		console.log('Autenticado.') 
	} else {
		throw new Error('Usuário ou senha inválido.')
	}
	
	/* TODO
		 Deve retornar um token de autenticação.
		 Verificar biblioteca a qual gera o token.
		 Por enquanto retorna só uma string.
	*/  
	return { accessToken: `a-jwt-with-the-user-email|${email}` }
}

module.exports = signIn

// We can also return a Promise.
// return new Promise((resolve, reject) => {
//    // postgres from context
//    postgres.query('select * from ...', (res, err) => {
//      if (err) reject(err)
//      resolve(res[0])
//   })
// })