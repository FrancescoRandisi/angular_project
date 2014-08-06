angular.module('widgets').controller('appLogoCtrl', function ($scope,WidgetConfigurator) {
	
	var callback=function(data) {
		$scope.appName = data.appName;
		$scope.appIcon = data.appIcon;
	}
	 WidgetConfigurator.getAppLogoConfiguration(callback,null);
		
		
		
});
