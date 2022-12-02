const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require("dotenv").config()

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// credentials for local host and Heroku
const db = knex({
  client: 'pg',
  connection: {
	    host : 'dpg-cdp67sen6mpuqrucfbsg-a',
	    port : 5432,
	    user : 'smartbrain_db_user',
	    password : process.env.DB_PASSWORD,
	    database : 'smart-brain',
			ssl: true
	  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	// res.send(dataBase.users);
	res.send(console.log('it is working!'));
	db.select('*').from('users')
		.then(data =>{
			res.json(users)
		})
})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt) });

app.post('/register',(req,res) => {
	register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id',(req,res) =>{profile.handleProfile(req,res,db) });

app.put('/image',(req,res)=>{image.handleImage(req,res,db) });
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () =>{
	console.log('app is running on port 3000');
})