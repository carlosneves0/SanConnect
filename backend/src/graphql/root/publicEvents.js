/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function publicEvents(args, { pool }) {
  const query = `
    SELECT EVENT.*, NAME, STRING_AGG(CATEGORY,  ', ') AS CATEGORIES
    FROM EVENT
    JOIN _USER
      ON CREATOR = EMAIL
    JOIN EVENT_CATEGORY
      ON CREATOR_EVENT = CREATOR AND TITLE_EVENT = TITLE AND EVENT.BEGINS_AT = EVENT_CATEGORY.BEGINS_AT
    GROUP BY (CREATOR, NAME, TITLE, EVENT.BEGINS_AT)
  `

  try {
    const result = await pool.query(query)

    return result.rows.map(
      ({
        name,
        title,
        begins_at,
        categories
      }) => ({
        creator: name,
        title,
        beginsAt: begins_at,
        categories: categories.split(', ')
      })
    )
  } catch(err) {
    throw err
  }
}

module.exports = publicEvents
