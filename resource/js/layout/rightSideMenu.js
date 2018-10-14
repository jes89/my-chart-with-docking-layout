(function(){
	var UserRightSideMene = function() {
		
		var rootContainer = comm.getElById("rootContainer");
		
		this.init = function(userNm) {
			initLayout();
		}
			
		var initLayout = function(){
			var rightSideMenuContainer = document.createElement("div");

			rightSideMenuContainer.className = "right_menu";

			rootContainer.appendChild(rightSideMenuContainer);
		}
		
	}

    var rightSideMene = new UserRightSideMene();
    
    rightSideMene.init();
})();
