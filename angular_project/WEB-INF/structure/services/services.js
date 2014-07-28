var services = angular.module('services', []);

/*****************
 * multiLanguage * 
 *****************
 * 
 * the service provide translation services
 * 
 */

services.factory('multiLanguage', function() {
	var languageServices = {}

	//set the local reference to the dictionary object
	languageServices.dictionary = lang;

	//get reference to the list of supported language
	languageServices.supportedLang = lang.languages;
	
	languageServices.currentLang = languageServices.supportedLang[0];

	/***********************
	 * getSupportedLanguage* 
	 ***********************
	 * return the list of the supported language
	 * 
	 * RETURN:  [object] = object containing the list of supported
	 * 					   languages
	 */
	languageServices.getSupportedLanguage = function() {
		return this.supportedLang;
	}

	/**********************
	 * setCurrentLanguage * 
	 **********************
	 * set the current language
	 * 
	 * PARAMS:  lang[string] = id of the language to be set
	 * 
	 */
	languageServices.setCurrentLanguage = function(lang) {
		for(var index in this.supportedLang){
			if(this.supportedLang[index].id==lang){
				this.currentLang=this.supportedLang[index];
				return;
			}
				
		}
		
	}
	
	/**********************
	 * getCurrentLanguage * 
	 **********************
	 * return the current language
	 * 
	 * RETURN:  [object] = object containing the id and description
	 * 					   of the current language set
	 * 
	 */
	languageServices.getCurrentLanguage = function() {
		return this.currentLang;
	}

	/*************
	 * getString * 
	 *************
	 * look for the value of related key accordingly with the 
	 * current language
	 * 
	 * PARAMS:  key[string] = string name
	 * RETURN:     [string] = string associated with the 
	 * 						  key value and the current language					 
	 * 
	 */
	languageServices.getString = function(key) {

		return this.getResource(key, 'strings');

	}
	
	/*************
	 * getError * 
	 *************
	 * look for the value of related key accordingly with the 
	 * current language
	 * 
	 * PARAMS: 	key[string] = string name
	 * RETURN: 	   [string] = string associated with the 
	 * 						  key value and the current language					 
	 * 
	 */
	languageServices.getError = function(key) {

		return this.getResource(key, 'errorMessage');

	}
	/***************
	 * getResource * 
	 ***************
	 * return the proper string value in relation with the type and key
	 * 
	 * PARAMS: 	key[string] = string name
	 * 		   type[string] = type of the resource
	 * RETURN: 	   [string] = string associated with the 
	 * 						  key value,type and current language					 
	 * 
	 */
	languageServices.getResource = function(key,type) {

		//if there is no value associated return -
		if (!this.dictionary[type][key]) {
			return '-';
		}
		if (!this.dictionary[type][key][this.currentLang.id]) {
		//if there is no translation for the language we fall back to english
			return this.dictionary[type][key]['EN'];
		}
		return this.dictionary[type][key][this.currentLang.id];

	}

	return languageServices;

});

// Manage the current session and the traveling session :
// there is the user name, the lang, the user token, the travelingSession
services.factory('sessionManagement', function(Login, $q) {
	var sessionService = {};

    // Two function to manage the get/set in the session and local storage
    sessionService.setObject = function(storage, key, value) {
        eval(storage).setItem(key, JSON.stringify(value));
    };
    sessionService.getObject = function(storage, key) {
        var value = eval(storage).getItem(key);
        return value && JSON.parse(value);
    };

    // Init the session and return if the process went well
    sessionService.init = function() {
        var delay = $q.defer();
        // init the session
        this.setObject('sessionStorage', 'tvxSession', this.getObject('sessionStorage', 'tvxSession') || {});
        // if there is no remember me or if the user is already logged
        if(!localStorage.tvxRemember || this.getObject('sessionStorage', 'tvxSession')['userId']) {
            delay.resolve(true);
        } else { // else request the server with the remember me value
            Login.loginWithTravelingSession(this.getObject('localStorage', 'tvxRemember')['travelingSession'], function(data) {
                if(data.success) {
                    sessionService.login(sessionService.getObject('localStorage', 'tvxRemember')['userId'], data.userAccessToken);
                    delay.resolve(true);
                } else {
                    delay.reject(false);
                }
            });
        }
        return delay.promise;
    };

    // Add value to the session storage
	sessionService.write = function(key, value) {
        var sessionValue = this.getObject('sessionStorage', 'tvxSession');
        sessionValue[key] = value;
        this.setObject('sessionStorage', 'tvxSession', sessionValue);
	};

    // Call the write function
	sessionService.setSessionValue = function(key, value) {
		this.write(key, value);
	};

    // Retrive the key session value
	sessionService.getSessionValue = function(key) {
        return this.getObject('sessionStorage', 'tvxSession')[key];
	};

    // Log the user by setting the session values
    // Set the traveling session there is a travelling session value received
	sessionService.login = function(userId, token, travelingSession) {
        var travelingSession = travelingSession || '';
		this.setSessionValue('userId', userId);
        this.setSessionValue('userAccessToken', token);

        // if travelingSession is present, then set a remenber storage
        if(travelingSession != '') {
            this.setObject('localStorage', 'tvxRemember', { 'userId': userId, 'travelingSession': travelingSession });
        }
	};

    // Unset the user session values and the remember storage values,
    // exept the lang session
	sessionService.logout = function() {
        var tvxSession = this.getObject('sessionStorage', 'tvxSession');
        var tvxReport = this.getObject('sessionStorage', 'tvxReport');
        sessionStorage.clear();
        localStorage.clear();
        this.setObject('sessionStorage', 'tvxSession', { 'lang': tvxSession['lang'] });
        this.setObject('sessionStorage', 'tvxReport', tvxReport);
	};

    // Return true if the user is logged
    sessionService.isLogged = function() {
        return this.getObject('sessionStorage', 'tvxSession')['userId'] != undefined;
    };

	return sessionService;

});

