const bcrypt = require('bcryptjs')

/* Gera a hash correspondente a senha do usuário. */
function hash(password, pool) {
	return new Promise(async (resolve, reject) => {
		const hash = await bcrypt.hash(password, 10).catch(resolve)
		resolve(hash)
	})
}

/* Autentica um determinado usuário pelo banco de dados. */
async function authenticate(email, password, pool) {	
	let query = {
		text: 'SELECT PASSWORD FROM USUARIO WHERE EMAIL=$1',
		values: [email]
	}	
	/* Verifica se o usuário está no banco. */
	let res = await pool.query(query)

	if(res.rowCount === 0) {
		return false
	} else {			
		/* Retorna true se a senha estiver correta e false caso contrário. */
		return bcrypt.compare(password, res.rows[0].password)				
	}
}

module.exports = {
	hash,
	authenticate
}