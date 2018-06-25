function signIn({ email, password }, { mockDb }) {
  const user = mockDb.users[email]

  if (!user) {
    throw new Error('Invalid email')
  }

  if (password !== user.password) {
    throw new Error('Invalid password')
  }

  return {
    accessToken: `a-jwt-with-the-user-email|${email}`
  }
  // We can also return a Promise.
  // return new Promise((resolve, reject) => {
  //    // postgres from context
  //    postgres.query('select * from ...', (res, err) => {
  //      if (err) reject(err)
  //      resolve(res[0])
  //   })
  // })
}

module.exports = signIn
