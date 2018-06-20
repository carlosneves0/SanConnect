const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { schema, root } = require('./graphql')

const app = express()

// const { Client } = require('pg')
// const client = new Client({
//   user: 'postgres',
//   host: 'postgres',
//   // TODO: directly trying to connect to the database throws FALTA ERROR
//   // "db SanConnect does not exist" when deploying to producton. Figure out a
//   // way around this.
//   // database: 'SanConnect',
//   port: 5432
// })
//
// client.connect()
//
// client.query('SELECT NOW()', (err, res) => {
//   console.log('Callback from Postgres')
//   console.log(err, res)
//   client.end()
// })

mockDb = {
  users: {
    'foo@bar.baz': {
      email: 'foo@bar.baz',
      password: '123456'
    }
  }
}

app.use(cors()) // not having cors enabled will cause an access control error

app.use('/graph', graphqlHTTP(async (request, response, graphQLParams) => {
  // The HTTP header will have an accessToken in Authorization: Bearer <token>
  //  Parse the token, verify that it's valid with jsonwebtoken
  // Add viewer to GraphQL's context
  // Viewer is the user we get from
  // If no Authorization header is prensent, viewer = null
  viewer = {
    email: 'foo@bar.baz',
    // ...
  }

  return {
    schema,
    rootValue: root,
    context: { mockDb, viewer },
    graphiql: true
  }
}));

app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
