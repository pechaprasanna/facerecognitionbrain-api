const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
var knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql://db:5432/',
    user : 'postgres_username',
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
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
console.log(port, ip_address);
app.listen(port,ip_address, () => {
	console.log(process.env)
	console.log(`App is running on port ${port}`);
})

/*
/ --> res =  this is working
/signin --> POST request --> res = success/fail 
/register --> POST request --> res = user
/profile/:userId --> GET request --> res = user
/image --> PUT request --> user

*/