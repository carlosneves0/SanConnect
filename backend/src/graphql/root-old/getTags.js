/* Obtém todas as categorias cadastradas no banco. */
async function getTags(args, { pool, viewer }) {
	try {
		let tags = await pool.query('SELECT * FROM CATEGORIA')
		return tags.rows.map(({ nome }) => nome)
	} catch(err) {
		throw err
	}
}

module.exports = getTags
