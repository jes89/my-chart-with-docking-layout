(function(){
	var UserRightSideMene = function() {
		
		
		
		this.init = function(userNm) {
			initLayout();
		}
			
		var initLayout = function(){
			var rightSideMenuContainer = document.createElement("div");
			var rootContainer = comm.getElById("rootContainer");
			
			rightSideMenuContainer.className = "right_menu";

			rootContainer.appendChild(rightSideMenuContainer);
		}
		
//		<div style="width: 25px;height: 25px;background-color: white;position: absolute;left: -100px;">
//		<img src="/img/iconmonstr-arrow-27.svg">
//		</div>
		
	}

    var rightSideMene = new UserRightSideMene();
    
    rightSideMene.init();
})();
