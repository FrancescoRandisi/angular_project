var services = angular.module('services', [ 'utils' ]);

/*******************************************************************************
 * multiLanguage * ****************
 * 
 * the service provide translation services
 * 
 */

services.factory('multiLanguage', function() {
	var languageServices = {}

	// set the local reference to the dictionary object
	languageServices.dictionary = lang;

	// get reference to the list of supported language
	languageServices.supportedLang = lang.languages;

	languageServices.currentLang = languageServices.supportedLang[0];

	/***************************************************************************
	 * getSupportedLanguage* ********************** return the list of the
	 * supported language
	 * 
	 * RETURN: [object] = object containing the list of supported languages
	 */
	languageServices.getSupportedLanguage = function() {
		return this.supportedLang;
	}

	/***************************************************************************
	 * setCurrentLanguage * ********************* set the current language
	 * 
	 * PARAMS: lang[string] = id of the language to be set
	 * 
	 */
	languageServices.setCurrentLanguage = function(lang) {
		for ( var index in this.supportedLang) {
			if (this.supportedLang[index].id == lang) {
				this.currentLang = this.supportedLang[index];
				return;
			}

		}

	}

	/***************************************************************************
	 * getCurrentLanguage * ********************* return the current language
	 * 
	 * RETURN: [object] = object containing the id and description of the
	 * current language set
	 * 
	 */
	languageServices.getCurrentLanguage = function() {
		return this.currentLang;
	}

	/***************************************************************************
	 * getString * ************ look for the value of related key accordingly
	 * with the current language
	 * 
	 * PARAMS: key[string] = string name RETURN: [string] = string associated
	 * with the key value and the current language
	 * 
	 */
	languageServices.getString = function(key) {

		return this.getResource(key, 'strings');

	}

	/***************************************************************************
	 * getError * ************ look for the value of related key accordingly
	 * with the current language
	 * 
	 * PARAMS: key[string] = string name RETURN: [string] = string associated
	 * with the key value and the current language
	 * 
	 */
	languageServices.getError = function(key) {

		return this.getResource(key, 'errorMessage');

	}
	/***************************************************************************
	 * getResource * ************** return the proper string value in relation
	 * with the type and key
	 * 
	 * PARAMS: key[string] = string name type[string] = type of the resource
	 * RETURN: [string] = string associated with the key value,type and current
	 * language
	 * 
	 */
	languageServices.getResource = function(key, type) {

		// if there is no value associated return -
		if (!this.dictionary[type][key]) {
			return '-';
		}
		if (!this.dictionary[type][key][this.currentLang.id]) {
			// if there is no translation for the language we fall back to
			// english
			return this.dictionary[type][key]['EN'];
		}
		return this.dictionary[type][key][this.currentLang.id];

	}

	return languageServices;

});

services.factory('SessionManagement', function(AjaxRequest) {
	var sessionService = {};

	sessionService.storage = localStorage;
	sessionService.type = "local";
	sessionService.sessionObjKey = "dgTrade";

	// Two function to manage the get/set in the session and local storage
	sessionService.setObject = function(key, value) {
		this.storage.setItem(key, JSON.stringify(value));
	};
	sessionService.getSessionObject = function() {
		var value = this.storage.getItem(this.sessionObjKey);
		return JSON.parse(value);
	};

	// Add value to the session storage
	sessionService.setSessionValue = function(key, value) {
		var sessionValue = this.getSessionObject();
		if (!sessionValue) {
			sessionValue = {};
		}
		sessionValue[key] = value;
		this.setObject(this.sessionObjKey, sessionValue);
	};

	// Retrive the key session value
	sessionService.getSessionValue = function(key) {
		return this.getSessionObject(this.sessionObjKey)[key];
	};
	
	sessionService.deleteSession = function() {
		this.storage.removeItem(this.sessionObjKey);
	};
	
	sessionService.login = function(userName, password, callback) {
		var url = "widgets/configurations/fakeLoginAnswer.json";
		var parameter = {
			userName : userName,
			password : password
		}
		AjaxRequest.get(url, parameter, callback, null);
	};
	sessionService.logout = function(callback) {
		var url = "widgets/configurations/fakeLoginAnswer.json";
		var parameter = {};
		AjaxRequest.get(url, parameter, callback, null);
	};
	sessionService.isLogged = function() {
		var value = this.getSessionObject();
		return value != null;
	};

	return sessionService;

});


services.factory('Location', function($location) {
	return {
		path : function(uri) {
			if (uri != undefined) {
				uriComponents = uri.split('/');
				for ( var i = 0; i < uriComponents.length; i++) {
					uriComponents[i] = encodeURIComponent(uriComponents[i]);
				}
				uri = uriComponents.join('/');
				return $location.path(uri);
			} else {
				return $location.path();
			}
		},
		getBreadCrumb : function() {

			if ($location.path() == "/") {
				return [ {
					title : "Home",
					href : "/"
				} ];
			}

			var path = $location.path().split('/');
			for ( var i = 0; i < path.length; i++) {
				var title, href;
				if (path[i] == "") {
					title = "Home";
					href = "";
				} else {
					title = path[i];
					href = path[i];
				}
				path[i] = {
					title : title,
					href : "/" + href
				};
			}
			return path;
		}

	}
});
