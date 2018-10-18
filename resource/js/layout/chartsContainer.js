var ChartsContainer = (function() {
	
	var ChartsContainer = function(){}
	var preventEevnt = function(){event.preventDefault();}
	
	ChartsContainer.prototype.groupInfo = [];
	
	ChartsContainer.prototype.init = function() {
		
		var rootContainerBoarder =  1;
		var rootContainerPadding = 10;
		var chartsContainerBoarder = 1;
		var chartsContainerPadding = 10;
		var groupIdx = 0;
		var chartsContainer = document.createElement("div");
		var rootContainer = comm.getElById("rootContainer");
		var header = comm.getElById("header");
		var minusStylePx = - (rootContainerPadding * 2) - (rootContainerBoarder * 2);
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
	}
	
	return ChartsContainer;
	
})();




