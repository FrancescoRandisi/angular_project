angular.module('widgets').controller('topMenuCtrl', function ($scope,Location,WidgetConfigurator) {

		var callback = function(data) {
			$scope.topMenuItems = data.items;
		};
		
		WidgetConfigurator.getTopMenuConfiguration(callback);
	
		
		$scope.show = function(path) {
            Location.path(path);
        }
	
});
