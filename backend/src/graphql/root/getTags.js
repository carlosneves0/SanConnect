/* Obtém todas as categorias cadastradas no banco. */

async function getTags(args, { pool }) {
	try {		
		tags = await pool.query('SELECT * FROM CATEGORIA')		
		return tags.rows.map(({ nome }) => nome)
	} catch(err) {
		throw err
	}
}

module.exports = getTags