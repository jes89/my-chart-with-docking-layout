var ContentsContainer = function() {
	
	this.init = function(subContainerSize) {
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
		
		var border = 1 * 2;
		var wrapperhHeight = contentsWrapper.offsetHeight;
		var eachHeight = (wrapperhHeight / subContainerSize) - border;
		var tempEl = null;
		
		for(var ix = 0; ix < subContainerSize; ix ++){
			
			tempEl = document.createElement("div");
			
			tempEl.className = "contents_sub_container";
			
			tempEl.style.height = eachHeight + "px";
			
			contentsWrapper.appendChild(tempEl);
		
		}
	}
}

