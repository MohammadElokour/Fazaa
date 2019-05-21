const Sequelize = require("sequelize");
//
const db = new Sequelize('userdb', 'root', 'root', {
  host: 'localhost',
  dialect:'mysql'
});


db.sync({ force: true, logging: false  }).then(() => {
    console.log(`Database & tables created!`)
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;