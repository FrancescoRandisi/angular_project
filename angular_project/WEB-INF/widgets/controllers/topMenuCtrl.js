angular.module('widgets').controller('topMenuCtrl',	function($scope, $rootScope, Location, WidgetConfigurator,SessionManagement) {
			$scope.isLogged = SessionManagement.isLogged();
			$scope.topMenuItems = [];

			var callback = function(data) {
				$scope.topMenuItems = data.items;
			};

			WidgetConfigurator.getTopMenuConfiguration(callback);

			$scope.show = function(path) {
				Location.path(path);
			}

			$rootScope.$on('login', function() {
				$scope.isLogged = true;
			});
			$rootScope.$on('logout', function() {
				$scope.isLogged = false;
			});

		});
