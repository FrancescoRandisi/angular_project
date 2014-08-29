angular.module('widgets').controller('langSelectorCtrl', function ($rootScope,$scope,WidgetConfigurator,multiLanguage) {
	
	$scope.langItems = [];
	$scope.current = {};

	var callback = function(data) {
		$scope.langItems = data.items;
		$scope.current = data.current;
	};
	
	WidgetConfigurator.getlangSelectorConfiguration(callback,null);
		
	$scope.changeLang=function(lang){
		multiLanguage.setCurrentLanguage(lang,$scope);
	}	
		
	$rootScope.$on('langChange', function(e, lang) {$scope.current=lang;});
});
