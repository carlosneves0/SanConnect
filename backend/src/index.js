const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { schema, root } = require('./graphql')
const pool = require('./database')

const app = express()

app.use(cors()) // not having cors enabled will cause an access control error

app.use('/graph', graphqlHTTP((request, response, graphQLParams) => {
  // The HTTP header will have an accessToken in Authorization: Bearer <token>
  // Parse the token, verify that it's valid with jsonwebtoken
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
    context: { pool, viewer },
    graphiql: true
  }
}));

app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
