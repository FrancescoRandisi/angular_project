var app = angular.module('dgApp', ['widgets','services','ngRoute']);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
	 when('/', {
        templateUrl: 'pages/html/welcome.html'
      }).
      when('/first', {
        templateUrl: 'pages/html/first.html'
      }).
      when('/second', {
        templateUrl: 'pages/html/second.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);