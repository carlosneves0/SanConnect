/* Função que insere um usuário como participante de um evento*/
async function createParticipa({ participa }, { pool, viewer }) {
	let {criador_evento, titulo, data_hora_evento, email} = participa
	/* Exige que um usuário esteja autenticado para ingressar em um evento. */
	if(viewer.email !== email) {	
		throw new Error('Usuário não autenticado.') 
	}
	data_hora_evento = new Date(data_hora_evento)
	let data_hora_ingresso = new Date()


	/* Verificar se o número atual de usuarios deste evento é >= ao max_participantes*/
	/* POG - Programação Orientada à Gambiarra*/
	let query = {
		text: "SELECT COUNT(*), MAX(E.MAX_PARTICIPANTES) FROM PARTICIPA P JOIN EVENTO E ON UPPER(E.CRIADOR) = UPPER(P.CRIADOR_EVENTO) AND UPPER(E.TITULO) = UPPER(P.TITULO_EVENTO) AND E.DATA_HORA_EVENTO = P.DATA_HORA_EVENTO WHERE UPPER(E.CRIADOR) = UPPER($1) AND UPPER(E.TITULO) = UPPER($2) AND E.DATA_HORA_EVENTO = $3",
		values: [criador_evento, titulo, data_hora_evento]
	}

	let ret = false /* Valor de retorno. Mais informações abaixo. */
	try{
		let q = await pool.query(query)

		/* Checagem para inserção*/
		if(q.rows[0].count >= q.rows[0].max){
				/* Ingresso na lista de espera. */
				query = {
				text: "INSERT INTO PARTICIPA VALUES($1, $2, $3, $4, FALSE, $5)",
				values: [criador_evento, titulo, data_hora_evento, email, data_hora_ingresso]
				}
		} else{
				/* Ingresso com confirmação */
				ret = true
				query = {
				text: "INSERT INTO PARTICIPA VALUES($1, $2, $3, $4, TRUE, $5)",
				values: [criador_evento, titulo, data_hora_evento, email, data_hora_ingresso]
				}
		}
		/* Inicia uma transação. */
		await pool.query('BEGIN')
		/* Insere as informações no banco. */
		await pool.query(query)
		/* Finaliza a transação. */	
		await pool.query('COMMIT')

		data_hora_evento = data_hora_evento.toString()
		return ret /* Se verdadeiro, o usuario é confirmado no evento. C.C., o usuário está na lista de espera. */
	} catch(err) {		
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = createParticipa