var attributes = angular.module('globalDirectives',[]);

attributes.directive('dgtradeString', function(multiLanguage) {

	function executeStringSet(scope, elm, attrs) {
		var text = multiLanguage.getString(attrs.tvxString);
		util.updateNode(text, elm, attrs);
	}

	return {

		link : function(scope, elm, attrs) {

			if (typeof (attrs.tvxString) == 'undefined') {
				//if in the attribute we use a value coming from the
				// interpolation of a angularjs variable we have to observe the 
				//value changes since when link function is executed the value is not
				//yet parsed 
				attrs.$observe('dgTradeString', function() {
					executeStringSet(scope, elm, attrs);
				});
			} else {
				executeStringSet(scope, elm, attrs);
			}

			scope.$on('langChanged', function(e, lang) {
				executeStringSet(scope, elm, attrs);
			})

		}
	}
});


attributes.directive('dgtradeToglemenu', function() {

	
	
	return {

		link : function(scope,elem, attrs) {
			elem.on("click",function(e){
				var currElem=$(this);
				var menu = currElem.closest(".menu");
				menu.toggleClass("selected");
				var subMenu = currElem.closest(".menu").find(".menuOptions");
				subMenu.toggle();
				
			});
		}
	}
});