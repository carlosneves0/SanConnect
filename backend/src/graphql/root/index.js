const signIn = require('./signIn')
const signUp = require('./signUp')

const root = {
  viewer: (args, { viewer }) => {
    return viewer
  },
  signIn,
  signUp
}

module.exports = root
