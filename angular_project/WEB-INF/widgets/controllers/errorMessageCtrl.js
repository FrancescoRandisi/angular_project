angular.module('widgets').controller('errorMessageCtrl', function ($scope,$rootScope,WidgetConfigurator) {
/*
		var promise = WidgetConfigurator.getLeftMenuConfiguration();
		promise.then(function(data) {
			$scope.leftMenuItems = data.items;
		});
	*/	
		$scope.visible=false;
		$scope.message="";
		
		$rootScope.$on('error', function(data) {
		
		   $scope.visible=true;
		   $scope.errorType="danger";
		   $scope.message="errore";
		});
	
		$scope.close=function(data) {
		   $scope.visible=false;
		};
	
});
