var UserCookieUtil = function() {

	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "init")) {
		
		UserCookieUtil.prototype.init = function(prefixNm, mode, exdays, exceptionCookieArr) {

			initProperties(prefixNm, mode, exdays, exceptionCookieArr);

		}
		
	}

	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "readAllOfSearchedCookies")) {
		
		UserCookieUtil.prototype.readAllOfSearchedCookies = function() {
			
			var pairs = document.cookie.split(";");
			var cookies = {};

			for (var i = 0; i < pairs.length; i++) {
				var pair = pairs[i].split("=");
				if (pair[0].indexOf(this.prefixNm) > -1) {
					cookies[pair[0].trim()] = unescape(pair[1]);
				}
			}

			return cookies;
			
		}
		
	}
	
	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "readCookieValueByName")) {
		
		UserCookieUtil.prototype.readCookieValueByName = function(cookieNm) {

			var cookieArr = document.cookie.split(';');
			var tempCookie = null;
			var tempData = null;
			var tempCookieNm = null;

			if (this.mode === "prefixMode") {
				cookieNm = this.prefixNm + cookieNm;
			}

			for (var ix = cookieArr.length; ix--;) {
				tempCookie = cookieArr[ix];
				tempData = tempCookie.split("=");

				if (tempData.length > 1) {
					tempCookieNm = tempData[0].trim();
					if (tempCookieNm === cookieNm) {
						return tempData[1];
					}
				}
			}

			return null;
		}
		
	}

	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "saveCookie")) {
		
		UserCookieUtil.prototype.saveCookie = function(cookieNm, savedValue, exdays) {
	
			var today = new Date();
			var cookieTxt = null;
	
			if (this.mode === "prefixMode") {
				cookieNm = this.prefixNm + cookieNm;
			}
	
			exdays = exdays || this.exdays;
	
			if (exdays) {
	
				today.setTime(today.getTime() + (exdays * 24 * 60 * 60 * 1000));
	
				cookieTxt = escape(cookieNm) + "=" + savedValue + ";expires="
						+ today.toUTCString() + ";path=/";
	
			} else {
				cookieTxt = escape(cookieNm) + "=" + savedValue + ";" + ";path=/";
			}
	
			document.cookie = cookieTxt;
	
		}
		
	}

	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "removeCookie")) {
		
		UserCookieUtil.prototype.removeCookie = function(cookieNm) {
			
			var today = new Date();
			var expires = null;
			var exceptionCookieArr = this.exceptionCookieArr;
	
			if (exceptionCookieArr && exceptionCookieArr.length > 0) {
				for (var ix = 0, ixLen = exceptionCookieArr.length; ix < ixLen; ix++) {
					if (cookieNm.indexOf(exceptionCookieArr[ix]) > -1) {
						return;
					}
				}
			}
	
			if (cookieNm.indexOf(this.prefixNm) === -1) {
				cookieNm = this.prefixNm + cookieNm;
			}
	
			today.setTime(today.getTime())
			expires = "expires=" + today.toUTCString();
			document.cookie = cookieNm + "=;" + expires + ";path=/";
			
		}
		
	}
	
	if (UserCookieUtil.hasNotPrototype(UserCookieUtil, "removeAllCookie")) {
		
		UserCookieUtil.prototype.removeAllCookie = function() {
			
			var cookies = this.readAllOfSearchedCookies();
			var cookieNmList = Object.keys(cookies);
			
			for (var ix = 0, ixLen = cookieNmList.length; ix < ixLen; ix++) {
				this.removeCookie(cookieNmList[ix]);
			}
			
		}
		
	}

	var initProperties = function(prefixNm, mode, exdays, exceptionCookieArr) {
		
		Object.defineProperty(UserCookieUtil, 'prefixNm', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : prefixNm
		})
		
		Object.defineProperty(UserCookieUtil, 'mode', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : mode
		})
		
		Object.defineProperty(UserCookieUtil, 'exdays', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : exdays || 0
		})
		
		Object.defineProperty(UserCookieUtil, 'exceptionCookieArr', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : exceptionCookieArr
		})
	}
	
}