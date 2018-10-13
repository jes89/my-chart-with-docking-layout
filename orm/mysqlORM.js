const Sequelize = require("sequelize");
const express = require("express");
const path = require("path");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(path.join(__dirname, "..", "properties", "mysql.properties"));

const sequelize = new Sequelize(
		properties.get("db")				, 
		properties.get("user")				, 
		properties.get("pass").toString()	,
		  {
		    "host"	 : properties.get("host")		, 
		    "port"   : properties.get("port")		,
		    "dialect": properties.get("dialect") 
		  }
		);



module.exports = {
  		Sequelize,sequelize
  }


