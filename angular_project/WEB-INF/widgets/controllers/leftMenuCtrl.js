angular.module('widgets').controller('leftMenuCtrl', function ($scope,Location,WidgetConfigurator) {

		var promise = WidgetConfigurator.getLeftMenuConfiguration();
		promise.then(function(data) {
			$scope.leftMenuItems = data.items;
		});
		
		$scope.show = function(path) {
            Location.path(path);
        }
	
});
