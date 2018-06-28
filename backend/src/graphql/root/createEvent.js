/* Função que cria um evento. */
async function createEvent({ event }, { pool }) {
	let {criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, data_hora_criacao, local} = event
	console.log("Text")
	/*
		TODO
		Realizar verificações 
	*/
	if(min_participantes === null)
		min_participantes = 2

	data_hora_evento = new Date(data_hora_evento)
	data_hora_criacao = new Date()	
	
	/* Caso passe em todas as verificações, tenta gravar no banco. */
	query = {
		text: 'INSERT INTO EVENTO VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
		values: [criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, data_hora_criacao, local ]
	}

	try {
		await pool.query(query)

		event.data_hora_evento = data_hora_evento.toString()
		event.data_hora_criacao = data_hora_criacao.toString()

		return event
	} catch(err) {		
		throw err
	}
}

module.exports = createEvent