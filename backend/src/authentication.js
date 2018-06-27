const bcrypt = require('bcrypt')
const {pool, client} = require('./database')

/* Generation the hash. */
function hash(password) {
	return new Promise(async (resolve, reject) => {
		const hash = await bcrypt.hash(password, 10).catch(resolve)
		resolve(hash)
	})
}

function authenticate(email, password) {
	/* Pegar a hash do banco. */
	query = {
		text: 'SELECT PASSWORD FROM USUARIO WHERE EMAIL=$1',
		values: [email]
	}

	pool.query(query, (err, res) => {						
		if(err) {
			console.log(err)		
			throw new Error('Usuário inexistente no banco. ')
		} else {			
			console.log(res)
			return bcrypt.compare(password, res)
		}
	})	
}

module.exports = {
	hash,
	authenticate
}
