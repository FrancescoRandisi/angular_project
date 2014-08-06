angular.module('widgets').controller('sessionManagerCtrl', function ($scope,SessionManagement,WidgetConfigurator) {

		$scope.logged=SessionManagement.isLogged();
		if($scope.logged){
			$scope.userName=SessionManagement.getSessionValue("userName");
			$scope.userID=SessionManagement.getSessionValue("userID");
		}
		
		$scope.modalLoginVisible=false;
		
		
		$scope.logout=function(){
			var callback = function(data) {
				if(data.success){
					$scope.logged=false;
					$scope.userID=null;
					$scope.userName=null;
					$scope.$emit('logout');
					SessionManagement.deleteSession();
				}
			}
			SessionManagement.logout(callback);
			
			
		
		}
		
		$scope.openLoginModal=function(){
			$scope.modalLoginVisible=true;
			$scope.userID="";
			$scope.password="";
		}
		$scope.close=function(){
			$scope.modalLoginVisible=false;
		}
		
		$scope.login=function(){
			
			var callback = function(data) {
				if(data.success){
					$scope.userName=data.userName;
					$scope.logged=true;
					$scope.close();
					$scope.$emit('login');
					SessionManagement.setSessionValue("userName",$scope.userName);
					SessionManagement.setSessionValue("userID",$scope.userID);
					
				}
			}
			SessionManagement.login($scope.userName,$scope.password,callback);
			
		}
		
		
});
