const fetch = require('node-fetch')
const pool = 

users

refUser

const body {
	usuarios: users,
	usuario_referencia: refUser
}

const result = await fetch(
	'localhost:5000/agrupamento',
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}
)

console.log(await result.json())