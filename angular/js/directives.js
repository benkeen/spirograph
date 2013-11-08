'use strict';



spirographApp.directive("drawall", function() {
	return {
		restrict: "A",
		link: function(scope, element) {
			element.on("click", function() {
				console.log("DRAW ALL");
			});
		}
	}
});

spirographApp.directive("addspirograph", function() {
	return {
		restrict: "A",
		link: function(scope, element) {
			element.on("click", function() {
				console.log("ADD SPIROGRAPH");
			});
		}
	}
});