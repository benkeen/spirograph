var app = app || {};

app.spirograph = new Backbone.Model.extend({

	// the default settings for the spirograph
	defaults: {
		outerRadius: 250,
		innerRadius: 182,
		penPoint: 182,
		showBorders: false
	}

});