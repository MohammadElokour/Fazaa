const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
// const bodyParser = express.json();
const {
  User,Trip
} = require('../database-mysql/models.js')
const port = process.env.PORT || 9876
const cors = require("cors");
const {
  SECRET_KEY
} = require('./secret.js');
const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(port, () => {
	console.log(`Welcome to faza'a server port ==> ${port}`);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//middleware
let authenticate = function (req, res, next) {
  const token = req.headers['token']; //Username encoded in token
  console.log(req.headers);
  console.log(token);
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
      res.locals.user = user;
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
  var destination = req.body.data.destination 


  console.log(username ,phoneNumber ,carPlateNumber ,carType ,carColor ,Role )
  User.update({phoneNumber:phoneNumber,
    carPlateNumber:carPlateNumber,
     carType:carType,
      carColor : carColor,
    Role:Role,
    destination:destination},
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
    email:email,
    password: hashedPassword,
    numberOfPassengers:0
    }).then(function(){
      return res.status(201).send("You have created an account Successfully");

  }).catch(function(err){
      if(err.name === "SequelizeUniqueConstraintError"){
          return res.status(400).send('username is already taken');
      }
      return res.status(500).send(err);
  });
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //Check if user exists in the database
  console.log(username);
  User.findOne({where: {username: username}}).then(function (user) {
      if(!user){
          return res.status(404).send({error: 'Please sign up'}); 
      }
      //Compare with stored password
      console.log('found!');
      const existingHashedPassword = user.password;
      console.log(req.body.username);
      console.log(existingHashedPassword);
      console.log(password);

      bcrypt.compare(password, existingHashedPassword).then(function(isMatching){
          if(isMatching){
              //Create a token and send to client\
              // console.log('User username: ' + user.username);
              // console.log('User SECRFET KEY: ' + SECRET_KEY);

              const token = jwt.sign({username: user.username}, SECRET_KEY, {expiresIn: 4000});
              // console.log(token);
              return res.send({token: token,username:req.body.username});
          } else {
              console.log('h');
              return res.status(401).send({error: 'Wrong password'});
          }
      });
  }).catch(function (err) {
    res.status(501).send(err);
    console.log("go sigup ya FoOlL!")
  })
  
});

