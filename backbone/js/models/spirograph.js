var app = app || {};

app.Spirograph = Backbone.Model.extend({

	// the default settings for the spirograph
	defaults: {

		// 1-1 map with input fields
		innerCircleSizePercentage: 50,
		pointFromCenterPercentage: 50,
		speed: 150,
		lineThickness: 1,
		lineTransparency: 0.5,
		lineColorHex: "#0044cc",

		// the selected tab
		currTab: "general",

		// calculated and populated automatically when needed for computation
		lineColor: {
			r: 50,
			g: 150,
			b: 255
		},
		outerRadiusInPixels: null,
		innerRadiusInPixels: null,
		pointFromCenterInPixels: null
	},

	// prevents sending Model changes server-side [will add in local storage later]
	sync: function() { return false; }

});