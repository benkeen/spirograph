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

	template: _.template($('#spirograph-template').html()),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		var params = this.model.toJSON();
		params.cid = this.model.cid;

		this.$el.html(this.template(params));
		this.canvas = $(this.$el).find(".canvas")[0];
		this.ctx    = this.canvas.getContext("2d");
		this.convertToCartesian();

		return this;
	},

	events: {
		"click .startButton": "updateSpirograph"
	},

	// convert to regular cartesian coordinates
	convertToCartesian: function() {
		this.ctx.centerX = this.canvas.width / 2;
		this.ctx.centerY = this.canvas.height / 2;

		// move the center to the middle of the canvas and invert the axis so it appears to
		// draw the spirograph in the right order
		this.ctx.translate(this.ctx.centerX, this.ctx.centerY);
		this.ctx.scale(1, -1);
	},

	// draw the spirograph
	draw: function() {

		if (this.model.attributes.showBorders) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 0.05;
			this.ctx.arc(0, 0, this.model.attributes.outerRadius, 0, (Math.PI*180) * 360, false);
			this.ctx.stroke();
			this.ctx.closePath();
		}

		// now start drawing the spirograph
		this.theta = 0;

		// figure out when we need to stop loopin'
		this.max = (this.model.attributes.innerRadius / this.greatestCommonDivisor(this.model.attributes.outerRadius, this.model.attributes.innerRadius));

		if (this.model.attributes.animate) {
			var currView = this;
			this.interval = setInterval(function() { currView.nextLine(); }, 30);
		} else {
			for (var i=0; i<1000; i++) {
				this.nextLine();
			}
		}
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
		var val1 = this.theta * (1 - this.model.attributes.outerRadius / this.model.attributes.innerRadius);
		var val2 = this.model.attributes.innerRadius - this.model.attributes.outerRadius;
		var x = Math.cos(this.theta) * val2 + this.model.attributes.penPoint * Math.cos(val1);
		var y = Math.sin(this.theta) * val2 + this.model.attributes.penPoint * Math.sin(val1);
		this.ctx.moveTo(x, y);

		this.theta += 0.01;
		val1 = this.theta * (1 - this.model.attributes.outerRadius / this.model.attributes.innerRadius);
		val2 = this.model.attributes.innerRadius - this.model.attributes.outerRadius;
		x = Math.cos(this.theta) * val2 + this.model.attributes.penPoint * Math.cos(val1);
		y = Math.sin(this.theta) * val2 + this.model.attributes.penPoint * Math.sin(val1);
		this.ctx.lineTo(x, y);
	},

	updateSpirograph: function() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}
		this.draw();
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