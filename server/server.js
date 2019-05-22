const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = express.json();
const { User } = require('../database-mysql/models.js');
const port = process.env.PORT || 9876;
const cors = require('cors');
const { SECRET_KEY } = require('./secret.js');
const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(port, () => {
	console.log(`Welcome to faza'a server port ==> ${port}`);
});

app.use(bodyParser);
app.use(cors());

//middleware
const authenticate = function(req, res, next) {
	const token = req.headers['x-access-token']; //Username encoded in token
	if (!token) {
		return res.status(HTTP_UNAUTHORIZED).send('Please sign in');
	}
	jwt.verify(token, SECRET_KEY, function(err, decodedToken) {
		//If err, token invalid
		if (err) {
			return res.status(HTTP_UNAUTHORIZED).send('Please sign in');
		}
		//Check if user exists in the database
		const username = decodedToken.username;
		User.findOne({ username: username })
			.then(function(user) {
				console.log(user);
				if (!user) {
					return res.status(HTTP_UNAUTHORIZED).send('Please sign up');
				}
				req.body.user = user; //Put user in req.body
				return next();
			})
			.catch(function(err) {
				return res.status(HTTP_SERVER_ERROR).send(err);
			});
	});
};

////////API

app.post('/signup', function(req, res) {
	var username = req.body.username;
	var pass = req.body.password;
	var email = req.body.email;
	var hashedPassword = bcrypt.hashSync(pass, 3);
	User.create({
		username: username,
		email: email,
		password: hashedPassword,
		loc_Lat: '',
		loc_Lng: '',
		dest_Lat: '',
		dest_Lng: '',
		phoneNumber: '',
		carPlateNumber: '',
		carType: '',
		carColor: '',
		Role: '',
	})
		.then(function() {
			return res.status(201).send('You have created an account Successfully');
		})
		.catch(function(err) {
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(400).send('username is already taken');
			}
			return res.status(500).send(err);
		});
});

app.post('/login', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	//Check if user exists in the database
	User.findOne({ where: { username: username } }).then(function(user) {
		if (!user) {
			return res.status(401).send({ error: 'Please sign up' });
		}
		//Compare with stored password
		const existingHashedPassword = user.password;
		bcrypt.compare(password, existingHashedPassword).then(function(isMatching) {
			if (isMatching) {
				//Create a token and send to client
				const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: 4000 });
				return res.send({ token: token });
			} else {
				return res.status(401).send({ error: 'Wrong password' });
			}
		});
	});
});

app.put('/driver', function(req, res) {
	//taking all the data from the front-end including the username
	const username = req.body.username;
	const phoneNumber = req.body.phoneNumber;
	const carPlateNumber = req.body.carPlateNumber;
	const carType = req.body.carType;
	const carColor = req.body.carColor;
	//taking the username again in order to specifically update that username's info on the database
	User.update(
		{
			phoneNumber: phoneNumber,
			carPlateNumber: carPlateNumber, //updating all the data from emty string to values the user-driver provided.
			carType: carType,
			carColor: carColor,
		},
		{ where: { username: username } }
	)
		.then(() => {
			return res.send('Profile Created'); //creating the profile saving the data in order to fetch it for the passenger.
		})
		.catch(function(err) {
			return res.status(500).send(err.message);
		});
});
