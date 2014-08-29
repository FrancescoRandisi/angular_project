var attributes = angular.module('globalDirectives', []);

attributes.directive('dgString', function(multiLanguage) {

	function executeStringSet(scope, elm, attrs) {
		var text = multiLanguage.getString(attrs.dgString);
		// util.updateNode(text, elm, attrs);
		elm.text(text);
	}

	return {

		link : function(scope, elm, attrs) {

			if (typeof (attrs.dgString) == 'undefined') {
				// if in the attribute we use a value coming from the
				// interpolation of a angularjs variable we have to observe the
				// value changes since when link function is executed the value
				// is not
				// yet parsed
				attrs.$observe('dgString', function() {
					executeStringSet(scope, elm, attrs);
				});
			} else {
				executeStringSet(scope, elm, attrs);
			}

		}
	}
});

attributes.directive('dgLang', function($rootScope, multiLanguage) {

	return {

		link : function(scope, elem, attrs) {
			$rootScope.$on('langChange', function(e, lang) {
				$("[dg-string]").each(function() {
					var key = this.attributes["dg-string"].value;
					$(this).text(multiLanguage.getString(key));
				});
				$('html').attr('lang',lang.value);
			});
		}
	}
});

attributes.directive('dgToglemenu', function() {

	return {

		link : function(scope, elem, attrs) {
			elem.on("click", function(e) {
				var currElem = $(this);
				var menu = currElem.closest(".menu");
				menu.toggleClass("selected");
				var subMenu = currElem.closest(".menu").find(".menuOptions");
				subMenu.toggle();

			});
		}
	}
});

/********************
 * dgAddAttributes * 
 ********************
 * add dinamically attributes to the html element, if the param is 
 * enclosed in {} then the value will be considered as a key to access the 
 * translationtion service and the related value will be replaced and dinamycally
 * managed accordingly with the language change
 * 
 * the attribute list follows this grammar
 * attribute=( { )value( } )[;attribute=( { )value( } )]*
 */

attributes.directive('dgAddAttributes', function(multiLanguage) {

	function buildAttributeList(elem, attrs) {
		//the attribute list is semi colon separated
		var attributeTemplateList = attrs.dgAddAttributes.split(';');
		//regex that match value between graphs
		var paramExp = new RegExp(/\{(.+?)\}/);

		for ( var k in attributeTemplateList) {
			//i split between attribute name and value
			var newAttribute = attributeTemplateList[k].split('=');
			if (newAttribute.length == 2) {
				var attributeName = $.trim(newAttribute[0]);
				var value = $.trim(newAttribute[1]);
				if (paramExp.test(value)) {
					while (match = paramExp.exec(value)) {
						//if the value has graphs it will be translated
						value = value.replace(match[0], multiLanguage
								.getString(match[1]));
					}

				}
				newAttribute = {
					'key' : attributeName,
					'value' : value
				}

			} else {
				newAttribute = {
					'key' : attributeName
				}
			}
			//the new attribute is added in the html element
			elem.attr(newAttribute.key, newAttribute.value);

		}
	}
	return {
		link : function(scope, elem, attrs) {

			if (typeof (attrs.dgAddAttributes) == 'undefined') {
				attrs.$observe('dgAddAttributes', function() {
					buildAttributeList(elem, attrs);
				});

			} else {
				buildAttributeList(elem, attrs);
			}

			scope.$on('langChanged', function(e, lang) {
				buildAttributeList(elem, attrs);
			})

		}
	}
});


/**************
 * dgOnEvent * 
 **************
 * gives the chance to bind event to functions. 
 * it can be used to bind specific or custom events to the angular's scope objects
 * and defined methods
 * the events and the handlers are specified as in the attribute accordingly with 
 * this semantic: event[,event]*:handler[|event[,event]*:handler]*
 * to identify an angular function the function name have to have this structure
 *  $.functionName, the function will be executed in the related scope
 */
attributes.directive('dgOnEvent', function() {
	
	//bind the event list and the handler to the html element
	function bindEvent(elem, event, handler, scope) {
		elem.bind(event, function(e) {
			//i separate the function name from the parameters
			var functionElem = handler.split('(');
			var functionName = functionElem[0];
			var functionParams = $.trim(functionElem[1]);
			if (functionParams == ")") {
				functionParams = [];
			} else {
				functionParams = functionParams.slice(0, -1);
				//the parameters are separated by comma
				functionParams = functionParams.split(',');
			}
			functionParams.push(e);

			util.executeFunctionByName(functionElem[0], functionParams,
					scope);

		});
	}
	//evaluate the event macro group
	function buildEventGroup(macroElem, elem, scope) {
		//the list of event are separated from the handler with the colon char
		var list = macroElem.split(':');
		var events = list[0];
		var handler = list[1];
		//the events are separated by space char
		var eventList = events.split(' ');

		for ( var k in eventList) {
			//i bind the events to the handler
			bindEvent(elem, eventList[k], handler, scope);
		}
	}

	//evaluate the attribute params passed 
	function evaluateAttribute(scope, elem, attrs) {
		//the list is first split into macro group accordingly with the 
		//handler applied each group is divided from the others with the pipe char
		var macroList = attrs.tvxOnEvent.split('|');
		for ( var k=0;k<macroList.length;k++) {
		//each macro section is then again parsed
			buildEventGroup(macroList[k], elem, scope);
		}

	}

	return {

		link : function(scope, elem, attrs) {

			if (typeof (attrs.dgOnEvent) == 'undefined') {
				attrs.$observe('dgOnEvent', function() {
					evaluateAttribute(scope, elem, attrs);
				});

			} else {
				evaluateAttribute(scope, elem, attrs);
			}

		}

	}

});

/********************
 * dgEnterkeyPress * 
 ********************
 * if enter is pressed on the element the click event is fired
 */
attributes.directive('dgEnterkeyPress', function() {
	return function(scope, elem, attrs) {
		elem.bind('keypress', function(e) {
			if (e.keyCode == '13') {
				elem.trigger('click');
			}
		});
	};
});


/****************
 * dgAutoFocus * 
 ****************
 * set the focus on the html element. 
 * it can be executed immediately or delayed accordingly
 * with the parameter passed
 */
attributes.directive('dgAutoFocus', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			if (attrs.dgAutoFocus == "true") {
				$timeout(function() {
					element.focus();
				}, 0);
			} else if (attrs.dgAutoFocus == "delayed") {
				$timeout(function() {
					element.focus();
				}, 300);
			}

			
		}
	}
});

