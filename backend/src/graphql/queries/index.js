const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname).forEach(filename => {
  if (/\.graphql$/.test(filename)) {
    const queryName = filename.split('.graphql')[0]
    module.exports[queryName] = fs.readFileSync(
      path.join(__dirname, filename),
      'utf8'
    )
  }
})
