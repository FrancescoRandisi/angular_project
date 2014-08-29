var widget = angular.module('widgets', ['services','widgetServices','widgetFilters']);
/* Menu Bar Directive */
widget.directive('dgLeftMenu', function() {
	return {
		restrict : 'AE',
		replace: true,
		templateUrl : 'widgets/html/dgLeftMenu.html'
	}

});

widget.directive('dgBreadcrumb', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgBreadcrumb.html'
	}

});

widget.directive('dgTopMenu', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTopMenu.html'
	}

});

widget.directive('dgSessionManager', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgSessionManager.html'
	}

});

widget.directive('dgLangSelector', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgLangSelector.html'
	}

});

widget.directive('dgAppLogo', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgAppLogo.html'
	}

});


/*Error Message Directive*/
widget.directive('dgErrorMessage', function() {
	return {
		scope:{},
		restrict : 'EA',
		templateUrl : 'widgets/html/dgErrorMessage.html'
	}

});
/*  Error Message Directive */

/* Authentication Directive
widget.directive('tvxUserAccountManager', function() {
	return {
		scope:{},
		restrict : 'EA',
		templateUrl : 'views/widgets/tvxUserAccountManager.html'
	}

});
/*  End Authentication Directive */



