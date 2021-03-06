app.NavBarView = Backbone.View.extend({
	el: "#navbar",

	events: {
		"click #drawAll": "drawAll",
		"click #addSpirograph": "addSpirograph"
	},

	drawAll: function(e) {
		e.preventDefault();
		Backbone.trigger("spirograph:drawAll");
	},

	addSpirograph: function(e) {
		e.preventDefault();
		Backbone.trigger("spirograph:add");
	}
});