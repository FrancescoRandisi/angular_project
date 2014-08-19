var widget = angular.module('widgets', ['services','widgetServices','widgetFilters']);
/* Menu Bar Directive */
widget.directive('dgtradeLeftMenu', function() {
	return {
		restrict : 'AE',
		replace: true,
		templateUrl : 'widgets/html/dgTradeLeftMenu.html'
	}

});

widget.directive('dgtradeBreadcrumb', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTradeBreadcrumb.html'
	}

});

widget.directive('dgtradeTopMenu', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTopMenu.html'
	}

});

widget.directive('dgtradeSessionManager', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTradeSessionManager.html'
	}

});

widget.directive('dgtradeLangSelector', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTradeLangSelector.html'
	}

});

widget.directive('dgtradeAppLogo', function() {
	return {
		restrict : 'EA',
		replace: true,
		templateUrl : 'widgets/html/dgTradeAppLogo.html'
	}

});


/*Error Message Directive*/
widget.directive('dgtradeErrorMessage', function() {
	return {
		scope:{},
		restrict : 'EA',
		templateUrl : 'widgets/html/dgTradeErrorMessage.html'
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



