var singleObj = (function() {
	var instance;
	
	var gObj = {
			headEl : document.getElementsByTagName("head")[0]
	}
	
	function initiate() {
		return {
			getHead : function() {
				return gObj.headEl;
			},
			getNowDate : function(msg) {
				var now = new Date();
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();
				var milliSecond = now.getMilliseconds();

				if (hour < 10) {
					hour = "0" + hour;
				}

				if (second < 10) {
					second = "0" + second;
				}

				return year + "-" + month + "-" + date + " " + hour + ":" + minute
						+ ":" + second + " " + milliSecond;
			}, 
			errorLog : function(msg) {
				var fullDate = getNowDate();

				console.log(fullDate + " : " + msg);
			}
		}
	}

	return {
		getInstance : function() {
			if (!instance) {
				instance = initiate();
			}
			return instance;
		}
	}
})();


var comm = singleObj.getInstance();
