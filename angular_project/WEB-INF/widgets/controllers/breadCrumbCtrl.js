angular.module('widgets').controller('breadcrumbCtrl', function ($scope,$rootScope,Location) {

    	$scope.bcItems = [ 
			{
				title: "Home", 
				href:"/"
			}
		];

		$scope.show = function(path) {
            Location.path(path);
        }
	
		
		  $rootScope.$on('$routeChangeSuccess', function() {
			var path = Location.getBreadCrumb();
			$scope.bcItems=path;
		});

});
