(function(){
	var UserRightSideMene = function() {
		
		this.init = function(userNm) {
			initLayout();
		}
		
		var initLayout = function(){
			var rightSideMenuContainer = document.createElement("div");
			var arrowWrapper = document.createElement("div");
			var arrowBtn = document.createElement("i");
			var rootContainer = comm.getElById("rootContainer");
			
			arrowWrapper.className = "right_menu_arrow";
			rightSideMenuContainer.className = "right_menu";
			
			arrowWrapper.appendChild(arrowBtn);
			rightSideMenuContainer.appendChild(arrowWrapper);
			rootContainer.appendChild(rightSideMenuContainer);
			
			initProperties(rightSideMenuContainer,arrowWrapper ,arrowBtn);
			
			initEvent();
		}
		
		var initProperties = function(rightSideMenuContainer, arrowWrapper, arrowBtn){
			this.rightSideMenuContainer = rightSideMenuContainer;
			this.arrowWrapper = arrowWrapper;
			this.arrowBtn = arrowBtn;
		}
		
		var initEvent = function(){
			
			var rightSideMenuContainer = this.rightSideMenuContainer;
			var arrowWrapper = this.arrowWrapper;
			var arrowBtn = this.arrowBtn;
			
			arrowBtn.addEventListener("click", function(){
				
				var classList = this.classList;
				
				if(classList.contains("active")){
					rightSideMenuContainer.style.width = "0";
					arrowWrapper.style.left = "-25px";
					classList.remove("active");
				} else{
					rightSideMenuContainer.style.width = "300px";
					arrowWrapper.style.left = "-35px";
					classList.add("active");
				}
			});
		}
	}

    var rightSideMene = new UserRightSideMene();
    
    rightSideMene.init();
})();
