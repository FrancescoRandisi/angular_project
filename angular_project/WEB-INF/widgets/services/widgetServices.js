var widgetServices = angular.module('widgetServices', [ 'utils' ]);


widgetServices.factory('WidgetConfigurator', function(AjaxRequest) {
	var widgetConfigurator = {}

	widgetConfigurator.getSessionMananagerConfiguration = function(callback,error) {
		var url = 'widgets/configurations/sessionManagerConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getAppLogoConfiguration = function(callback, error) {
		var url = 'widgets/configurations/appLogoConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getLeftMenuConfiguration = function(callback, error) {
		var url = 'widgets/configurations/leftMenuConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getTopMenuConfiguration = function(callback, error) {
		var url = 'widgets/configurations/topMenuConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}

	widgetConfigurator.getlangSelectorConfiguration = function(callback, error) {
		var url = 'widgets/configurations/langSelectorConfiguration.json';
		AjaxRequest.getJSON(url, callback, error);
	}
	
	return widgetConfigurator;

});
