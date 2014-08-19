var app = angular.module('dgApp', [ 'widgets', 'services', 'ngRoute','globalDirectives' ]);

app.config([ '$routeProvider', function($routeProvider) {
	var pages = conf.pages;
	
	for (i in pages){
		$routeProvider.when(pages[i].url, {
			templateUrl : pages[i].templateUrl,
			resolve: {
                 factory: function ($location,SessionManagement) {
             		if(pages[i].authorized && !SessionManagement.isLogged()){
            			$location.path("/");
            		}
            		 		
            	}
             }
		})
	}
	
	
	
	$routeProvider.otherwise({
		redirectTo : '/'
	});
	
} ]);

