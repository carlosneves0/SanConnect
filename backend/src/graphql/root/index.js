const path = './src/graphql/root';
const fs = require('fs');

const root = {
  viewer: (args, { viewer }) => {
    if (viewer === null)
      throw new Error('Usuário não está autenticado')
    return viewer
  }
}

fs.readdirSync(path).forEach(file => {
  file = file.split('.')[0]
  if(file !== 'index')
    root[file] = require(`./${file}`)
})

module.exports = root
