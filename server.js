const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

const database ={
	users: [
		{
			id: '123',
			name: 'Prasanna',
			email: 'prasanna@gmail.com',
			password: 'prasanna',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Pavithra',
			email: 'pavithra@gmail.com',
			password: 'pavithra',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users)
})

app.post('/signin', (req, res) => {
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('error in logging in')
	}
})

app.post('/register', (req,res)=> {
	const {email, name, password} = req.body;

	database.users.push(
		{
			id: '125',
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
		})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) =>{
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id ){
			found = true
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json('User not found');
	}
})

app.put('/image',(req,res)=> {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id ){
			found = true
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(404).json('User not found');
	}
})



// Load hash from your password DB.
/*bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});

*/

app.listen(3000, () => {
	console.log('App is running on port 3000');
})

/*
/ --> res =  this is working
/signin --> POST request --> res = success/fail 
/register --> POST request --> res = user
/profile/:userId --> GET request --> res = user
/image --> PUT request --> user

*/