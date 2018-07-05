/* Função que insere um usuário como participante de um evento*/
async function createParticipates({ event }, { pool, viewer }) {	
	/* Exige que um usuário esteja autenticado para ingressar em um evento. */
	if(viewer === null) {	
		throw new Error('Usuário não autenticado.') 
	}

	/* Verificar se o número atual de usuarios deste evento é >= ao max_participantes*/
	/* POG - Programação Orientada à Gambiarra*/
	let query = {		
		text: "SELECT COUNT(*), MAX(E.MAX_PARTICIPANTS) FROM PARTICIPATES P JOIN EVENT E ON P.EVENT = E.ID WHERE E.ID = $1",
		values: [event]
	}

	let ret = false /* Valor de retorno. Mais informações abaixo. */
	try{
		let q = await pool.query(query)

		/* Checagem para inserção*/
		if(q.rows[0].count >= q.rows[0].max) {
				/* Ingresso na lista de espera. */
				query = {
					text: "INSERT INTO PARTICIPATES VALUES($1, $2, FALSE, NOW())",
					values: [event, viewer.email]
				}
		} else {
				/* Ingresso com confirmação */
				ret = true
				query = {
					text: "INSERT INTO PARTICIPATES VALUES($1, $2, TRUE, NOW())",
					values: [event, viewer.email]
				}
		}
		/* Inicia uma transação. */
		await pool.query('BEGIN')
		/* Insere as informações no banco. */
		await pool.query(query)
		/* Finaliza a transação. */	
		await pool.query('COMMIT')
		
		return ret /* Se verdadeiro, o usuario é confirmado no evento. C.C., o usuário está na lista de espera. */
	} catch(err) {		
		await pool.query('ROLLBACK')
		throw err
	}
}

module.exports = createParticipates