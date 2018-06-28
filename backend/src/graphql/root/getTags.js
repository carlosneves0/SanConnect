/* Obtém todas as categorias cadastradas no banco. */

async function getTags(args, { pool }) {
	console.log()
	try {		
		tags = await pool.query('SELECT * FROM CATEGORIA')
		console.log(tags.rows)		
		return tags.rows
	} catch(err) {
		throw err
	}
}

module.exports = getTags