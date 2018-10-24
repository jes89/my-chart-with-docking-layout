var ChartsContainer = (function() {
	
	var ChartsContainer = function(){}
	var preventEevnt = function(){event.preventDefault();}
	
	ChartsContainer.prototype.groupInfo = [];
	ChartsContainer.prototype.rootContainerBoarder = 1;
	ChartsContainer.prototype.rootContainerPadding = 10;
	ChartsContainer.prototype.chartsContainerBoarder = 1;
	ChartsContainer.prototype.chartsContainerPadding = 10;
	ChartsContainer.prototype.prePartitionY = null;
	ChartsContainer.prototype.prePartitionX = null;
	ChartsContainer.prototype.isMouseDown = false;
	ChartsContainer.prototype.selectedPartition = null;
	
	
	ChartsContainer.prototype.init = function() {
		
		var rootContainerBoarder =  ChartsContainer.prototype.rootContainerBoarder;
		var rootContainerPadding = ChartsContainer.prototype.rootContainerPadding;
		var chartsContainerBoarder = ChartsContainer.prototype.chartsContainerBoarder;
		var chartsContainerPadding = ChartsContainer.prototype.chartsContainerPadding;
		var groupIdx = 0;
		var chartsContainer = document.createElement("div");
		var rootContainer = comm.getElById("rootContainer");
		var header = comm.getElById("header");
		var minusStylePx = - (rootContainerPadding * 2) - (rootContainerBoarder * 2) - (chartsContainerBoarder * 2); 
		var resultWidth = rootContainer.offsetWidth + minusStylePx;
		var resultHeight = rootContainer.offsetHeight - header.offsetHeight + minusStylePx;
		
		chartsContainer.setAttribute("data-group",groupIdx);
		
		chartsContainer.id = "contentsRootContainer";
		chartsContainer.className = "contents_root_container";
		chartsContainer.style.height = resultHeight + "px";
		chartsContainer.style.width = resultWidth + "px";
		
		chartsContainer.style.padding = chartsContainerPadding + "px";
		chartsContainer.style.border = "solid gray";
		chartsContainer.style.borderWidth = chartsContainerBoarder + "px";
		
		rootContainer.appendChild(chartsContainer);
		
		chartsContainer.ondragstart = preventEevnt;
		chartsContainer.ondragover = preventEevnt;
		chartsContainer.ondrop = Component.prototype.drop;
		
		document.onmousemove = function () {

			if (ChartsContainer.prototype.isMouseDown === false) {
				return;
			}
			
			var defaultPadding = containerPadding + ChartsContainer.prototype.chartsContainerBoarder;
			var containerPadding = ChartsContainer.prototype.chartsContainerPadding;
			var minSize = Component.prototype.minSize;
			var selectedPartition = ChartsContainer.prototype.selectedPartition;
			var nowY = event.y;
			var nowX = event.x;
			var previousSibling = selectedPartition.previousElementSibling;
			var nextSibling = selectedPartition.nextSibling;
			var previousSiblingTop = previousSibling.offsetTop;
			var previousSiblingLeft = previousSibling.offsetLeft;
			var previousSiblingWidth = previousSibling.offsetWidth;
			var previousSiblingHeight = previousSibling.offsetHeight;
			var nextSiblingWidth = nextSibling.offsetWidth;
			var nextSiblingHeight = nextSibling.offsetHeight;
			var minWidth = minSize + previousSiblingLeft;
			var minHeight = minSize + previousSiblingTop;
			var maxTop = previousSiblingTop + previousSiblingHeight + nextSiblingHeight - minSize;
			var maxLeft = previousSiblingLeft + previousSiblingWidth + nextSiblingWidth - minSize;
			
//		    var nextPreviousEl = previousSibling.previousElementSibling;
//			
//			while( nextPreviousEl ){
//				
//				
//				nextPreviousEl = nextPreviousEl.previousElementSibling;
//			}
			
			if(minHeight > nowY ){
				nowY = minHeight;
			}
			
			if(maxTop  < nowY){
				nowY = maxTop;
			}
			
			if(minWidth > nowX){
				nowX = minWidth;
			}
			
			if(maxLeft  < nowX){
				nowX = maxLeft;
			}

			if(selectedPartition.className.indexOf("horizontal") > -1){
				selectedPartition.style.top = nowY + "px";
			} else{
				selectedPartition.style.left = nowX + "px";
			}
			
			ChartsContainer.prototype.prePartitionY = nowY;
			ChartsContainer.prototype.prePartitionX = nowX;
			
		};

		document.onmouseup = function () {
			
			ChartsContainer.prototype.isMouseDown = false;

			var selectedPartition = ChartsContainer.prototype.selectedPartition;
			
			if(selectedPartition == null){
				return;
			}
			
		    var previousSibling = selectedPartition.previousElementSibling;
		    var nextElementSibling = selectedPartition.nextElementSibling; 
		    var partitionTop = selectedPartition.offsetTop;
		    var partitionLeft = selectedPartition.offsetLeft;
		    var priviousWidth = null;
		    var priviousHeight = null;
		    var originWidth = null;
		    var originHeight = null;
		    var changedPx = null;
		    var previousSiblingTop = comm.getNumWithoutPx(previousSibling,"top");
		    var previousSiblingLeft = comm.getNumWithoutPx(previousSibling,"left");
		    var previousSiblingWidth = comm.getNumWithoutPx(previousSibling,"width");
		    var previousSiblingHeight = comm.getNumWithoutPx(previousSibling,"height");
		    var nextPreviousEl = previousSibling.previousElementSibling;
			var nextPreviousPosotion = null;
			var nextPreviousElTop = null;
			var nextPreviousElLeft = null;
			var nextPreviousElWidth = null;
			var nextPreviousElHeight = null;
			var previousTotallPosotion = null;
			
		    if(selectedPartition.className.indexOf("horizontal") > -1){
		    	
		    	originHeight = comm.getNumWithoutPx(previousSibling,"height");
		    	priviousHeight = partitionTop - previousSiblingTop;
		    	
		    	previousSibling.style.height = priviousHeight  + "px";
		    	
		    	nextElementSibling.style.top = partitionTop + "px";
		    	nextElementSibling.style.height = (originHeight - priviousHeight) + comm.getNumWithoutPx(nextElementSibling,"height")  + "px";
		    	
		    	previousTotallPosotion = previousSiblingTop + previousSiblingHeight;
		    	
		    	while( nextPreviousEl ){
		    		
		    		nextPreviousElTop = comm.getNumWithoutPx(nextPreviousEl,"top");
		    		nextPreviousElHeight = comm.getNumWithoutPx(nextPreviousEl,"height");
		    		nextPreviousPosotion = nextPreviousElTop + nextPreviousElHeight;
		    		
		    		if( Math.abs(nextPreviousPosotion - previousTotallPosotion) <  Component.prototype.minSize){
		    			nextPreviousEl.style.height = comm.getNumWithoutPx(nextPreviousEl,"height") - (previousSiblingHeight - priviousHeight) + "px";
		    		}
		    		
		    		nextPreviousEl = nextPreviousEl.previousElementSibling;
		    	}
		    	
		    } else{
		    	
		    	originWidth = comm.getNumWithoutPx(previousSibling,"width");
		    	priviousWidth = partitionLeft - previousSibling.offsetLeft;
		    	
		    	previousSibling.style.width = priviousWidth  + "px";
		    	
		    	nextElementSibling.style.left = partitionLeft + "px";
		    	nextElementSibling.style.width = (originWidth - priviousWidth) + comm.getNumWithoutPx(nextElementSibling,"width")  + "px";
		    	
		    	previousTotallPosotion = previousSiblingLeft + previousSiblingWidth;
		    	
	    		while( nextPreviousEl ){
		    		
	    			nextPreviousElLeft = comm.getNumWithoutPx(nextPreviousEl,"left");
		    		nextPreviousElWidth = comm.getNumWithoutPx(nextPreviousEl,"width");
		    		nextPreviousPosotion = nextPreviousElLeft + nextPreviousElWidth;
		    		
		    		if( Math.abs(nextPreviousPosotion - previousTotallPosotion) <  Component.prototype.minSize){
		    			nextPreviousEl.style.width = comm.getNumWithoutPx(nextPreviousEl,"width") - (previousSiblingWidth - priviousWidth) + "px";
		    		}
		    		
		    		nextPreviousEl = nextPreviousEl.previousElementSibling;
		    	}
		    }
			
			ChartsContainer.prototype.selectedPartition = null;
			ChartsContainer.prototype.prePartitionY = null;
			ChartsContainer.prototype.prePartitionX = null;
		};
		
	}
	
	return ChartsContainer;
	
})();




