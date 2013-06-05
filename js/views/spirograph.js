var app = app || {};

/**
 * Our main View. Right now this doesn't contain much: but the idea is that at some point
 * we'll add the ability to have multiple spirographs on screen at a time.
 * @type {*}
 */
app.SpirographView = Backbone.View.extend({

	// controlled via settings
	outerRadius: null,
	innerRadius: null,
	penPoint: null,
	showBorders: false,

	// misc private vars
	ctx: null,
	theta: null,
	l: null,
	k: null,
	interval: null,

	el: "#spirographs",
	canvas: null,


	initialize: function() {
		this.canvas = $(this.el).find("#canvas")[0];
		this.ctx = this.canvas.getContext("2d");
		this.convertToCartesian();
	},

	events: {
		"click #start": "updateSpirograph"
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

		// what are these?
		this.l = this.penPoint / this.innerRadius;
		this.k = this.innerRadius / this.outerRadius;

		// clear the draw area
		if (this.showBorders) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 1;
			this.ctx.arc(0, 0, this.outerRadius, 0, (Math.PI*180) * 360, false);
			this.ctx.stroke();
			this.ctx.closePath();
		}

		// now start drawing the spirograph
		this.ctx.beginPath();
		this.theta = 0;

		if (this.animate) {
			var currView = this;
			this.interval = setInterval(function() { currView.nextLine(); }, 1);
		} else {
			for (var i=0; i<20000; i++) {
				this.nextLine();
			}
		}
	},

	nextLine: function() {
		var t = (Math.PI / 180) * this.theta;
		var ang = ((this.l-this.k)/this.k) * t;
		var x = this.outerRadius * ((1 - this.k) * Math.cos(t) + ((this.l * this.k) * Math.cos(ang)));
		var y = this.outerRadius * ((1 - this.k) * Math.sin(t) - ((this.l * this.k) * Math.sin(ang)));

		this.ctx.strokeStyle = "rgba(50, 140, 255, 0.1)";
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
		this.theta++;
	},

	updateSpirograph: function() {
		if (this.interval !== null) {
			clearInterval(this.interval);
		}

		this.outerRadius = parseInt($("#outerRadius").val(), 10);
		this.innerRadius = parseInt($("#innerRadius").val(), 10);
		this.penPoint    = parseInt($("#penPoint").val(), 10);
		this.animate     = $("#animate")[0].checked;
		this.showBorders = $("#showBorders")[0].checked;

		this.draw();
	}
});