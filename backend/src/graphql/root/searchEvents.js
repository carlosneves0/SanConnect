/* Função que realiza uma busca filtrada de eventos. */
async function serachEvents({ event }, { pool, viewer }) {
	let params = []
	let params2 = []
	let values = []	
	let index = 1

	for(let key in event) {
		if(event[key] !== null && key !== 'categorias')  {
			if(index !== 1)	
				params.push(' AND ')
			else	
				params.push(' WHERE ')
			if(typeof event[key] === 'string' && !key.includes('data')) {
	  			params.push(key + ' ilike $' + index++)
	  			values.push('%' + event[key] + '%')
	  		} else {
	  			params.push('EVENTO.' + key + ' = $' + index++)
	  			values.push(event[key])
	  		}
	  	}
	}

	let counter = 0
	if(event.categorias !== null) {
		for(let key in event.categorias) {
			if(counter > 0)
				params2.push(' AND ')
			else
				params2.push(' HAVING ')									
			params2.push("STRING_AGG(CATEGORIA,  ', ') ilike $" + (index + counter++))
			values.push('%' + event.categorias[key] + '%')
		}
	}

	let query = "SELECT EVENTO.*, STRING_AGG(CATEGORIA,  ', ') AS CATEGORIAS FROM EVENTO JOIN EVENTO_CATEGORIA ON CRIADOR_EVENTO = CRIADOR AND TITULO_EVENTO = TITULO AND EVENTO.DATA_HORA_EVENTO = EVENTO_CATEGORIA.DATA_HORA_EVENTO" + params.join('') + " GROUP BY(CRIADOR, TITULO, EVENTO.DATA_HORA_EVENTO)" + params2.join('')

	let events = []	
	try {
		let res = await pool.query(query, values)		
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

module.exports = serachEvents