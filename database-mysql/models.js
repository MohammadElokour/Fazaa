
const { db, Sequelize } = require('./db.js');
//  Database Schema 
const User = db.define('usersdb', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: Sequelize.STRING, required: true, unique: true},
    email:{type:Sequelize.STRING, require:true,unique:true},
    password: {type: Sequelize.STRING, required: true},
    loc_Lat:{type:Sequelize.STRING},
    loc_Lng:{type:Sequelize.STRING},
    dest_Lat:{type:Sequelize.STRING},
    dest_Lng:{type:Sequelize.STRING},
    phoneNumber:{type:Sequelize.INTEGER},
    carPlateNumber:{type:Sequelize.STRING},
    carType:{type:Sequelize.STRING},
    carColor:{type:Sequelize.STRING},
    Role:{type:Sequelize.STRING},
    payment:{type: Sequelize.STRING}

});

module.exports.User = User;