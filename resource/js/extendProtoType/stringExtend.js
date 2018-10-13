
if(typeof(String.prototype.defaultString) == 'undefined'){
	String.prototype.defaultString = function(defaultString) {
		var str = this.toString();
		if(str == null || str == ''){
			str = defaultString;
		}
		return str;
	}
}
if(typeof(String.prototype.replaceAll) == 'undefined'){
	String.prototype.replaceAll = function(originalText,replaceText) {
		return this.toString().split(originalText).join(replaceText);
		
	}
}
if(typeof(String.prototype.reverse) == 'undefined'){
	String.prototype.reverse = function(){
		return this.toString().split("").reverse().join("");
	}
}
if(typeof(String.prototype.containString) == 'undefined'){
	String.prototype.containString = function(findTxt){
		var result = false;
		if(this.toString().indexOf(findTxt) > -1){
			result = true;
		}
		return result;
	}
}
if(typeof(String.prototype.removeHtml) == 'undefined'){
	String.prototype.removeHtml = function(){
		return this.toString().replace(/(<([^>]+)>)/gi, "");
	}
}
if(typeof(String.prototype.parsInt) == 'undefined'){
	String.prototype.parsInt = function(){
		return this.toString() * 1;
	}
}

if(typeof(String.prototype.toUpperFristString) == 'undefined'){
	String.prototype.toUpperFristString = function(){
		if(this.toString().length === 0){
			return;
		}
		var text = this.toString();
		var temp = text.substring(0,1);
		var result = text.replace(temp,temp.toUpperCase());
		return result;
	}
}

if(typeof(String.prototype.toLowerFristString) == 'undefined'){
	String.prototype.toLowerFristString = function(){
		if(this.toString().length === 0){
			return;
		}
		var text = this.toString();
		var temp = text.substring(0,1);
		var result = text.replace(temp,temp.toLowerCase());
		return result;
	}
}




















