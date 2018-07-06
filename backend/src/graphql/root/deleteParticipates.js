/* Remove um usuário do evento. Confirma o primeiro usuario da lista de espera. */
async function deleteParticipates({ event }, { pool, viewer }) {
	/* Exige que um usuário esteja autenticado para ingressar em um evento. */
	if(viewer === null) {
		throw new Error('Usuário não autenticado.')
	}

	let query = []

	/* Confirma se o usuário não é o criador do evento. */
	query[0] = {
		text: "SELECT CREATOR FROM EVENT WHERE ID = $1 AND CREATOR = $2",
		values: [event, viewer.email]
	}

	/* Deletar usuario do evento */
	query[1] = {
		text: "DELETE FROM PARTICIPATES P WHERE P.EVENT = $1 AND UPPER(P.PARTICIPANT) = UPPER($2)",
		values: [event, viewer.email]
	}

	/* Verifica se o limite max do evento ainda nao foi atingido */
	query[2] = {
		text: "SELECT COUNT(*) FROM PARTICIPATES P WHERE P.EVENT = $1 AND CONFIRMATION = TRUE",
		values: [event]
	}

	//
	query[3] = {
		text: "SELECT MAX_PARTICIPANTS FROM EVENT WHERE ID = $1",
		values: [event]
	}

	/* Buscar participante da lista de espera para confirmar no evento. */
	query[4] = {
		text: "SELECT P.PARTICIPANT FROM PARTICIPATES P WHERE P.EVENT = $1 AND P.CONFIRMATION = FALSE ORDER BY P.CREATED_AT ASC LIMIT 1",
		values: [event]
	}

	/* Confirmar candidato da lista de espera */
	query[5] = {
		text: "UPDATE PARTICIPATES SET CONFIRMATION = TRUE WHERE EVENT = $1 AND UPPER(PARTICIPANT) = UPPER($2)",
		values: [event]
	}

	try{
		/* Inicia uma transação. */
		await pool.query('BEGIN')
		if((await pool.query(query[0])).rowCount !== 0)
			throw new Error('O criador do evento não pode sair do próprio evento.')

		/* Realiza as operações necessárias */
		let result = await pool.query(query[1])

		if(result.rowCount !== 1)
			throw new Error('Falha ao cancelar inscrição em evento.')

		// Verifica se o max nao foi atingido.
		const numberOfConfirmedUsers = (await pool.query(query[2])).rows[0].count
		const max = (await pool.query(query[3])).rows[0].max_participants

		if (numberOfConfirmedUsers < max) {
			/* Selecionar candidato da lista de espera */
			let pMail = await pool.query(query[4])

			if(pMail.rowCount === 1) {
				query[5].values.push(pMail.rows[0].participant)
				await pool.query(query[5])
			}
		}

		/* Finaliza a transação. */
		await pool.query('COMMIT')

		return true
	} catch(err) {
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = deleteParticipates
