const auth = require('./src/authentication')
const {pool, client} = require('./database')

/* Função que realiza o signUp do usuário. */
async function signUp(usuario) {
	let {email, password, nome, descricao, foto, likes, dislikes} = usuario

	/* TODO
	Realizar verificações de cada atributo passado no objeto.
	Retornar erro/exception para a interface caso não obtenha sucesso.*/

	password = await auth.hash(password)
	if (typeof password !== 'string') {
		throw new Error('Senha inválida.')
	}

	/* Caso passe em todas as verificações, tenta gravar no banco. */
	query = {
		text: 'INSERT INTO USUARIO VALUES($1, $2, $3, $4, $5, $6, $7)',
		values: [email, password, nome, descricao, foto, likes, dislikes ]
	}
	pool.query(query, (err, res) => {				
		/* Checar se tudo foi inserido com sucesso. */		
		if(err)
			console.log('Constraint: ', err.constraint,
						'\nError Detail: ',err.detail)		
	})
}

module.exports = signUp