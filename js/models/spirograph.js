var app = app || {};

app.Spirograph = Backbone.Model.extend({

	// the default settings for the spirograph
	defaults: {
		outerRadius: 250,
		innerRadius: 182,
		penPoint: 182,
		speed: 100,
		animate: true,
		showBorders: false
	},

	// prevents sending Model changes server-side
	sync: function() { return false; }

});