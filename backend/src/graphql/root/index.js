const signIn = require('./signIn')

const root = {
  viewer: (args, { viewer }) => {
    return viewer
  },
  signIn
}

module.exports = root
