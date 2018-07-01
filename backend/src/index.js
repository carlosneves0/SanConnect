const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const viewer = require('./middleware/viewer')
const { schema, root } = require('./graphql')
const pool = require('./database')

const app = express()

// We must enable cors so the website can have access to the API.
app.use(cors())

// Increase POST body's size limit to upload images.
app.use(bodyParser.json({ limit: '6mb' }))

app.use('/graph', viewer, graphqlHTTP(
  ({ viewer }, response, graphQLParams) => ({
    schema,
    rootValue: root,
    context: { pool, viewer },
    graphiql: true
  })
))

app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
