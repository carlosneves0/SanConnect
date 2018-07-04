const { Pool } = require('pg')

// ElephantSQL
// const config = {
//   user: 'tzpzrrtr',
//   host: 'stampy.db.elephantsql.com',
//   database: 'tzpzrrtr',
//   password: 'UbOKrlnAbJW3FqaiNlfve8jX6ZTCCOWn',
//   port: 5432,
// }

const config = {
  user: 'sanconnect',
  password: 'UbOKrlnAbJW3FqaiNlfve8jX6ZTCCOWn',
  database: 'sanconnect'
}

if (process.env.NODE_ENV === 'production') {
  config.host = 'postgres'
} else {
  config.host = 'localhost'
}

const pool = new Pool(config)
pool.connect()

module.exports = pool
