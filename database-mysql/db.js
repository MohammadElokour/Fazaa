const Sequelize = require("sequelize");

// https://remotemysql.com/stats.php  Ask Canaan for the logIn info
const db = new Sequelize('sql12293151', 'sql12293151', 'K9RaFkAPbr', {
  host: 'sql12.freesqldatabase.com',
  dialect:'mysql',
});


db.sync({ force: false, logging: false  }).then(() => {
    console.log(`Database & tables created!`)
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;