app.put("/payment",function(req,res){
User.update({payment:req.body.payment},
  {where:{username:req.body.username}}).then(function(){
    console.log("payment updated")
    res.send('done')
  }).catch(function(err){
    return res.send(err)
  })
});

  app.put("/passenger",function(req,res){
    User.update({Role:req.body.role2},
      {where:{username:req.body.username}}).then(function(){
        console.log("role updated")
        res.send('done')
      })
    });

  app.put("/deleteRole",function(req,res){
    User.update({Role:null},
      {where:{username:req.body.username}}).then(function(){
        console.log("role deleted")
        res.send('done')
      })
  });

  //TODO: Get it to work
  // app.get ('./location', authenticate, (req,res) => {
  //   const user = req.body.user.username; //Added by authenticate function 
  //   Place.findAll({where: {username: user}}).then(function(loc){
  //       return res.send({location: loc});
  //   }).catch(function(err){
  //       return res.status(404).send({error: 'Server Error'});
  //   })
  // });

  // Authenticate --> Put

  app.put("/main-map" ,authenticate ,(req, res) => {
    // console.log('Authenticate' + authenticate.token);
    // console.log(req.body.Loc_Lat);
    // console.log(req.body.user.username);

    const username = req.body.user.username;

    // console.log("User: " + user);
    // console.log("Request User: " + req.user);
    // console.log(req);

    // console.log('h1');
    // var username = user.username
    // console.log("GO AWAY")
    User.update({
      loc_Lat: req.body.Loc_Lat,
      loc_Lng: req.body.Loc_Lng
    },{where : {username : username}}).then(reaa => res.send("Location saved")).catch(err => console.log(err))
  })

  app.get('/driverss',(req,res) => {
    User.findAll({where:{Role:'driver'}}).then(function(data){
      console.log(data)
      return res.send({data:data})
    }).catch(function(err){
      console.log(err)
      return res.send(err)
    })
  })

  app.post('/pickup',(req,res) => {
    console.log('hellllllooooooooooooooooooooooooooo',req.body)
    User.findOne({where:{username:req.body.driverName}}).then(function(data){
      console.log('heeeeeeeeeeeeey',data.numberOfPassengers)
      if(data.numberOfPassengers === 0){
        User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}
        }).then(function(){
          Trip.create({
            driver:req.body.driverName,
            pass1:req.body.username
          })
        }).then(function(){
          return res.send('passenger 1 added')
        })
      }else if (data.numberOfPassengers === 1){
       Trip.findOne({where:{pass1:req.body.username}}).then(function(user){
         if(!user){
          User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}}).then(function(){
            User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}
            }).then(function(){
              Trip.update({
                pass2:req.body.username
              },{where:{driver:req.body.driverName}
            })
              }).then(function(){
                return res.send('passenger 2 added')
              })
           })
         }
       })
      
      }else if(data.numberOfPassengers === 2) {
        Trip.findOne({where:{pass1:req.body.username}}).then(function(user1){
          if(!user1){
            Trip.findOne({where:{pass2:req.body.username}}).then(function(user2){
              if(!user2){
                User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}}).then(function(){
                  User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}
                  }).then(function(){
                    Trip.update({
                      pass3:req.body.username
                    },{where:{driver:req.body.driverName}})
                    }).then(function(){
                      return res.send('passenger 3 added')
                    })
                  })
              }
            })
          }
        })
      }else if(data.numberOfPassengers === 3) {
        Trip.findOne({where:{pass1:req.body.username}}).then(function(user1){
          if(!user1){
            Trip.findOne({where:{pass2:req.body.username}}).then(function(user2){
              if(!user2){
                Trip.findOne({where:{pass3:req.body.username}}).then(function(user3){
                  if(!user3){

                    User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}}).then(function(){
                      User.update({numberOfPassengers:data.numberOfPassengers+1},{where:{username:req.body.driverName}
                      }).then(function(){
                        Trip.update({
                          pass4:req.body.username
                        },{where:{driver:req.body.driverName}})
                        }).then(function(){
                          return res.send('passenger 4 added')
                        })
                      })

                  }
                })
              }
            })
          }
        })
      }else{
        console.log('full')
        return res.send('full')
      }

    }).catch(function(err){
      res.send(err)
    })
  })


  app.get('/passengerss',(req,res) => {
    // console.log(req.query._username)
    // res.send(req.query._username)
    var passengers=[]
    // console.log(this.props.location.query._username)
    Trip.findOne({where:{driver:req.query._username}}).then(function(driver){
      if(driver.pass1 !== null){
        User.findOne({where:{username:driver.pass1}}).then(function(pass){
          passengers.push(pass)
          if(driver.pass2 !== null){
            User.findOne({where:{username:driver.pass2}}).then(function(pass){
              passengers.push(pass)
              if(driver.pass3 !== null){
                User.findOne({where:{username:driver.pass3}}).then(function(pass){
                  passengers.push(pass)
                  if(driver.pass4 !== null){
                    User.findOne({where:{username:driver.pass4}}).then(function(pass){
                      passengers.push(pass)
                    })
                  }else{
                    return res.send(passengers)
                  }
                })
              }else{
                return res.send(passengers)
              }
            })
          }else{
            return res.send(passengers)
          }
        })
      }else{
        return res.send(passengers)
      }
    })
  })
  app.put("/main-mapm", authenticate, (req, res) => {
    const username = req.body.user.username;

    User.update({
      dest_Lat: req.body.lat,
      dest_Lng: req.body.lng
    },{where : {username : username}}).then(reaa => res.send("Destination saved")).catch(err => console.log(err))
  });

  app.get("/main-mapm", authenticate, (req, res) => {
        const user = req.body.user.username; //Added by authenticate function 
        User.findAll({where: {username: user}}).then(function(userFound){
            // if(userFound) {
            //   console.log('USSSER');
            //   console.log(userFound.id);
            // }
            return res.status(200).send({user: userFound}).end();
        }).catch(function(err){
            return res.status(404).send({error: err});
        })
  });

  app.get('/all-users', (req, res) => {
    User.findAll().then(function(data){
      return res.status(200).send({users: data}).end();
    }).catch(function(err){
        return res.status(404).send({error: err});
    });
  });
