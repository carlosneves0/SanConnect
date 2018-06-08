const express = require('express')
const { Client } = require('pg')

const app = express()

const client = new Client({
  user: 'postgres',
  host: 'postgres',
  // TODO: directly trying to connect to the database throws FALTA ERROR
  // "db SanConnect does not exist" when deploying to producton. Figure out a
  // way around this.
  // database: 'SanConnect',
  port: 5432
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log('Callback from Postgres')
  console.log(err, res)
  client.end()
})

app.use('/', (req, res) => {
  res.send('Hello world')
})

app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
