(function() {

	var UserWorkingHistory = function() {

		var owner = {};

		if (UserWorkingHistory.hasNotPrototype(UserWorkingHistory, "init")) {

			UserWorkingHistory.prototype.init = function(userNm, history) {

				initProperties(userNm, history);

			}

		}

		if (UserWorkingHistory
				.hasNotPrototype(UserWorkingHistory, "getHistory")) {

			UserWorkingHistory.prototype.getHistory = function() {

				return owner.history;
			}

		}

		var addHistory = function(eventNm) {

			if (owner == null || owner.history == null) {
				errorLog("Default object is not completed, Please call init Method.");
				return false;
			}

			var fullDate = getNow();

			owner.history[fullDate] = eventNm;

		}

		var removeHistory = function(eventNm) {

			if (owner == null || owner.history == null) {
				errorLog("Default object is not completed, Please call init Method.");
				return false;
			}

			var fullDate = getNow();

			owner.history[fullDate] = eventNm;

		}

		var initProperties = function(userNm, history) {

			owner.userNm = userNm;

			if (history == null) {
				owner.history = {};
			} else {
				owner.history = history;
			}

		}

	}
	
	var workingHistory = new UserWorkingHistory();
	
	
	
})();
