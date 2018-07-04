const auth = require('../../authentication')

/* Função que permite a atualização da senha do usuário. */
async function updatePassword({ user }, { pool, viewer }) {
	if(viewer.email !== user.email)
		throw new Error('Credenciais inválidas.')

	try {
		/* Tenta realizar a autenticação do usuário. */
		if(await auth.authenticate(viewer.email, user.password, pool) === true) {
			/* Inicia uma transação. */
			await pool.query('BEGIN')

			/* Obtém a hash correspondente a nova senha do usuário. */
			let password = await auth.hash(user.newPassword, pool)

			let query = {
				text: 'UPDATE _USER SET PASSWORD = $1 WHERE EMAIL = $2',
				values: [password, viewer.email]
			}

			/* Grava no banco a nova informação. */
			await pool.query(query)
			
			/* Encerra a transação. */
			await pool.query('COMMIT')
			
			return 'Senha alterada com sucesso.'
		} else {
			return 'Falha na autenticação.'
		}
	} catch(err) {		
		throw err
	}
}

module.exports = updatePassword