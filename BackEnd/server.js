const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
    client: 'pg',
    connection: {
      // host:'localhost',
      // user:'postgres',
      // password:'password',
      // database:'test',
      connectionString: process.env.DATABASE_URL,
      ssl:true,
    }
  });



const app = express();

app.use(cors())
app.use(express.json()); // => app.use(bodypaser.json)


app.get('/',(req,res)=>{res.json('it\'s working')})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

app.post('/signin', signin.handleSignin(db,bcrypt));

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});  // No one can look our API In website!!



app.listen(process.env.PORT||4000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})


/*
    / --> res = this is working
    /signin --> POST = succes/fail
    /register --> post = new user
    /profile/:userID --> GET = user's ID
    /image --> PUT --> update User's score
*/
