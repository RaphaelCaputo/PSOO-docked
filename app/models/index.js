const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const UserModel = require("./user");
const config = require("../../config/database.js");

const db = {};
const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  db,
  User
};
