const bcrypt = require('bcrypt')

/* Testing the hash. */
bcrypt.hash('myPassword', 10, function(err, hash) {
	// Store hash in database
	console.log('Hash stored in database')  
	console.log(hash)

	bcrypt.compare('myPassword', hash, function(err, res) {
		if(res) {
			console.log('Passwords match')      
		} else {
			console.log('Passwords don\'t match')     
		} 
  	})
})

module.exports = bcrypt
