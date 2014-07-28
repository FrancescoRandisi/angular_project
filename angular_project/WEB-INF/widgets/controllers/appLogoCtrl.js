angular.module('widgets').controller('appLogoCtrl', function ($scope,WidgetConfigurator) {
		
		var promise = WidgetConfigurator.getAppLogoConfiguration();
		promise.then(function(data) {
			$scope.appName = data.appName;
			$scope.appIcon = data.appIcon;
		});
		
		
});
