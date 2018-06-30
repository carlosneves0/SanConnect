const auth = require('../../authentication')

/* Função que realiza o signUp do usuário. */
async function signUp({ user }, { pool }) {
	let {email, password, nome, descricao, foto} = user

	/* TODO
	Realizar verificações de cada atributo passado no objeto.
	Retornar erro/exception para a interface caso não obtenha sucesso.*/

	password = await auth.hash(password, pool)
	if (typeof password !== 'string') {
		throw new Error('Senha inválida.')
	}

	/* Caso passe em todas as verificações, tenta gravar no banco. */
	let query = {
		text: 'INSERT INTO USUARIO VALUES($1, $2, $3, $4, $5, $6, $7)',
		values: [email, password, nome, descricao, foto, 0, 0 ]
	}

	try {
		await pool.query(query)

		user.likes = 0
		user.dislikes = 0

		return user
	} catch(err) {
		throw err
	}
}

module.exports = signUp
