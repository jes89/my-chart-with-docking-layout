var singleObj = (function() {
	var instance;
	
	var gObj = {
			headEl : document.getElementsByTagName("head")[0],
			cacheElementsMemory : {rootContainer : document.getElementById("rootContainer")} 
	}
	
	function initiate() {
		return {
			getHead : function() {
				return gObj.headEl;
			},
			extendClass : function( superClass, childClass ){
				
				var protoTypeArr = Object.keys(superClass.prototype);
				var protoAttr = null;
				
				for(var ix = 0, ixLen = protoTypeArr.length; ix < ixLen; ix++){
					protoAttr = protoTypeArr[ix];
					childClass.prototype[protoAttr] = superClass.prototype[protoAttr];
				}
				
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

				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second + " " + milliSecond;
			}, 
			getElById : function(id){
				
				var selectedEl = gObj.cacheElementsMemory[id];
				
				if(selectedEl == null){
					selectedEl = document.getElementById(id);
					gObj.cacheElementsMemory[id] = selectedEl;
				}
		
				return selectedEl;
				
			},
			getNumWithoutPx : function(el,style){
				var result = null;
				var selectedStyle = null;
				var replacedStr = null;
				
				if(el){
					selectedStyle = el.style[style];
					if(selectedStyle){
						replacedStr = selectedStyle.replace("px","");
						if(isNaN(replacedStr)){
							result = 0;
						} else{
							result = replacedStr * 1;
						}
					} else{
						result = 0;
					}
				} else{
					result = 0;
				}
				
				
				return result;
				
			},
			errorLog : function(msg) {
				var fullDate = this.getNowDate();

				console.warn(fullDate + " , " + msg);
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
