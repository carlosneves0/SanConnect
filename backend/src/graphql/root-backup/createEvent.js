/* Função que cria um evento. */
async function createEvent({ event }, { pool, viewer }) {
	let {criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, data_hora_criacao, local, categorias} = event
		
	/* Exige que um usuário esteja autenticado para criar um evento. */
	if(viewer.email !== criador) {		
		throw new Error('Usuário não autenticado.') 
	}

	/* Define o valor default para um número mínimo de participantes. */
	if(min_participantes === null)
		min_participantes = 2

	data_hora_evento = new Date(data_hora_evento)
	data_hora_criacao = new Date()	
	
	/* Caso passe em todas as verificações, tenta gravar no banco. */
	let query = []
	query[0] = {
		text: 'INSERT INTO EVENTO VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
		values: [criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, data_hora_criacao, local]
	}

	/* Também insere o criador do evento como participante. */
	query[1] = {
		text: 'INSERT INTO PARTICIPA VALUES($1, $2, $3, $4, $5, $6)',
		values: [criador, titulo, data_hora_evento, criador, true, data_hora_criacao]
	}

	/* Insere as categorias na tabela correspondente. */
	for(i = 0; i < categorias.length; i++) {
		query[i+2] = {
			text: 'INSERT INTO EVENTO_CATEGORIA VALUES ($1, $2, $3, $4)',
			values: [categorias[i], criador, titulo, data_hora_evento]
		}
	}

	try {		
		/* Inicia uma transação. */
		await pool.query('BEGIN')

		/* Insere as informações no banco. */
		for(let q of query)
			await pool.query(q)	

		/* Finaliza a transação. */	
		await pool.query('COMMIT')
		
		event.data_hora_evento = data_hora_evento.toString()
		event.data_hora_criacao = data_hora_criacao.toString()
		
		return event
	} catch(err) {		
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = createEvent