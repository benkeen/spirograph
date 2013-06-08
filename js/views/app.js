var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#spirographs",

	initialize: function() {

		// spirographs can be added either programmatically by create()'ing on the spirograph
		// collection, or by the user when they click the Add>> button
		this.listenTo(app.Spirographs, 'add', this.addSpirograph);

		Backbone.on("spirograph:removed", function() {
			this.onResize();
		}, this);

		// add a brand new spirograph
		Backbone.on("spirograph:add", function() {
			app.Spirographs.create();
			this.onResize();
		}, this);

		app.Spirographs.create({
			speed: 50,
			pointFromCenterPercentage: 20,
			innerCircleSizePercentage: 20
		});
		app.Spirographs.create({
			speed: 80,
			pointFromCenterPercentage: 50,
			innerCircleSizePercentage: 40
		});
		app.Spirographs.create({
			speed: 250,
			pointFromCenterPercentage: 90,
			innerCircleSizePercentage: 90
		});

		this.onResize();
		var currView = this;
		$(window).on("resize", function() {
			currView.onResize();
		});
	},

	// *sigh*... oh flexbox, when will you be better supported?
	onResize: function() {
		var numSpirographs = app.Spirographs.length;
		var padding = (numSpirographs * 5) + 5;
		var width = $(document).width() - padding; // 20 = padding on outer edge (move to private var)
		var liWidth = width / numSpirographs;
		$("#spirographs>li").css("width", liWidth);

		var settingsHeight = $($("#spirographs .well")[0]).height();
		var canvasWrapperHeight = $(document).height() - 110 - settingsHeight;
		$(".canvasWrapper").height(canvasWrapperHeight);

		var canvasWrapperWidth = $($(".canvasWrapper")[0]).width();
		if (canvasWrapperHeight > canvasWrapperWidth) {
			$("canvas").each(function() {
				this.height = this.width = canvasWrapperWidth;
			});
		} else {
			$("canvas").each(function() {
				this.height = this.width = canvasWrapperHeight;
			});
		}

		Backbone.trigger("window:resize");
	},


	addSpirograph: function(spirograph) {
		var view = new app.SpirographView({ model: spirograph });
		$('#spirographs').append(view.render().el);
	}
});
