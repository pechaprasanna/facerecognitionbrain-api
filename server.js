const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
var knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

console.log(process.env);

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DB_SERVICE_HOST,
		port: process.env.DB_SERVICE_PORT,
		user : 'postgres_user',
    	password : 'postgres_password',
    	database : 'postgres'
	}
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is Working') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })



// Load hash from your password DB.
/*bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});

*/

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})

/*
/ --> res =  this is working
/signin --> POST request --> res = success/fail 
/register --> POST request --> res = user
/profile/:userId --> GET request --> res = user
/image --> PUT request --> user

*/