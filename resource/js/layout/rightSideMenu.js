(function(){
	var UserRightSideMene = (function() {
		
		var UserRightSideMene = function (){}
		
		UserRightSideMene.prototype.init = function(userNm) {
			initLayout();
		}
		
		var initLayout = function(){
			
			var rootContainer = comm.getElById("rootContainer");
			var rightSideMenuContainer = document.createElement("div");
			var arrowWrapper = document.createElement("div");
			var arrowBtn = document.createElement("i");
			var tableContainer= document.createElement("div");
			var historyOptions = document.createElement("div");
			var historyTable = document.createElement("table");
			var historyHead = document.createElement("tr");
			var historydate = document.createElement("th");
			var historyContents = document.createElement("th");
			var options = document.createElement("ul");
			var syncOption = document.createElement("li");
			var removeOption = document.createElement("li");
			var restoreOption = document.createElement("li");
			var protectOption = document.createElement("li");
			
			arrowWrapper.className = "right_menu_arrow";
			rightSideMenuContainer.className = "right_menu";
			tableContainer.className = "right_menu_table";
			historyOptions.className = "right_menu_table_options";
			
			syncOption.className = "right_menu_table_sync_btn";
			removeOption.className = "right_menu_table_remove_btn";
			restoreOption.className = "right_menu_table_restore_btn";
			protectOption.className = "right_menu_table_unprotect_btn";
			
			historydate.textContent = "일자";
			historyContents.textContent = "내용";
			
			options.appendChild(restoreOption);
			options.appendChild(removeOption);
			options.appendChild(syncOption);
			options.appendChild(protectOption);
			
			historyHead.appendChild(historydate);
			historyHead.appendChild(historyContents);
			
			historyTable.appendChild(historyHead);
			
			arrowWrapper.appendChild(arrowBtn);
			
			historyOptions.appendChild(options);
			
			tableContainer.appendChild(historyOptions);
			tableContainer.appendChild(historyTable);
			
			rightSideMenuContainer.appendChild(arrowWrapper);
			rightSideMenuContainer.appendChild(tableContainer);
			
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
			var activeRight = "0";
			var activeMargin = "-35px";
			var unactiveRight = "-300px";
			var unactiveMargin = "-25px";
			
			arrowBtn.addEventListener("click", function(){
				
				var classList = this.classList;
				
				if(classList.contains("active")){
					rightSideMenuContainer.style.right = unactiveRight;
					arrowWrapper.style.left = unactiveMargin;
					classList.remove("active");
				} else{
					rightSideMenuContainer.style.right = activeRight;
					arrowWrapper.style.left = activeMargin;
					classList.add("active");
				}
			});
			
		}
		
		return UserRightSideMene;
	})();
	
	

    var rightSideMene = new UserRightSideMene();
    
    rightSideMene.init();
})();