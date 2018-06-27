const bcrypt = require('bcrypt')

/* Generation the hash. */
function hash(password, pool) {
	return new Promise(async (resolve, reject) => {
		const hash = await bcrypt.hash(password, 10).catch(resolve)
		resolve(hash)
	})
}

async function authenticate(email, password, pool) {	
	/* Verifica se o usuário está no banco. */
	query = {
		text: 'SELECT PASSWORD FROM USUARIO WHERE EMAIL=$1',
		values: [email]
	}	
	res = await pool.query(query)

	if(res.rowCount === 0) {
		return false
	} else {			
		/* Retorna true ou false. */
		return bcrypt.compare(password, res.rows[0].password)				
	}
}

module.exports = {
	hash,
	authenticate
}
