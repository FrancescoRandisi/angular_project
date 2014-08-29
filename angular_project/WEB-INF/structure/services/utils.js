var utils = angular.module('utils', []);

utils.factory('AjaxRequest', function($http) {
	var ar = {};

	ar.getJSON = function(url,callback,error) {
	

		$http.get(url, {
			transformResponse : function(data, headersGetter) {
				try {
					var jsonObject = JSON.parse(data); // verify that json is
					// valid
					return jsonObject;
				} catch (e) {
					console.log("did not receive a valid Json: " + e);
				}
				return {};
			}
		}

		).success(function(data) {
			if(callback){
				console.log("received data for " +url);
				callback(data);
			}
		}).error(function(data, status) {
			if(error){error();}
			console.log("error in the request: " + status);
		});

		

	}
	
	
	ar.get=function(url,parameter,callback,error){
			
		$http({url: url,
			method: 'GET',
			params:parameter})
		.success(function(data) {
			if(callback){
				console.log("received data for " +url);
				callback(data);
			}
		})
		.error(function() {
			if(error){error();}
			
		}); 
	}

	return ar;

});
