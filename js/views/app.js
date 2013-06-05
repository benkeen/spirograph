var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#spirographs",

	initialize: function() {
		this.listenTo(app.Spirographs, 'add', this.addSpirograph);
		app.Spirographs.create();
		app.Spirographs.create();

		//app.SpirographList.fetch();
	},

	events: {

	},

	render: function() {

	},

	addSpirograph: function(spirograph) {
		var view = new app.SpirographView({ model: spirograph });
		$('#spirographs').append( view.render().el );
	}
});
