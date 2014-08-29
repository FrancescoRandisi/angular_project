angular.module('widgets').controller('errorMessageCtrl', function ($scope,$rootScope,multiLanguage) {

		$scope.visible=false;
		$scope.message="";
		$scope.errors=[];
		
		$rootScope.$on('error', function(data,errorCode) {
			var error = multiLanguage.getError(errorCode[0]);
			error.id=errorCode[0];
			$scope.visible=true;
			$scope.errors.push(error);
		});
	
		$scope.close=function(id) {
			
			
			for (var index in $scope.errors){
				if($scope.errors[index].id==id){
					$scope.errors.splice(index,1);
				}
			}
			if($scope.errors.length==0){
				$scope.visible=false;
			}
		};
	
});
