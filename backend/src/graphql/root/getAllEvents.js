/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function getAllEvents({ event }, { pool }) {
	let query = "SELECT EVENTO.*, STRING_AGG(CATEGORIA,  ', ') AS CATEGORIAS FROM EVENTO JOIN EVENTO_CATEGORIA ON CRIADOR_EVENTO = CRIADOR AND TITULO_EVENTO = TITULO AND EVENTO.DATA_HORA_EVENTO = EVENTO_CATEGORIA.DATA_HORA_EVENTO GROUP BY(CRIADOR, TITULO, EVENTO.DATA_HORA_EVENTO)"

	let events = []
	
	try {
		let res = await pool.query(query)		
		for(let i = 0; i < res.rowCount; i++) {			
			event = {}		
			event.criador = res.rows[i].criador			
			event.titulo = res.rows[i].titulo
			event.data_hora_evento = res.rows[i].data_hora_evento
			event.categorias = res.rows[i].categorias.split(", ")
			events.push(event)			
		}		

		return events
	} catch(err) {
		throw err
	}
}

module.exports = getAllEvents