angular.module('widgets').controller('topMenuCtrl', function ($scope,Location,WidgetConfigurator) {

		var promise = WidgetConfigurator.getTopMenuConfiguration();
		promise.then(function(data) {
			$scope.topMenuItems = data.items;
		});
		
		$scope.show = function(path) {
            Location.path(path);
        }
	
});
