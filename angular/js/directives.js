'use strict';


spirographApp.directive("drawall", function() {
	return {
		restrict: "A",
		link: function(scope, element) {
			element.on("click", function() {
				//ng.$rootScope.$broadcast("spirograph:drawAll")
			});
		}
	}
});

spirographApp.directive("addspirograph", function() {
	return {
		restrict: "A",
		link: function(scope, element) {
			element.on("click", function() {
				//ng.$rootScope.$broadcast("spirograph:add")
			});
		}
	}
});