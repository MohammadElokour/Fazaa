const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = express.json();
const {User} = require('../database-mysql/models.js')
const port  = process.env.PORT || 5000
// const cors = require("cors");
const app = express();

 app.use(express.static(__dirname + '/../react-client/dist'));


app.listen(port , ()=>{
    console.log(`Welcome to faza'a server port ==> ${port}`)
})


app.use(bodyParser);

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var pass = req.body.password;
  var email = req.body.email
  var hashedPassword = bcrypt.hashSync(pass, 3);
  User.create({
    username: username,
    email:email,
    password: hashedPassword,
    location:'',
    destination:'',
    phoneNumber:'',
    carPlateNumber:'',
    Role:''
    }).then(function(){
      return res.status(201).send('Sign up successful');
  }).catch(function(err){
      if(err.name === "SequelizeUniqueConstraintError"){
          return res.status(400).send('username is already taken');
      }
      return res.status(500).send(err);
  });
});