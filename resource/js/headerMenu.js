var UserHeaderMenu = function() {

	this.userNm = null;
	
	if(UserHeaderMenu.hasNotPrototype(UserHeaderMenu,"init")){
		
		UserHeaderMenu.prototype.init = function(userNm) {
			
			this.userNm = userNm;

			var sideMenuContainer = document.createElement('div');
			var bodyEl = document.getElementsByTagName('body')[0];

			sideMenuContainer.className = "user_header_menu";

			bodyEl.appendChild(sideMenuContainer);

		}
		
	}
	
}