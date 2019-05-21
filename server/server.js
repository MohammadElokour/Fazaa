const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
// const bodyParser = express.json();
const {
  User
} = require('../database-mysql/models.js')
const port = process.env.PORT || 9876
const cors = require("cors");
const {
  SECRET_KEY
} = require('./secret.js');
const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.listen(port, () => {
  console.log(`Welcome to faza'a server port ==> ${port}`)
})


app.use(bodyParser.json())
app.use(cors())





////////API
app.put("/driver", (req, res) => {
  User.findOne({where:{username:username}})
    console.log(req.body)
  })




app.post('/signup', function (req, res) {
  var username = req.body.username;
  var pass = req.body.password;
  var email = req.body.email
  var hashedPassword = bcrypt.hashSync(pass, 3);
  User.create({
    username: username,
    email: email,
    password: hashedPassword,
    loc_Lat:null,
    loc_Lng:null,
    dest_Lat:null,
    dest_Lat:null,
    phoneNumber: null,
    carPlateNumber: null,
    carType:null,
    carColor:null,
    Role: null
  }).then(function () {
    return res.status(201).send("You have created an account Successfully");

  }).catch(function (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send('username is already taken');
    }
    return res.status(500).send(err);
  });
});