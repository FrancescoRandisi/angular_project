var widgetServices = angular.module('widgetServices', []);

widgetServices.factory('Location', function($location) {
	return {
		path: function(uri) {
			if (uri != undefined) {
				uriComponents = uri.split('/');
				for (var i=0; i<uriComponents.length; i++) {
					uriComponents[i] = encodeURIComponent(uriComponents[i]);
				}
				uri = uriComponents.join('/');
				return $location.path(uri);
			}
			else {
				return $location.path();
			}
		},
		getBreadCrumb:function() {
		
			if($location.path()=="/"){
				return [{title:"Home",
						href:"/"}];
			}
			
		
			var path = $location.path().split('/');
			for (var i=0; i<path.length; i++) {
					var title,href;
					if(path[i]==""){
						title="Home";
						href="";
					}
					else{
						title=path[i];
						href=path[i];
					}
					path[i] = {	title:title,
								href:"/"+href
								};
				}
			return path;
		}
		
		
	}
});


widgetServices.factory('WidgetConfigurator', function($http,$q) {
	var widgetConfigurator = {}
	
	
	widgetConfigurator.getAppLogoConfiguration = function() {
		var deferred = $q.defer();
    
		$http.get('widgets/configurations/appLogoConfiguration.json',
		{
			transformResponse: function (data, headersGetter) {
				try {
					var jsonObject = JSON.parse(data); // verify that json is valid
					return jsonObject;
				}
				catch (e) {
					console.log("did not receive a valid Json: " + e);
				}
				return {};
			}
		}
		
		)
		.success(function(data) {
                deferred.resolve(data);
            })
		.error(function(data,status){
			deferred.reject(data);
			console.log("error in the request: " + status);
		});
		 
		  return deferred.promise;
			
	}
	
	widgetConfigurator.getLeftMenuConfiguration = function() {
		var deferred = $q.defer();
    
		$http.get('widgets/configurations/leftMenuConfiguration.json',
		{
			transformResponse: function (data, headersGetter) {
				try {
					var jsonObject = JSON.parse(data); // verify that json is valid
					return jsonObject;
				}
				catch (e) {
					console.log("did not receive a valid Json: " + e);
				}
				return {};
			}
		}
		
		)
		.success(function(data) {
                deferred.resolve(data);
            })
		.error(function(data,status){
			deferred.reject(data);
			console.log("error in the request: " + status);
		});
		
		 
		  return deferred.promise;
			
	}

	
	widgetConfigurator.getTopMenuConfiguration = function() {
		var deferred = $q.defer();
    
		$http.get('widgets/configurations/topMenuConfiguration.json',
		{
			transformResponse: function (data, headersGetter) {
				try {
					var jsonObject = JSON.parse(data); // verify that json is valid
					return jsonObject;
				}
				catch (e) {
					console.log("did not receive a valid Json: " + e);
				}
				return {};
			}
		}
		
		)
		.success(function(data) {
                deferred.resolve(data);
            })
		.error(function(data,status){
			deferred.reject(data);
			console.log("error in the request: " + status);
		});
		
		 
		  return deferred.promise;
			
	}
	
	return widgetConfigurator;
	

});