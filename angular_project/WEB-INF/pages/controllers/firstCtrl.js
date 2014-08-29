var app = angular.module('dgApp');

app.controller('firstCtrl', function($scope,$rootScope,ContentManager) {

	var callback=function(data){
		$scope.mainText=data.mainText;
		$scope.secondText= data.secondText;
	}
	var errorCallBack=function(error){
		$scope.mainText=$scope.secondText=null;
	}
	
	ContentManager.getContent("first",callback,errorCallBack);
	
	$rootScope.$on('langChange', function() {
		ContentManager.getContent("first",callback,errorCallBack);
	});
});

