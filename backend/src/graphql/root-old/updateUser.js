/* Função que atualiza as informações pessoais de um usuário. */
async function updateUser({ user }, { pool, viewer }) {
	if(viewer.email !== user.email) 
		throw new Error('Usuário não autenticado.')

	let query = {
		text: 'UPDATE _USER SET NOME = $1, DESCRICAO = $2, FOTO = $3 WHERE EMAIL = $4',
		values: [user.nome, user.descricao, user.foto, viewer.email]
	}

	try {
		let res = await pool.query(query)
		if(res.rowCount > 0)
			return 'Informações alteradas com sucesso.'
		else
			return 'Falha na atualização das informações.'		
	} catch(err) {
		throw(err)
	}
}

module.exports = updateUser