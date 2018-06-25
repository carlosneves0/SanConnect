const { buildSchema } = require('graphql')
const root = require('./root')

const schema = buildSchema(
  require('fs').readFileSync(
    require('path').join(__dirname, 'schema.graphql'),
    'utf8'
  )
)

module.exports = { schema, root }
