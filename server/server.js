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

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

//middleware
const authenticate = function (req, res, next) {
  const token = req.headers['token']; //Username encoded in token
  if (!token) {
    return res.status(401).send('Please sign in');
  }
  jwt.verify(token, SECRET_KEY, function (err, decodedToken) {
    //If err, token invalid
    if (err) {
      return res.status(401).send('Please sign in');
    }
    //Check if user exists in the database
    const username = decodedToken.username;
    User.findOne({
      where: {
        username: username
      }
    }).then(function (user) {



      if (!user) {
        return res.status(401).send('Please sign up');
      }
      req.body.user = user; //Put user in req.body
      return next();
    }).catch(function (err) {
      return res.status(500).send(err);
    })
  });
};
////////API
app.put("/driver", authenticate, (req, res) => {
  var username = req.body.user.username
  var phoneNumber = req.body.data.phoneNumber
  var carPlateNumber = req.body.data.carPlateNumber
  var carType = req.body.data.carType
  var carColor = req.body.data.carColor 
  var Role = req.body.data.Role 

  console.log(username ,phoneNumber ,carPlateNumber ,carType ,carColor ,Role )
  User.update({phoneNumber:phoneNumber,
    carPlateNumber:carPlateNumber,
     carType:carType,
      carColor : carColor,
    Role:Role},
    {where:{username:username}}).then(() => {
      console.log("diver info updated")
    })
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
    loc_Lat: null,
    loc_Lng: null,
    dest_Lat: null,
    dest_Lat: null,
    phoneNumber: null,
    carPlateNumber: null,
    carType: null,
    carColor: null,
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

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //Check if user exists in the database
  console.log(req.body, "  h1")


  User.findOne({
    where: {
      username: username

    }
  }).then(function (user) {
    //Compare with stored password
    const existingHashedPassword = user.password;
    bcrypt.compare(password, existingHashedPassword).then(function (isMatching) {
      console.log(isMatching)
      if (isMatching) {
        //Create a token and send to client
        const token = jwt.sign({
          username: user.username
        }, SECRET_KEY, {
          expiresIn: 6666
        });
        return res.send({
          token
        })
      } else {
        console.log("go to your home, yasser")
        return res.status(401).send({
          error: 'Wrong password'
        });
      }
    });
  }).catch(function (err) {
    console.log("go sigup ya FoOlL!")
  })

});


app.post('/places', authenticate, function (req, res) {
  res.send("yaay")
});
app.get('/places', authenticate, function (req, res) {
  res.send("yaaaaaaaaaaaaaay")
});