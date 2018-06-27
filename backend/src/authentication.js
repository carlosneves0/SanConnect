const bcrypt = require('bcrypt')

/* Testing the hash. */
function hash(password) {0
	return new Promise(async (resolve, reject) => {
		const hash = await bcrypt.hash(password, 10).catch(resolve)
		resolve(hash)
	})
}

bcrypt.hash('123456', 10, function(err, hash) {
	// Store hash in database
	console.log('Hash stored in database')  
	console.log(hash)

	pass = hash

	bcrypt.compare('123456', hash, function(err, res) {
		if(res) {
			console.log('Passwords match')      
		} else {
			console.log('Passwords don\'t match')     
		} 
  	})
})

module.exports = {
	hash
}
