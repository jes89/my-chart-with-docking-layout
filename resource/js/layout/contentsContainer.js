var ContentsContainer = function() {
	
	
	
	this.init = function(userNm) {
		initLayout();
	}
		
	var initLayout = function(){
		var contentsWrapper = document.createElement("div");
		var rootContainer = comm.getElById("rootContainer");
		
		contentsWrapper.className = "contents_container";

		rootContainer.appendChild(contentsWrapper);
	}
	
}

var contentsContainer = new ContentsContainer();

contentsContainer.init();
