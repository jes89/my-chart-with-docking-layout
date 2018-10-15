(function(){
	var UserRightSideMene = function() {
		
		this.init = function(userNm) {
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
			
			arrowWrapper.className = "right_menu_arrow";
			rightSideMenuContainer.className = "right_menu";
			tableContainer.className = "right_menu_table";
			historyOptions.className = "right_menu_table_options";
			
			syncOption.className = "right_menu_table_sync_btn";
			removeOption.className = "right_menu_table_remove_btn";
			restoreOption.className = "right_menu_table_restore_btn";
			
			historydate.textContent = "일자";
			historyContents.textContent = "내용";
			
			options.appendChild(syncOption);
			options.appendChild(removeOption);
			options.appendChild(restoreOption);
			
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
			
			arrowBtn.addEventListener("click", function(){
				
				var classList = this.classList;
				
				if(classList.contains("active")){
					rightSideMenuContainer.style.right = "-300px"
					arrowWrapper.style.left = "-25px";
					classList.remove("active");
				} else{
					rightSideMenuContainer.style.right = "0";
					arrowWrapper.style.left = "-35px";
					classList.add("active");
				}
			});
		}
	}

    var rightSideMene = new UserRightSideMene();
    
    rightSideMene.init();
})();
