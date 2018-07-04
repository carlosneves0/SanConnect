/* Função que realiza uma busca por todos os eventos cadastrados no banco junto de suas categorias. */
async function publicEvents(args, { pool }) {
  const query = `
    SELECT EVENTO.*, NOME, STRING_AGG(CATEGORIA,  ', ') AS CATEGORIAS
    FROM EVENTO
    JOIN USUARIO
      ON CRIADOR = EMAIL
    JOIN EVENTO_CATEGORIA
      ON CRIADOR_EVENTO = CRIADOR AND TITULO_EVENTO = TITULO AND EVENTO.DATA_HORA_EVENTO = EVENTO_CATEGORIA.DATA_HORA_EVENTO
    GROUP BY(CRIADOR, NOME, TITULO, EVENTO.DATA_HORA_EVENTO)
  `

  try {
    const result = await pool.query(query)

    return result.rows.map(
      ({
        nome,
        titulo,
        data_hora_evento,
        categorias
      }) => ({
        criador: nome,
        titulo,
        data_hora_evento,
        categorias: categorias.split(', ')
      })
    )
  } catch(err) {
    throw err
  }
}

module.exports = publicEvents
