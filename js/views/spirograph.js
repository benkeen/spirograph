var app = app || {};

/**
* Our main View. Right now this doesn't contain much: but the idea is that at some point
* we'll add the ability to have multiple spirographs on screen at a time.
* @type {*}
*/
app.SpirographView = Backbone.View.extend({

	tagName: "li",

	// misc private vars (model, too?)
	ctx: null,
	theta: null,
	l: null,
	k: null,
	interval: null,
	canvas: null,
	currStatus: "inactive",

	// DOM elements
	$actionButton: null,
	$destroyButton: null,
	$innerCircleSizePercentageSlider: null,
	$pointFromCenterSlider: null,
	$speedSlider: null,
	$lineThickness: null,
	$lineTransparency: null,


	template: _.template($('#spirograph-template').html()),

	initialize: function() {
		Backbone.on("window:resize", function() {
			this.resetCanvas();
		}, this);
		Backbone.on("spirograph:drawAll", function() {
			this.resetCanvas();
			this.updateSpirograph();
		}, this);
	},

	render: function() {

		// render the spirograph section
		var params = this.model.toJSON();
		params.cid = this.model.cid;
		this.$el.html(this.template(params));

		// make a note of key DOM elements
		this.$actionButton = $(this.$el).find(".actionButton");
		this.$destroyButton = $(this.$el).find(".destroy");
		this.$innerCircleSizePercentageSlider = $(this.$el).find(".innerCircleSizePercentage");
		this.$pointFromCenterSlider = $(this.$el).find(".pointFromCenterPercentage");
		this.$speedSlider = $(this.$el).find(".speed");
		this.$lineThickness = $(this.$el).find(".lineThickness");
		this.$lineTransparency = $(this.$el).find(".lineTransparency");

		this.showSpirographCircles();

		return this;
	},

	events: {
		"click .actionButton": "updateSpirograph",
		"click .destroy": "onDestroy",
		"change .innerCircleSizePercentage": "onChangeInnerCircleSize",
		"change .pointFromCenterPercentage": "onChangePointFromCenter",
		"change .lineThickness": "onChangeLineThickness",
		"change .lineTransparency": "onChangeLineTransparency",
		"change .speed": "onChangeSpeed",
		"click li a": "onSelectTab"
	},


	onChangeInnerCircleSize: function() {
		this.model.set({
			innerCircleSizePercentage: parseInt(this.$innerCircleSizePercentageSlider.val(), 10)
		});
	},

	onChangePointFromCenter: function() {
		this.model.set({
			pointFromCenterPercentage: parseInt(this.$pointFromCenterSlider.val(), 10)
		});
	},

	onChangeSpeed: function() {
		this.model.set({
			speed: parseInt(this.$speedSlider.val(), 10)
		});
	},

	onChangeLineThickness: function() {
		this.model.set({
			lineThickness: parseInt(this.$lineThickness.val(), 10)
		});
	},

	onChangeLineTransparency: function() {
		this.model.set({
			lineTransparency: parseInt(this.$lineTransparency.val(), 10)
		});
	},

	onDestroy: function(e) {
		e.preventDefault();
		app.Spirographs.remove(this.model);
		this.remove();
		Backbone.trigger("spirograph:removed");
	},

	resetCanvas: function() {
		this.canvas = $(this.$el).find("canvas")[0];
		this.canvas.width = this.canvas.width;
		this.ctx    = this.canvas.getContext("2d");

		this.ctx.centerX = this.canvas.width / 2;
		this.ctx.centerY = this.canvas.height / 2;

		// move the center to the middle of the canvas and invert the axis so it appears to
		// draw the spirograph in the right order
		this.ctx.translate(this.ctx.centerX, this.ctx.centerY);
		this.ctx.scale(1, -1);
	},

	// update the model with the relative values
	updateModel: function() {

		// these are done separately on purpose. The innerRadius value depends on the outerRadius having
		// been properly set in the model
		this.model.set({
			outerRadiusInPixels: this._getOuterRadiusInPixels()
		});
		this.model.set({
			innerRadiusInPixels: this._getInnerRadiusInPixels()
		});
		this.model.set({
			pointFromCenterInPixels: this._getPointFromCenterInPixels(),
			lineThickness: parseInt($(this.$lineThickness).val(), 10),
			lineTransparency: this._getLineTransparency()
		});
	},

	showSpirographCircles: function() {

	},

	// draw the spirograph
	draw: function() {
		this.theta = 0;
		this.max = this._getMaxLoops(); // figure out when we need to stop looping

		var currView = this;
		this.interval = setInterval(function() { currView.nextLine(); }, 30);
	},

	resetControls: function() {
		this.$actionButton.removeClass("btn-danger").addClass("btn-primary").html("Draw &raquo;");
		this.currStatus = "inactive";
	},

	nextLine: function() {
		this.ctx.beginPath();
		this.ctx.lineWidth = this.model.attributes.lineThickness;
		this.ctx.strokeStyle = "rgba(50, 150, 255, 0.5)"; //" + this.model.attributes.lineTransparency

		for (var i=0; i<this.model.attributes.speed; i++) {
			if (this.theta / Math.PI / 2 > this.max) {
				break;
			}
			this.batchedLineTo();
		}
		this.ctx.stroke();

		if (this.theta / (Math.PI * 2) > this.max) {
			clearInterval(this.interval);
			this.resetControls();
		}
	},

	batchedLineTo: function() {
		var val1 = this.theta * (1 - this.model.attributes.outerRadiusInPixels / this.model.attributes.innerRadiusInPixels);
		var val2 = this.model.attributes.innerRadiusInPixels - this.model.attributes.outerRadiusInPixels;
		var x = Math.cos(this.theta) * val2 + this.model.attributes.pointFromCenterInPixels * Math.cos(val1);
		var y = Math.sin(this.theta) * val2 + this.model.attributes.pointFromCenterInPixels * Math.sin(val1);
		this.ctx.moveTo(x, y);

		this.theta += 0.01;
		val1 = this.theta * (1 - this.model.attributes.outerRadiusInPixels / this.model.attributes.innerRadiusInPixels);
		val2 = this.model.attributes.innerRadiusInPixels - this.model.attributes.outerRadiusInPixels;
		x = Math.cos(this.theta) * val2 + this.model.attributes.pointFromCenterInPixels * Math.cos(val1);
		y = Math.sin(this.theta) * val2 + this.model.attributes.pointFromCenterInPixels * Math.sin(val1);
		this.ctx.lineTo(x, y);
	},

	updateSpirograph: function() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}

		this.resetCanvas();
		this.updateModel();

		if (this.currStatus === "inactive") {
			this.$actionButton.removeClass("btn-primary").addClass("btn-danger").html("Stop");
			this.currStatus = "active";
			this.draw();
		} else {
			this.resetControls();
		}
	},

	onSelectTab: function(e) {
		$(this.$el).find(".spiro-tabs li").removeClass("selected");
		$(this.$el).find(".tabContent>div").removeClass("visible");

		var tab = $(e.target).data("tab");
		$(e.target).parent().addClass("selected");
		$(this.$el).find("." + tab + "TabContent").addClass("visible");

		this.model.set({
			currTab: tab
		});
	},


	// ------------------------------------ HELPERS -------------------------------------

	_getMaxLoops: function() {
		var attr = this.model.attributes;
		return (attr.innerRadiusInPixels / this._getGreatestCommonDivisor(attr.outerRadiusInPixels, attr.innerRadiusInPixels));
	},

	_getGreatestCommonDivisor: function(a, b) {
		var t;
		while (b != 0) {
			b = a % (t = b);
			a = t;
		}
		return a;
	},

	_getOuterRadiusInPixels: function() {
		return (this.canvas.width / 2) - 20;
	},

	_getInnerRadiusInPixels: function() {
		return parseInt((this.model.attributes.outerRadiusInPixels / 100) * this.model.attributes.innerCircleSizePercentage, 10);
	},

	_getPointFromCenterInPixels: function() {
		return parseInt((this.model.attributes.innerRadiusInPixels / 100) * this.model.attributes.pointFromCenterPercentage, 10);
	},

	_getLineTransparency: function() {
		var lineTransparency = parseFloat($(this.$lineTransparency).val());
		return lineTransparency.toFixed(1);
	}

});