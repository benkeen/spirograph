var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#spirographs",

	initialize: function() {
		this.listenTo(app.Spirographs, 'add', this.addSpirograph);

		app.Spirographs.create();
		app.Spirographs.create();
		app.Spirographs.create();

		this.onResize();
		var currView = this;
		$(window).on("resize", function() {
			currView.onResize();
		});
	},

	// sigh... oh flexbox, when will you be better supported?
	onResize: function() {
		var width = $(document).width() - 20; // 20 = padding
		var liWidth = width / 3;
		$("#spirographs>li").css("width", liWidth);

		var settingsHeight = $($("#spirographs .well")[0]).height();
		var height = $(document).height() - 110 - settingsHeight;
		$(".canvasWrapper").css("height", height);

		var canvasWrapperWidth = $($(".canvasWrapper")[0]).width();
		if (height > canvasWrapperWidth) {
			$("canvas").height(canvasWrapperWidth);
		} else {
			$("canvas").width(height);
		}

		// important!!!!
		//this.trigger("window:resize");
	},

	addSpirograph: function(spirograph) {
		var view = new app.SpirographView({ model: spirograph });
		$('#spirographs').append(view.render().el);
	}
});

























