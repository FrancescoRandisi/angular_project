angular.module('widgetFilters', []).filter('authorizedElem', function() {
  return function(elements,logged) {
	  if(!elements){return;}
	  
	  return elements.filter(function(elem) {
		  
		  if(elem.authorized&&!logged){
			  return false;
		  }
          
          return true;

      });
  }
 
});