const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../jwt-secret')
const pool = require('../database')

// Express middleware to extract the viewer's email from jwt from HTTP header
// and put it in the request object.
async function viewer(request, response, next) {
  try {
    const token = request.get('Authorization').split('Bearer ')[1]

    const { email } = jwt.verify(token, JWT_SECRET)

    const query = {
      text: 'SELECT * FROM _USER WHERE EMAIL = $1',
      values: [email]
    }

    const { rowCount, rows } = await pool.query(query)

    if (rowCount !== 1) {
      throw new Error('Viewer not found')
    }

    request.viewer = rows[0]
  } catch (err) {
    request.viewer = null
  }

  next()
}

module.exports = viewer
