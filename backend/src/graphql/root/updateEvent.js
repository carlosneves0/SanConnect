/* Função que atualiza informações de um evento.*/
/* Não atualiza a chave primária de um evento.*/
async function updateEvent({ event }, { pool, viewer }) {
	let {criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, data_hora_criacao, local, categorias} = event
		
	/* Exige que um usuário esteja autenticado para criar um evento. */
	if(viewer.email !== criador) {
		throw new Error('Usuário não autenticado.') 
	}
	/* Define o valor default para um número mínimo de participantes. */
	if(min_participantes === null)
		min_participantes = 2

	try{
		data_hora_evento = new Date(data_hora_evento)
		//data_hora_criacao = new Date(data_hora_criacao)
	} catch(err){
		throw err
	}
	
	/* TODO
		É necessário verificar se os números máximo e mínimo de participantes condizem com
			o número atual de participantes do evento em questão.
		Se não condiz, notificar o criador antes de efetuar operação.
			Ao efetuar a operação, notificar e remover todos os participantes atuais do evento.
	*/

	/* --
		Quanto às categorias, é necessário verificar quais mudaram ou não.
		Para isso, temos que fazer uma query sobre o evento em questão, e fazer uma comparação de conjuntos entre
			as categorias atuais e as novas.
		Seria mais simples remover e reinserir as categorias do evento em questão. (Farei desta maneira, por enquanto.)
	*/

	/* Caso passe em todas as verificações, tenta gravar no banco. */
	let query = []
	/* Atualiza valores da tabela evento. */
	query[0] = {
		text: 'UPDATE EVENTO SET descrição = $4, min_participantes = $5, max_participantes = $6, local = $7 WHERE UPPER(CRIADOR) = $1 AND UPPER(TITULO) = $2 AND DATA_HORA_EVENTO = $3',
		values: [criador, titulo, data_hora_evento, descricao, min_participantes, max_participantes, local]
	}

	/* Deleta as categorias atuais do evento. */
	query[1] = {
		text: 'DELETE FROM EVENTO_CATEGORIA WHERE UPPER(CRIADOR_EVENTO) = $1 AND UPPER(TITULO_EVENTO) = $2 AND DATA_HORA_EVENTO = $3',
		values: [criador, titulo, data_hora_evento]
	}

	/* Insere as categorias novamente na tabela correspondente. */
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
		//event.data_hora_criacao = data_hora_criacao.toString()
		
		return event
	} catch(err) {		
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = updateEvent