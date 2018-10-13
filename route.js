const express = require('express');
const router = express.Router();
const path = require("path");
const { findWorkingHistory, insertWorkingHistory } = require("./dao/workingHistoryDAO");

router.get('/', (req, res) => {
	res.render(
		  		path.join(__dirname, "views", "main"), { 
		  			title: 'my first node'
  				}
	  		);
});

module.exports = router;