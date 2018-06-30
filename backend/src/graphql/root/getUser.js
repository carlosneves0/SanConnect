/* Função que retorna as informações pessoais de um usuário. */
async function getUser({ user }, { pool, viewer }) {
	if(viewer === null)
		throw new Error('Usuário não autenticado.')

	let query = {
		text: 'SELECT EMAIL, NOME, DESCRICAO, FOTO, LIKES, DISLIKES FROM USUARIO WHERE EMAIL = $1',
		values: [user.email]
	}

	try {
		let res = await pool.query(query)

		if(res.rowCount === 0)
			throw new Error('Usuário não cadastrado no sistema.')

		user = {}
		user.email = res.rows[0].email
		user.nome = res.rows[0].nome
		user.descricao = res.rows[0].descricao
		user.foto = res.rows[0].foto
		user.likes = res.rows[0].likes
		user.dislikes = res.rows[0].dislikes

		return user
	} catch(err) {
		throw err
	}
}

module.exports = getUser