/* Obtém todas as categorias cadastradas no banco. */
async function categories(args, { pool }) {
	try {
		const categories = await pool.query('SELECT * FROM CATEGORY')
		return categories.rows.map(({ name }) => name)
	} catch(err) {
		throw err
	}
}

module.exports = categories
