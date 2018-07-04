/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function events(args, { viewer, pool }) {
  if (viewer === null) {
    throw new Error('Usuário não autenticado')
  }

  const query = `
    SELECT EVENT.*, STRING_AGG(CATEGORY,  ', ') AS CATEGORIES, EMAIL, NAME, _USER.DESCRIPTION AS CREATOR_DESCRIPTION, PICTURE, LIKES, DISLIKES
    FROM EVENT
    JOIN _USER
      ON CREATOR = EMAIL
    JOIN EVENT_CATEGORY
      ON CREATOR_EVENT = CREATOR AND TITLE_EVENT = TITLE AND EVENT.BEGINS_AT = EVENT_CATEGORY.BEGINS_AT
    GROUP BY (CREATOR, EMAIL, NAME, TITLE, EVENT.BEGINS_AT)
  `

  try {
    let result = await pool.query(query)
    return result.rows.map(async ({
      creator,
      title,
      begins_at,
      description,
      min_participantes,
      max_participantes,
      created_at,
      location,
      categories,
      email,
      name,
      creator_description,
      picture,
      likes,
      dislikes
    }) => {
      // Fetch all participants of this event.
      const text = `
        SELECT _USER.*
        FROM PARTICIPATES
        JOIN _USER ON PARTICIPATES.PARTICIPANT = _USER.EMAIL
        WHERE PARTICIPATES.CREATOR_EVENT = $1
          AND PARTICIPATES.TITLE_EVENT = $2
          AND PARTICIPATES.BEGINS_AT = $3
      `
      const values = [creator, title, begins_at]

      result = await pool.query({ text, values })

      return {
        creator: {
          name,
          email,
          description: creator_description,
          picture,
          likes,
          dislikes
        },
        title,
        beginsAt: begins_at,
        description,
        minParticipantes: min_participantes,
        maxParticipantes: max_participantes,
        createdAt: created_at,
        location,
        categories: categories.split(', '),
        participants: result.rows
      }
    })
  } catch(err) {
    throw err
  }
}

module.exports = events
