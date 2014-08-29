var services = angular.module('services', [ 'utils' ]);

/*******************************************************************************
 * multiLanguage * ****************
 * 
 * the service provide translation services
 * 
 */

services.factory('multiLanguage', function(AjaxRequest,SessionManagement) {
	var languageServices = {}

	// set the local reference to the dictionary object
	languageServices.dictionaries = {};

	// get reference to the list of supported language
	languageServices.supportedLang = conf.languages;
	
	languageServices.currentLang=null;

	var callback= function(data){
		console.log("default language set to "+languageServices.currentLang.label);
		languageServices.dictionaries[languageServices.currentLang.value]=data;
	};
	
	languageServices.currentLang=SessionManagement.getSessionValue("lang");
	
	if(!languageServices.currentLang){
		languageServices.currentLang = conf.languages[0];
	}
	
	var url= 'fakeJsonAnswers/lang/lang_'+languageServices.currentLang.value+'.json';
	AjaxRequest.getJSON(url,callback, null);
	
	
	languageServices.getSupportedLanguage = function() {
		return this.supportedLang;
	}

	

	languageServices.setCurrentLanguage = function(language,scope) {
		if(language==this.currentLang){
			console.log("language "+ language.label);
			return;
		}
		
		if(!this.dictionaries[language.value]){
			var url= 'fakeJsonAnswers/lang/lang_'+language.value+'.json';	
			AjaxRequest.getJSON(url, function(data){
				console.log("retrieved dictionary for "+language.label);
				languageServices.dictionaries[language.value]=data;
				languageServices.currentLang=language;
				scope.$emit('langChange',language); 
				SessionManagement.setSessionValue("lang",language);
			}, function(){
				console.log("no dictionary for "+language.label);
				languageServices.setCurrentLanguage(languageServices.currentLang,scope);
			});
		}
		else{
			languageServices.currentLang=language;
			SessionManagement.setSessionValue("lang",language);
			scope.$emit('langChange',language); 
			console.log("set "+language.label+" language");
		}
	}

	languageServices.getCurrentLanguage = function() {
		return this.currentLang;
	}

	languageServices.getString = function(key) {

		return this.getResource(key, 'strings');

	}

	
	languageServices.getError = function(key) {

		return this.getResource(key, 'errors');

	}
	
	languageServices.getResource = function(key, type) {

		// if there is no value associated return -
		if (!this.dictionaries[this.currentLang.value][type][key]) {
			return '-';
		}
		
		return this.dictionaries[this.currentLang.value][type][key];

	}

	return languageServices;

});

services.factory('SessionManagement', function(AjaxRequest) {
	var sessionService = {};

	sessionService.storage = localStorage;
	sessionService.type = "local";
	sessionService.sessionObjKey = "dg";

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
		var sessionObj = this.getSessionObject(this.sessionObjKey);
		if(sessionObj){
			return sessionObj[key];
		}
		else{
			return null;
		}
		
		
	};
	
	sessionService.deleteSession = function() {
		this.storage.removeItem(this.sessionObjKey);
	};
	
	sessionService.login = function(userName, password, callback) {
		var url = "fakeJsonAnswers/configurations/fakeLoginAnswer.json";
		var parameter = {
			userName : userName,
			password : password
		}
		AjaxRequest.get(url, parameter, callback, null);
	};
	sessionService.logout = function(callback) {
		var url = "fakeJsonAnswers/configurations/fakeLoginAnswer.json";
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

services.factory('ContentManager', function(AjaxRequest,multiLanguage) {
	var contentManager = {};

	contentManager.getContent = function(pageName, callback,error) {
		var currentLang=multiLanguage.getCurrentLanguage();
		var url = "fakeJsonAnswers/pagesContentent/"+pageName+"_"+currentLang.value+".json";
		AjaxRequest.getJSON(url, callback, error);
	};
	

	return contentManager;

});

