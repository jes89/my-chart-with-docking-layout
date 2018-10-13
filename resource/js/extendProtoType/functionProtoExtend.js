
Function.prototype.hasPrototype = function(targetObj, protoName){
	return !!targetObj.prototype[protoName]; 
}


Function.prototype.hasNotPrototype = function(targetObj, protoName){
	return !targetObj.prototype[protoName]; 
}

