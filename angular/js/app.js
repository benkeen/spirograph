'use strict';

var spirographApp = angular.module('spirographApp', []);


spirographApp.controller("spiroController", function($scope) {
	$scope.init = function() {

		// spirographs can be added either programmatically by create()'ing on the spirograph
		// collection, or by the user when they click the Add>> button
		//this.listenTo(app.Spirographs, 'add', this.addSpirograph);

//		Backbone.on("spirograph:removed", function() {
//			this.onResize();
//		}, this);
//


//		Backbone.on("spirograph:add", function() {
//			app.Spirographs.create();
//			this.onResize();
//		}, this);

		/*
		app.Spirographs.create({
			speed: 50,
			pointFromCenterPercentage: 20,
			innerCircleSizePercentage: 20,
			lineColorHex: "#007bc9"
		});
		app.Spirographs.create({
			speed: 80,
			pointFromCenterPercentage: 50,
			innerCircleSizePercentage: 50,
			lineTransparency: 0.2,
			lineColorHex: "#10ad00"
		});
		app.Spirographs.create({
			speed: 250,
			pointFromCenterPercentage: 88,
			innerCircleSizePercentage: 60,
			lineThickness: 1,
			lineColorHex: "#bf0404"
		});

		this.onResize();
		var currView = this;
		$(window).on("resize", function() {
			currView.onResize();
		});

		// if the query string contains #autorun, pub the drawAll event
		if (window.location.href.match(/#/)) {
			var hash = window.location.href.split("#")[1].replace(/^t/, "");
			if (hash === "autorun") {
				Backbone.trigger("spirograph:drawAll");
			}
		}
		*/
	};

	$scope.addSpirograph = function(spirograph) {

//		var view = new app.SpirographView({ model: spirograph });
//
//		$('#spirographs').append(view.render().el);
	};


});