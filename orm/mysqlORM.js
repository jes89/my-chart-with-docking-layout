const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "ajs", 
  "root", 
  "1111",
  {
    "host"	: "localhost", 
    "port"     : 3306,
    "dialect": "mysql" 
  }
);

module.exports = {
		Sequelize,sequelize
}