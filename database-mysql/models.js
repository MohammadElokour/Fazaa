const {
    db,
    Sequelize
} = require('./db.js');
//  Database Schema 
const User = db.define('usersdb', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        require: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
    loc_Lat: {
        type: Sequelize.STRING
    },
    loc_Lng: {
        type: Sequelize.STRING
    },
    dest_Lat: {
        type: Sequelize.STRING
    },
    dest_Lng: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.INTEGER
    },
    carPlateNumber: {
        type: Sequelize.STRING
    },
    carType: {
        type: Sequelize.STRING
    },
    carColor: {
        type: Sequelize.STRING
    },
    Role: {
        type: Sequelize.STRING
    },
    payment: {
        type: Sequelize.STRING
    }

});

const Role = db.define('driver&pass', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dirver_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    passenger_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
});

const confirm = db.define('confirm', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    aproval: {
        type: Sequelize.BOOLEAN
    }

});
confirm.belongsTo(Role, {

    as: 'dirverid',
    foreignKey: 'dirver_id'
}) // add all primarykeys from the role tabel to the confirm table 

confirm.belongsTo(Role, {
    as: 'passengerid',
    foreignKey: 'passenger_id'
})

module.exports.User = User;
module.exports.Role = Role;