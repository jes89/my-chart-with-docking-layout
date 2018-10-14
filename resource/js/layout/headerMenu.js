
(function(){
	var UserHeaderMenu = function() {
		
		
		
		this.init = function(settingInfo) {
			initLayout(settingInfo);
		}
		
		var initLayout = function(settingInfo){
			
			var headerContainer = document.createElement("div");
			var rootContainer = comm.getElById("rootContainer");
			
			headerContainer.className = "header";

			rootContainer.appendChild(headerContainer);
			
			initUserOptions(headerContainer, settingInfo.userOptions);
		}
		
		var initUserOptions = function(headerContainer,userOptions){
			
			var userOptionsWrap = document.createElement("ul");
			var tempOption = null;
			
			for(var ix = 0, ixLen = userOptions.length; ix < ixLen; ix ++){
				tempOption = document.createElement("li");
				
				tempOption.className = userOptions[ix];
				tempOption.textContent = userOptions[ix];
				
				userOptionsWrap.appendChild(tempOption);
			}
			
			headerContainer.appendChild(userOptionsWrap);
		}
		
	}
	
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
