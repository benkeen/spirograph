var counter = 100;

var spiro = {

	canvas: null,
	ctx: null,

	// configurable settings
	outerRadius: null,
	innerRadius: null,
	penPoint: null,

	theta: null,
	l: null,
	k: null,

	interval: null,


	// convert to regular cartesian coordinates
	convertToCartesian: function(width, height) {
		spiro.ctx.translate(width/2, height/2); // move origin
		spiro.ctx.scale(1, -1); // invert the axes
	},

	// draw the spirograph
	draw: function(width, height) {
		spiro.l = spiro.penPoint / spiro.innerRadius;
		spiro.k = spiro.innerRadius / spiro.outerRadius;

		// clear the draw area
		spiro.ctx.fillStyle = "#ffffff";
		spiro.ctx.fillRect(width / -2, height / -2, width, height);
		spiro.ctx.beginPath();
		spiro.ctx.strokeStyle = "rgba(50, 200, 255, 0.1)";

		spiro.theta = 0;
		spiro.interval = setInterval(function() { spiro.nextLine(); }, 2);
	},

	nextLine: function() {
		var t = (Math.PI / 180) * spiro.theta;
		var ang = ((spiro.l-spiro.k)/spiro.k) * t;
		var x = spiro.outerRadius * ((1 - spiro.k) * Math.cos(t) + ((spiro.l * spiro.k) * Math.cos(ang)));
		var y = spiro.outerRadius * ((1 - spiro.k) * Math.sin(t) - ((spiro.l * spiro.k) * Math.sin(ang)));

		if (spiro.theta === 0) {
			spiro.originalX = x;
			spiro.originalY = y;
		} else {
			if (x === spiro.originalX && y === spiro.originalY) {
				alert("done!");
			}
			console.log(ang);
		}

		spiro.ctx.lineTo(x, y);
		spiro.ctx.stroke();
		//spiro.ctx.closePath();

		spiro.theta++;
	},

	updateSpirograph: function() {
		spiro.outerRadius = parseInt($("#outerRadius").val(), 10);
		spiro.innerRadius = parseInt($("#innerRadius").val(), 10);
		spiro.penPoint    = parseInt($("#penPoint").val(), 10);
		spiro.draw(spiro.canvas.width, spiro.canvas.height);
	}
};


$(function() {
	spiro.canvas = document.getElementById("canvas");
	spiro.ctx = spiro.canvas.getContext("2d");
	spiro.convertToCartesian(spiro.canvas.width, spiro.canvas.height);

	$(".options").on("change", spiro.updateSpirograph);
	spiro.updateSpirograph();
});
