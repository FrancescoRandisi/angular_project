var app = angular.module('dgApp');

app.controller('indexCtrl', function($scope,$rootScope,Location) {
		
	$scope.test=function(){
		$scope.$emit('error'); 
	}
	
	$rootScope.$on('logout', function() {
		console.log("logged out");
		Location.path("/");
	});
	
	

	
});

