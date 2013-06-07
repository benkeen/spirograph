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
	outerRadius: 300, // should be set to null
	currStatus: "inactive",

	// DOM elements
	$actionButton: null,
	$innerRadiusSlider: null,
	$pointFromCenterSlider: null,
	$speedSlider: null,


	template: _.template($('#spirograph-template').html()),

	initialize: function() {
		//this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		var params = this.model.toJSON();
		params.cid = this.model.cid;

		this.$el.html(this.template(params));
		this.$actionButton = $(this.$el).find(".actionButton");
		this.$innerRadiusSlider = $(this.$el).find(".innerRadius");
		this.$pointFromCenterSlider = $(this.$el).find(".pointFromCenter");
		this.$speedSlider = $(this.$el).find(".speed");

		// now catch any changes that occur to the sliders and map them to our model
		this.addObservableInputs();
		this.resetCanvas();
		this.showSpirographCircles();

		return this;
	},

	events: {
		"click .actionButton": "updateSpirograph"
	},

	addObservableInputs: function() {
		var currView = this;
		this.$innerRadiusSlider.on("change", function() {
			currView.model.set({
				innerRadius: this.value
			});
		});
		this.$pointFromCenterSlider.on("change", function() {
			currView.model.set({
				pointFromCenter: this.value
			});
		});
		this.$speedSlider.on("change", function() {
			currView.model.set({
				speed: this.value
			});
		});
	},

	resetCanvas: function() {
		this.canvas = $(this.$el).find("canvas")[0];
		this.ctx    = this.canvas.getContext("2d");

		this.ctx.centerX = this.canvas.width / 2;
		this.ctx.centerY = this.canvas.height / 2;
		this.outerRadius = (this.canvas.width / 2) - 20;

		// move the center to the middle of the canvas and invert the axis so it appears to
		// draw the spirograph in the right order
		this.ctx.translate(this.ctx.centerX, this.ctx.centerY);
		this.ctx.scale(1, -1);
	},

	showSpirographCircles: function() {

	},

	// draw the spirograph
	draw: function() {

//		this.setCenter();
//			this.ctx.beginPath();
//			this.ctx.strokeStyle = "black";
//			this.ctx.lineWidth = 0.05;
//			this.ctx.arc(0, 0, this.outerRadius, 0, (Math.PI*180) * 360, false);
//			this.ctx.stroke();
//			this.ctx.closePath();

		// now start drawing the spirograph
		this.theta = 0;

		// figure out when we need to stop looping
		this.max = (this.model.attributes.innerRadius / this.greatestCommonDivisor(this.outerRadius, this.model.attributes.innerRadius));
		var currView = this;
		this.interval = setInterval(function() { currView.nextLine(); }, 30);
	},

	nextLine: function() {
		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "rgba(50, 150, 255, 0.5)";

		for (var i=0; i<this.model.attributes.speed; i++) {
			if (this.theta / Math.PI / 2 > this.max) {
				break;
			}
			this.batchedLineTo();
		}
		this.ctx.stroke();

		if (this.theta / (Math.PI * 2) > this.max) {
			clearInterval(this.interval);
		}
	},

	batchedLineTo: function() {
		var val1 = this.theta * (1 - this.outerRadius / this.model.attributes.innerRadius);
		var val2 = this.model.attributes.innerRadius - this.outerRadius;
		var x = Math.cos(this.theta) * val2 + this.model.attributes.pointFromCenter * Math.cos(val1);
		var y = Math.sin(this.theta) * val2 + this.model.attributes.pointFromCenter * Math.sin(val1);
		this.ctx.moveTo(x, y);

		this.theta += 0.01;
		val1 = this.theta * (1 - this.outerRadius / this.model.attributes.innerRadius);
		val2 = this.model.attributes.innerRadius - this.outerRadius;
		x = Math.cos(this.theta) * val2 + this.model.attributes.pointFromCenter * Math.cos(val1);
		y = Math.sin(this.theta) * val2 + this.model.attributes.pointFromCenter * Math.sin(val1);
		this.ctx.lineTo(x, y);
	},

	updateSpirograph: function() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}

		if (this.currStatus === "inactive") {
			this.$actionButton.removeClass("btn-primary").addClass("btn-danger").html("Stop");
			this.currStatus = "active";
			this.draw();
		} else {
			this.$actionButton.removeClass("btn-danger").addClass("btn-primary").html("Start &raquo;");
		}
	},

	greatestCommonDivisor: function(a, b) {
		var t;
		while (b != 0) {
			b = a % (t = b);
			a = t;
		}
		return a;
	}

});