/*
var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#spirographs",

	initialize: function() {


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
			$("canvas.spiroCanvas").each(function() {
				this.height = this.width = canvasWrapperWidth;
			});
		} else {
			$("canvas.spiroCanvas").each(function() {
				this.height = this.width = canvasWrapperHeight;
			});
		}

		Backbone.trigger("window:resize");
	},


});
*/