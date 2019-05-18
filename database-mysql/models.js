
const { db, Sequelize } = require('./db.js');
//  Database Schema 
const User = db.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: Sequelize.STRING, required: true, unique: true},
    email:{type:Sequelize.STRING, require:true,unique:true},
    password: {type: Sequelize.STRING, required: true},
    location:{type:Sequelize.STRING,require:true},
    destination:{type:Sequelize.STRING},
    phoneNumber:{type:Sequelize.STRING,require:true},
    carPlateNumber:{type:Sequelize.STRING,require:true},
    Role:{type:Sequelize.STRING}

});

module.exports.User = User;