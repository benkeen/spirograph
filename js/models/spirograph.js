var app = app || {};

app.Spirograph = Backbone.Model.extend({

	// the default settings for the spirograph
	defaults: {
		innerRadius: 60,
		pointFromCenter: 50,
		speed: 100
	},

	// prevents sending Model changes server-side [will add in local storage later]
	sync: function() { return false; }

});