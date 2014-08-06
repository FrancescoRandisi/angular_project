var widgetServices = angular.module('widgetServices', [ 'utils' ]);

widgetServices.factory('Location', function($location) {
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

	return widgetConfigurator;

});
