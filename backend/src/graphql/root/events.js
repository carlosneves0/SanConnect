/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function events(args, { viewer, pool }) {
  // if (viewer === null) {
  //   throw new Error('Usuário não autenticado')
  // }

  const query = `
    SELECT EVENT.*, STRING_AGG(CATEGORY,  ', ') AS CATEGORIES, EMAIL, NAME, _USER.DESCRIPTION AS CREATOR_DESCRIPTION, PICTURE, LIKES, DISLIKES
    FROM EVENT
    JOIN _USER
      ON CREATOR = EMAIL
    LEFT JOIN EVENT_CATEGORY
      ON EVENT.ID = EVENT_CATEGORY.EVENT
    GROUP BY (CREATOR, EMAIL, NAME, ID)
    ORDER BY EVENT.BEGINS_AT ASC
  `

  try {
    let result = await pool.query(query)
    return result.rows.map(async ({
      id,
      creator,
      title,
      begins_at,
      description,
      min_participants,
      max_participants,
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
        SELECT _USER.*, PARTICIPATES.*
        FROM PARTICIPATES
        JOIN _USER ON PARTICIPATES.PARTICIPANT = _USER.EMAIL
        WHERE PARTICIPATES.EVENT = $1
      `
      const values = [id]

      result = await pool.query({ text, values })

      return {
        id,
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
        minParticipants: min_participants,
        maxParticipants: max_participants,
        createdAt: created_at,
        location,
        categories: (categories && categories.split(', ')) || [],
        participants: result.rows.filter(p => p.confirmation === true),
        waitList: result.rows.filter(p => p.confirmation === false)
      }
    })
  } catch(err) {
    throw err
  }
}

module.exports = events
