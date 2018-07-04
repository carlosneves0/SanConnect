/* Remove um usuário do evento. Confirma o primeiro usuario da lista de espera. */
async function createParticipa({ participa }, { pool, viewer }) {
	let {criador_evento, titulo, data_hora_evento, email} = participa

	/* Exige que um usuário esteja autenticado para ingressar em um evento. */
	if(viewer.email !== email) {	
		throw new Error('Usuário não autenticado.')
	}
	data_hora_evento = new Date(data_hora_evento)
	let query = []
	console.log(data_hora_evento)
	/* Deletar usuario do evento */
	query[0] = {
		text: "DELETE FROM PARTICIPA P WHERE UPPER(P.CRIADOR_EVENTO) = UPPER($1) AND UPPER(P.TITULO_EVENTO) = UPPER($2) AND P.DATA_HORA_EVENTO = $3 AND P.PARTICIPANTE = $4",
		values: [criador_evento, titulo, data_hora_evento, email]
	}
	/* Buscar participante da lista de espera para confirmar no evento. */
	query[1] = {
		text: "SELECT P.PARTICIPANTE FROM PARTICIPA P WHERE UPPER(P.CRIADOR_EVENTO) = UPPER($1) AND UPPER(P.TITULO_EVENTO) = UPPER($2) AND P.DATA_HORA_EVENTO = $3 AND P.CONFIRMACAO = FALSE ORDER BY P.DATA_HORA_INGRESSO ASC LIMIT 1",
		values: [criador_evento, titulo, data_hora_evento]
	}
	/* Confirmar candidato da lista de espera */
	query[2] = {
		text: "UPDATE PARTICIPA P SET P.CONFIRMACAO = TRUE WHERE UPPER(P.CRIADOR_EVENTO) = UPPER($1) AND UPPER(P.TITULO_EVENTO) = UPPER($2) AND P.DATA_HORA_EVENTO = $3 AND P.PARTICIPANTE = $4"
		values: [criador_evento, titulo, data_hora_evento, email, data_hora_ingresso]
	}

	try{
		/* Inicia uma transação. */
		await pool.query('BEGIN')
		/* Realiza as operações necessárias */
		//await pool.query(query[0])
		p = await pool.query(query[1])
		console.log(p)
		let data_hora_ingresso = new Date()
		await pool

		/* Selecionar candidatos da lista de espera */
		
		q = await pool.query(query[2])
		console.log(q)
		/* Finaliza a transação. */	
		await pool.query('COMMIT')

		data_hora_evento = data_hora_evento.toString()
		return 1
	} catch(err) {		
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = createParticipa