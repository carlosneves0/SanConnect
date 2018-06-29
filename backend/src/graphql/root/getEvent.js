/* Função que retorna um único evento cadastrado no banco. */
async function getEvent({ event }, { pool, viewer }) {
	query = {
		text: "SELECT EVENTO.*, STRING_AGG(CATEGORIA,  ', ') AS CATEGORIAS FROM EVENTO JOIN EVENTO_CATEGORIA ON CRIADOR_EVENTO = CRIADOR AND TITULO_EVENTO = TITULO AND EVENTO.DATA_HORA_EVENTO = EVENTO_CATEGORIA.DATA_HORA_EVENTO WHERE CRIADOR = $1 AND TITULO = $2 AND EVENTO.DATA_HORA_EVENTO = $3 GROUP BY(CRIADOR, TITULO, EVENTO.DATA_HORA_EVENTO)",
		values: [event.criador, event.titulo, event.data_hora_evento]
	}

	try {
		res = await pool.query(query)

		if((i = res.rowCount-1) === 0) {
			event = {}		
			event.criador = res.rows[i].criador			
			event.titulo = res.rows[i].titulo
			event.data_hora_evento = res.rows[i].data_hora_evento
			event.descricao = res.rows[i].descricao
			event.data_hora_criacao = res.rows[i].data_hora_criacao
			event.categorias = res.rows[i].categorias.split(", ")			
			
			/* Caso o usuário não esteja autenticado não exibe estas informações.*/	
			if(viewer !== null) {
				event.min_participantes = res.rows[i].min_participantes
				event.max_participantes = res.rows[i].max_participantes
				event.local = res.rows[i].local
			}
		}
		return event	
	} catch(err) {
		throw err
	}

}

module.exports = getEvent