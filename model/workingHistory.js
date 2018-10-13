const { Sequelize, sequelize } = require("../orm/mysqlORM");

const tbWorkingHistory = sequelize.define("tbWorkingHistory", {
	  idx: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    allowNull: false,
	    autoIncrement: true
	  },
	  title: {
	    type: Sequelize.STRING,
	    allowNull: false
	  },
	  contents: {
		    type: Sequelize.STRING,
		    allowNull: false
		  },
	  remark: {
		    type: Sequelize.STRING,
		    allowNull: false
		  }

	},  {
	    classMethods: {},
	    tableName: "tbWorkingHistory",
	    freezeTableName: true,
	    underscored: true,
	    timestamps: false
	});

sequelize.sync({  	alter: true, 
					preserveColumnsOnSync: true  });

module.exports = tbWorkingHistory
