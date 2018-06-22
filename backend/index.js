const express = require('express')
const { Client } = require('pg')
const bcrypt = require('bcrypt')
const auth = require('./src/authentication')

const app = express()

const client = new Client({
	user:'postgres',
	host:'postgres',
	// TODO: directly trying to connect to the database throws FALTA ERROR
	// "db SanConnect does not exist" when deploying to producton. Figure out a
	// way around this.
	// database: 'SanConnect',
	port: 5432
})
//client.connect()

client.query('SELECT NOW()', (err, res) => {
	console.log('Callback from Postgres')
	console.log(err, res)
	client.end()
})

/* Hash the user password from signup. */
app.post('/signup', function(req, res) {	
	var username = req.body.username

	bcrypt.hash(req.body.password, 10, function(err, hash) {

		var user = new User({username:username, password:hash})

		user.save().then(function (newUser) {			
			console.log('Successfully added ' + username + ' to the database.')
			req.session.regenerate(function() {
				res.redirect('/index')
				res.session.user = user
			})
		})
	})
})

/* Compares the user password stored in database. */
app.post('/login', function(req, res) {
	var username = req.body.username
	var enteredPassword = req.body.password

	new User({username:username}).fetch().then(function(found) {
		if(found) {
			console.log('User\'s username was found in the database!')

			bcrypt.compare(enteredPassword, found.get('password'), function(err, res) {
				if(res) {
					req.session.regenerate(function() {
						console.log('Passwords match. Redirecting...')      
						res.redirect('/index')
						req.session.found = found.username
					})
				} else {
					console.log('Passwords don\'t match... redirect to signup')    
					res.redirect('/signup') 
				} 
		})
		} else {
			console.log('Username don\'t match... redirect to signup')
			res.redirect('/signup') 
		}
	})
})

/* Only logged users can access. */
app.get('/create', function(req, res) {
	if(req.session) {
	  res.render('index')
	} else {
	  res.render('login')
	}
})

app.use('/', (req, res) => {
	res.send('Hello world')
})

app.listen(4000, () => {
	console.log('Server is listening on port 4000')
})
