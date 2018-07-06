/* Função que cria um evento. */
async function createEvent({ event }, { pool, viewer }) {
	let {
		title,
		beginsAt,
		description,
		minParticipants,
		maxParticipants,
		location,
		categories
	} = event

	/* Exige que um usuário esteja autenticado para criar um evento. */
	if (viewer === null) {
		throw new Error('Usuário não autenticado.')
	}

	const creator = viewer.email

	/* Define o valor default para um número mínimo de participantes. */
	if (minParticipants === null)
		minParticipants = 2

	beginsAt = new Date(beginsAt)
	const createdAt = new Date()

	/* Obtém a ID do evento criado. */
	let eventId

	/* Caso passe em todas as verificações, tenta gravar no banco. */
	let query = []
	query[0] = {
		text: 'INSERT INTO EVENT VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING ID',
		values: [creator, title, beginsAt, description, minParticipants, maxParticipants, createdAt, location]
	}

	/* Também insere o criador do evento como participante. */
	query[1] = {
		text: 'INSERT INTO PARTICIPATES VALUES($4, $1, $2, $3)',
		values: [creator, true, createdAt]
	}

	/* Insere as categorias na tabela correspondente. */
	for (i = 0; i < categories.length; i++) {
		query[i+2] = {
			text: 'INSERT INTO EVENT_CATEGORY VALUES ($1, $2)',
			values: [categories[i]]
		}
	}

	try {
		/* Inicia uma transação. */
		await pool.query('BEGIN')

		/* Insere as informações no banco e obtém o ID do Evento. */
		eventId = (await pool.query(query[0])).rows[0].id
		query[1].values.push(eventId)
		await pool.query(query[1])
		query[2].values.push(eventId)
		await pool.query(query[2])

		/* Finaliza a transação. */
		await pool.query('COMMIT')

		// event.id = eventId
		//
		// event.creator = viewer
		//
		// event.beginsAt = beginsAt.toString()
		// event.createdAt = createdAt.toString()
		//
		// event.participants = [viewer]

		return eventId
	} catch(err) {
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = createEvent
