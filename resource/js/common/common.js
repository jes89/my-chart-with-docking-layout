var comm = new (function() {

	var headEl = document.getElementsByTagName("head")[0];

	this.getHead = function() {
		return headEl;
	}

	this.getNowDate = function(msg) {
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
	}

	this.errorLog = function(msg) {
		var fullDate = getNow();

		console.log(fullDate + " : " + msg);
	}

//	this.required = function(requiredArr) {
//
//		if (typeof (requiredArr) !== "object" || !!requiredArr.length == false) {
//			this.errorLog("required error scriptArr was not Object");
//			return;
//		}
//
//		var scriptEl = null;
//		var tempObj = null;
//		var callbackFn = null;
//		var scriptUrl = null;
//		
//		for (var i = 0, iLen = requiredArr.length; i < iLen; i++) {
//
//			tempObj = requiredArr[i];
//			
//			scriptUrl = tempObj["scriptUrl"];
//			callbackFn = tempObj["callbackFn"];
//			
//			scriptEl = document.createElement("script");
//			
//			scriptEl.type = "text/javascript";
//			
//			scriptEl.src = scriptUrl;
//
//			headEl.appendChild(scriptEl);
//			
//			if(typeof(callbackFn) === "function"){
//				scriptEl.onload = callbackFn;
//			}
//		}
//	}
})();
