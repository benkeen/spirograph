var app = app || {};

app.SpirographList = Backbone.Collection.extend({
	model: app.Spirograph
});

app.Spirographs = new app.SpirographList();