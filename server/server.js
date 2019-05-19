const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../database-mysql/models.js')
const port  = process.env.PORT || 9876

const app = express();

 app.use(express.static(__dirname + '/../react-client/dist'));


app.listen(port , ()=>{
    console.log(`Welcome to faza'a server port ==> ${port}`)
})