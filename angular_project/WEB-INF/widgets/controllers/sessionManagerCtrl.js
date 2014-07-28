angular.module('widgets').controller('sessionManagerCtrl', function ($scope) {
/*
		var promise = WidgetConfigurator.getLeftMenuConfiguration();
		promise.then(function(data) {
			$scope.leftMenuItems = data.items;
		});
		*/
		$scope.logged=true;
		$scope.user="Francesco Randisi";
		$scope.modalLoginVisible=false;
		
		$scope.logout=function(){
			$scope.logged=false;
			$scope.user="";
		}
		
		$scope.openLoginModal=function(){
			$scope.modalLoginVisible=true;
			$scope.userName="";
			$scope.password="";
		}
		$scope.close=function(){
			$scope.modalLoginVisible=false;
		}
		
		$scope.login=function(){
			$scope.logged=true;
			$scope.modalLoginVisible=false;
			$scope.user=$scope.userName;
		}
});
