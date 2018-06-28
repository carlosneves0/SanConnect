const express = require('express')
const pool = require('./src/database')
const auth = require('./src/authentication')

const app = express()
var query

pool.query('SELECT * FROM CATEGORIA', console.log)

// const signUp = require('./signUp')

// usuario = {
// 	email: 'vitor@sanconnect.usp',
// 	password: '123456',
// 	nome: 'Vitor',
// 	descricao: 'NULL',
// 	foto: 'NULL',
// 	likes: 0,
// 	dislikes: 0
// }

/* Autentica um determinado usuário. */
// auth.authenticate('bruno@sanconnect.br', '123456').then(result => {
// 	if(result === true)
// 		console.log('Autenticado.')	
// 	else
// 		console.log('Usuário ou senha inválido.')
// })

/* Send a query to database. */
// query = 'select * from usuario;'
// pool.query(query, async function (err, res) {
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log(res.rows)

// 	/* Insere um novo usuário no banco. */
// 	await signUp(usuario)	

// 	var email = 'vitor@sanconnect.usp'

// 	/* Send a query to database. */
// 	query = 'select * from usuario;'
// 	pool.query(query, function (err, res) {
// 		if(err)
// 			console.log(err)
// 		else
// 			console.log(res.rows)		

// 		query = {
// 			text: 'DELETE FROM usuario WHERE email = $1',
// 			values: [email]
// 		}
// 		pool.query(query, function(err, res) {
// 			if(err)
// 				console.log(err)
// 			else 	
// 				console.log('Finish')
// 			pool.end()
// 		})
// 	})	
// })

/* Hash the user password from signup. */
app.post('/signup', function(req, res) {
	var username = req.body.username

	auth.hash(req.body.password, 10, function(err, hash) {

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

			auth.compare(enteredPassword, found.get('password'), function(err, res) {
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

/* Testing middleware. */
app.all('/secret', function (req, res, next) {
	console.log('Accessing the secret section ...');
	next(); // pass control to the next handler
});

/* */
app.use('/', (req, res, next) => {
	res.send('Hello world')
	next()
}, (req, res, next) => {
	console.log('Next')
	next()
}, (req, res) => {
	console.log('Finish')
})

app.get('/about', function (req, res) {
  res.send('about');
})

app.listen(4000, () => {
	console.log('Server is listening on port 4000')
})