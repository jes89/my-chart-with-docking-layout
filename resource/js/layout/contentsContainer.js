var ContentsContainer = (function() {
	
	var superClass = null;
	
	var ContentsContainer = function(){}
	
	if(typeof(DockingLayout) !== "function"){
		comm.errorLog("ContentsContainer.js have to extend DockingLayout.js");
		return;
	}
	
	comm.extendClass( DockingLayout, ContentsContainer );
	
	ContentsContainer.prototype.init = function(subContainerSize) {
		
		initLayout(subContainerSize);
		
	}
		
	var initLayout = function(subContainerSize){
		var contentsWrapper = document.createElement("div");
	
		var rootContainer = comm.getElById("rootContainer");
		
		contentsWrapper.className = "contents_root_container";
		
		rootContainer.appendChild(contentsWrapper);
		
		initSubContainer(contentsWrapper, subContainerSize);
		
	}
	
	var initSubContainer = function(contentsWrapper, subContainerSize){
		
		var border =  2;
		var wrapperhHeight = contentsWrapper.offsetHeight;
		var eachHeight = (wrapperhHeight / subContainerSize) - border;
		var tempEl = null;
		
		for(var ix = 0; ix < subContainerSize; ix ++){
			
			tempEl = document.createElement("div");
			
			tempEl.setAttribute("data-index", ix);
			
			tempEl.className = "contents_sub_container";
			
			tempEl.style.height = eachHeight + "px";
			
			contentsWrapper.appendChild(tempEl);
			
			addDragDropEvt(tempEl);
		}
	}
	
	var addDragDropEvt = function(contentsWrapper){
		contentsWrapper.addEventListener("dragover", function(){event.preventDefault();});
		contentsWrapper.addEventListener("drop", ContentsContainer.prototype.dropEvt);
	}
	
	return ContentsContainer;
	
})();




