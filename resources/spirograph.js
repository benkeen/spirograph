var counter = 100;

var spiro = {

	canvas: null,
	ctx: null,

	// configurable settings
	outerRadius: null,
	innerRadius: null,
	penPoint: null,
	showBorders: false,

	theta: null,
	l: null,
	k: null,

	interval: null,


	// convert to regular cartesian coordinates
	convertToCartesian: function(width, height) {
		spiro.ctx.centerX = width / 2;
		spiro.ctx.centerY = height / 2;
		spiro.ctx.translate(spiro.ctx.centerX, spiro.ctx.centerY); // move origin
		spiro.ctx.scale(1, -1); // invert the axes
	},

	// draw the spirograph
	draw: function() {
		spiro.l = spiro.penPoint / spiro.innerRadius;
		spiro.k = spiro.innerRadius / spiro.outerRadius;

		// clear the draw area
		if (spiro.showBorders) {
			spiro.ctx.beginPath();
			spiro.ctx.strokeStyle = "black";
			spiro.ctx.lineWidth = 1;
			spiro.ctx.arc(0, 0, spiro.outerRadius, 0, (Math.PI*180) * 360, false);
			spiro.ctx.stroke();
			spiro.ctx.closePath();
		}

		// now start drawing the spirograph
		spiro.ctx.beginPath();
		spiro.theta = 0;

		if (spiro.animate) {
			spiro.interval = setInterval(function() { spiro.nextLine(); }, 1);
		} else {
			for (i=0; i<20000; i++) {
				spiro.nextLine();
			}
		}
	},

	nextLine: function() {
		var t = (Math.PI / 180) * spiro.theta;
		var ang = ((spiro.l-spiro.k)/spiro.k) * t;
		var x = spiro.outerRadius * ((1 - spiro.k) * Math.cos(t) + ((spiro.l * spiro.k) * Math.cos(ang)));
		var y = spiro.outerRadius * ((1 - spiro.k) * Math.sin(t) - ((spiro.l * spiro.k) * Math.sin(ang)));

		spiro.ctx.strokeStyle = "rgba(50, 140, 255, 0.1)";

		spiro.ctx.lineTo(x, y);
		spiro.ctx.stroke();
		spiro.theta++;
	},

	updateSpirograph: function() {
		if (spiro.interval !== null) {
			clearInterval(spiro.interval);
		}

		spiro.outerRadius = parseInt($("#outerRadius").val(), 10);
		spiro.innerRadius = parseInt($("#innerRadius").val(), 10);
		spiro.penPoint    = parseInt($("#penPoint").val(), 10);
		spiro.animate     = $("#animate")[0].checked;
		spiro.showBorders = $("#showBorders")[0].checked;
		spiro.draw();
	}
};


$(function() {
	spiro.canvas = document.getElementById("canvas");
	spiro.ctx = spiro.canvas.getContext("2d");
	spiro.convertToCartesian(spiro.canvas.width, spiro.canvas.height);

	$("#start").on("click", spiro.updateSpirograph);
});
