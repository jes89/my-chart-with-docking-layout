const workingHistory = require("../model/workingHistory");



const insertWorkingHistory = () =>{
	workingHistory.create({
		title: "title",
		contents: "test",
		remark: "remark"
	});
}


const findWorkingHistory = (where, res) =>{
	
	workingHistory.findAll({
							where: where,
							attributes: ["title", "contents", "remark"]
							}).then(result => {
									for(var ix = 0, ixLen = result.length; ix < ixLen; ix ++){
										let temp = result[ix];
										console.log(temp.dataValues);
									}
								});
}




module.exports = {findWorkingHistory, insertWorkingHistory}