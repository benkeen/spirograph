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
		// what are these, exactly?
		this.l = this.model.attributes.penPoint / this.model.attributes.innerRadius;
		this.k = this.model.attributes.innerRadius / this.model.attributes.outerRadius;

		if (this.model.attributes.showBorders) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 0.05;
			this.ctx.arc(0, 0, this.model.attributes.outerRadius, 0, (Math.PI*180) * 360, false);
			this.ctx.stroke();
			this.ctx.closePath();
		}

		// now start drawing the spirograph
		this.ctx.beginPath();
		this.theta = 0;

		if (this.model.attributes.animate) {
			var currView = this;
			this.interval = setInterval(function() { currView.nextLine(); }, 1);
		} else {
			//
			for (var i=0; i<4000; i++) {
				this.nextLine();
			}
		}
	},

	nextLine: function() {
		var t = (Math.PI / 180) * this.theta;
		var ang = ((this.l-this.k)/this.k) * t;
		var x = this.model.attributes.outerRadius * ((1 - this.k) * Math.cos(t) + ((this.l * this.k) * Math.cos(ang)));
		var y = this.model.attributes.outerRadius * ((1 - this.k) * Math.sin(t) - ((this.l * this.k) * Math.sin(ang)));

		this.ctx.strokeStyle = "rgba(50, 140, 255, 0.1)";
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
		this.theta++;
	},

	updateSpirograph: function() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}

		// update the buttons

		this.draw();
	}
});