var widgetServices = angular.module('widgetServices', [ 'utils','services' ]);


widgetServices.factory('WidgetConfigurator', function(AjaxRequest,multiLanguage) {
	var widgetConfigurator = {}

	widgetConfigurator.getSessionMananagerConfiguration = function(callback,error) {
		var url = 'fakeJsonAnswers/configurations/sessionManagerConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getAppLogoConfiguration = function(callback, error) {
		var url = 'fakeJsonAnswers/configurations/appLogoConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getLeftMenuConfiguration = function(callback, error) {
		var url = 'fakeJsonAnswers/configurations/leftMenuConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getTopMenuConfiguration = function(callback, error) {
		var url = 'fakeJsonAnswers/configurations/topMenuConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getlangSelectorConfiguration = function(callback, error) {
		var data={};
		data.items = multiLanguage.getSupportedLanguage();
		data.current = multiLanguage.getCurrentLanguage();
		callback(data);
	}
	
	return widgetConfigurator;

});
