var app = app || {};

app.spirographSettings = new Backbone.View.extend({
	tagName: "div",
	template: _.template($('#settings-template').html()),

	render: function() {
		this.$el.html(this.model.toJSON());
		return this;
	}
});
