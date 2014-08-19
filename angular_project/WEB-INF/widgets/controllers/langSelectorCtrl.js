angular.module('widgets').controller('langSelectorCtrl', function ($scope,WidgetConfigurator) {
	
	$scope.langItems = [];
	$scope.current = {};

	var callback = function(data) {
		$scope.langItems = data.items;
		for(var i in data.items){
			if(data.items[i].default){
				$scope.current=data.items[i];
			};
		}
	};
	 WidgetConfigurator.getlangSelectorConfiguration(callback,null);
		
	$scope.changeLang=function(lang){
		$scope.current=lang;
	}	
		
});
