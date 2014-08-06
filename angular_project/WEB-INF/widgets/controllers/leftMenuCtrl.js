angular.module('widgets').controller('leftMenuCtrl', function ($scope,Location,WidgetConfigurator) {

		var callback = function(data) {
			$scope.leftMenuItems = data.items;
		}
		WidgetConfigurator.getLeftMenuConfiguration(callback);
		
	
		$scope.show = function(path) {
            Location.path(path);
        }
	
});
