var app = angular.module('dgApp');

app.controller('indexCtrl', function($scope) {
		
	$scope.test=function(){
		$scope.$emit('error'); 
	}
	
});

