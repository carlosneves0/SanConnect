const { Pool } = require('pg')

const pool = new Pool({
  user: 'tzpzrrtr',
  host: 'stampy.db.elephantsql.com',
  database: 'tzpzrrtr',
  password: 'UbOKrlnAbJW3FqaiNlfve8jX6ZTCCOWn',
  port: 5432,
})
pool.connect()

//const connectionString = 'postgres://tzpzrrtr:UbOKrlnAbJW3FqaiNlfve8jX6ZTCCOWn@stampy.db.elephantsql.com:5432/tzpzrrtr'
//const client = new Client({
  //user:'dev',
  //host:'postgres',
  // TODO: directly trying to connect to the database throws FALTA ERROR
  // "db SanConnect does not exist" when deploying to producton. Figure out a
  // way around this.
  // database: 'SanConnect',
  //port: 5432
  //connectionString: connectionString,
//})
//client.connect()

module.exports = pool