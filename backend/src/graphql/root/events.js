/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function events(args, { viewer, pool }) {
  // if (viewer === null) {
  //   throw new Error('Usuário não autenticado')
  // }

  const query = `
    SELECT EVENTO.*, STRING_AGG(CATEGORIA,  ', ') AS CATEGORIAS, EMAIL, NOME, _USER.DESCRICAO AS USUARIO_DESCRICAO, FOTO, LIKES, DISLIKES
    FROM EVENTO
    JOIN _USER
      ON CRIADOR = EMAIL
    JOIN EVENTO_CATEGORIA
      ON CRIADOR_EVENTO = CRIADOR AND TITULO_EVENTO = TITULO AND EVENTO.DATA_HORA_EVENTO = EVENTO_CATEGORIA.DATA_HORA_EVENTO
    GROUP BY(CRIADOR, EMAIL, NOME, TITULO, EVENTO.DATA_HORA_EVENTO)
  `

  try {
    let result = await pool.query(query)
    return result.rows.map(async ({
      criador,
      titulo,
      data_hora_evento,
      descricao,
      min_participantes,
      max_participantes,
      data_hora_criacao,
      local,
      categorias,
      email,
      nome,
      usuario_descricao,
      foto,
      likes,
      dislikes
    }) => {
      // Fetch all participants of this event.
      const text = `
        select usuario.*
        from participa
        join usuario on participa.participante = usuario.email
        where participa.criador_evento = $1
          and participa.titulo_evento = $2
          and participa.data_hora_evento = $3
      `
      const values = [criador, titulo, data_hora_evento]

      result = await pool.query({ text, values })

      return {
        criador: {
          nome,
          email,
          descricao: usuario_descricao,
          foto,
          likes,
          dislikes
        },
        titulo,
        data_hora_evento,
        descricao,
        min_participantes,
        max_participantes,
        data_hora_criacao,
        local,
        categorias: categorias.split(', '),
        participantes: result.rows
      }
    })
  } catch(err) {
    throw err
  }
}

module.exports = events
