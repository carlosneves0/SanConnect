const fetch = require('node-fetch')

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
    LEFT JOIN EVENT_CATEGORY
      ON EVENT.ID = EVENT_CATEGORY.EVENT
    GROUP BY (CREATOR, EMAIL, NAME, ID)
    ORDER BY EVENT.BEGINS_AT ASC
  `

  /*
    TODO:
      - QUERY PARA BUSCAR AS PREFERÊNCIAS DO VIEWER.
      - CRIAR JSON PARA TODOS OS EVENTOS.
      - CRIAR JSON PARA TODAS AS PREFERÊNCIAS.
      - CHAMAR A APLICAÇÃO PYTHON.
      - RECUPERAR TODOS OS EVENTOS FILTRADOS.
      - E RETORNAR VIA GRAPHQL.
      - NO FRONTEND REMOVER EVENTOS EM QUE O USUÁRIO JÁ ESTEJA PARTICIPANDO.
  */

  try {
    let result = await pool.query(query)
    let toPython = result.rows.map(async ({
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

    queryP = {
      text: "SELECT _USER, STRING_AGG(CATEGORY,  ', ') AS CATEGORIES, STRING_AGG(to_char(ESCALA, '0D0'),  ', ') AS SCALES FROM PREFERENCE WHERE _USER = $1 GROUP BY(_USER)",      
      values: [viewer.email]
    }
    preferences = await pool.query(queryP); 

    email = preferences.rows[0]._user
    categories = preferences.rows[0].categories.split(', ')    
    scales = preferences.rows[0].scales.split(', ').map(Number)

    pref = {}
    for(let key in categories) {      
      pref[categories[key]] = scales[key]
    }

    let users = []
    users.push({
      email: email,
      preference: pref
    })
       
    let events = []
    publicEvents = await Promise.all(toPython)
    for(event of publicEvents) {
      events.push({
        id: event.id,
        category: event.categories
      })
    }    

    body = {usuarios: users, eventos: events}        

    return toPython
    
    /* USAR O NODE FETCH */
    response = await fetch('localhost:5000', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body, null, 2)
    })

    let fromPython = await response.json()
  } catch(err) {
    throw err
  }
}

module.exports = events
