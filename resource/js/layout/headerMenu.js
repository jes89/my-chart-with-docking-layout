
(function(){
	var UserHeaderMenu = (function() {
		
		var UserHeaderMenu = function(){}
		
		
		UserHeaderMenu.prototype.init = function(settingInfo) {
			initLayout(settingInfo);
		}
		
		var initLayout = function(settingInfo){
			
			var headerContainer = document.createElement("div");
			var rootContainer = comm.getElById("rootContainer");
			
			headerContainer.id = "header";
			
			headerContainer.className = "header";

			rootContainer.appendChild(headerContainer);
			
			initUserOptions(headerContainer, settingInfo.userOptions);
		}
		
		var initUserOptions = function(headerContainer,userOptions){
			
			var userOptionsWrap = document.createElement("ul");
			var tempOption = null;
			var chartNm = null;
			
			for(var ix = 0, ixLen = userOptions.length; ix < ixLen; ix ++){
				
				chartNm = userOptions[ix];
				
				tempOption = document.createElement("li");
				
				tempOption.className = userOptions[ix];
				tempOption.textContent = chartNm
				
				tempOption.setAttribute("data-type", chartNm);
				
				userOptionsWrap.appendChild(tempOption);
				
				addDragStartEvt(tempOption);
			}
			
			headerContainer.appendChild(userOptionsWrap);
		}
		
		var addDragStartEvt = function(chartOption){
			
			chartOption.draggable = true;
			
			chartOption.addEventListener("dragstart", function(){
				event.dataTransfer.setData("event-type", "draw");
				event.dataTransfer.setData("chart-type", this.getAttribute("data-type"));
			});
			
		}
		
		return UserHeaderMenu;
		
	})();
	
    var headerMenu = new UserHeaderMenu();
    
    var settingInfo = {
    		userOptions : [
							"ballChart"		,
							"scatterChart"	,
							"sectionChart"	,
							"pieChart"		,
							"lineChart"		,
							"barChart"		,
							"tableChart"	,
							"historyChart"
						]
    }
    
    headerMenu.init(settingInfo);
})();
