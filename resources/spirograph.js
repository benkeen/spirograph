var spiro = {

	canvas: null,
	ctx: null,

	// configurable settings
	outerRadius: null,
	innerRadius: null,
	penPoint: null,


	// convert to regular cartesian coordinates
	convertToCartesian: function(wid, ht) {
		spiro.ctx.translate(wid/2, ht/2); // move origin
		spiro.ctx.scale(1,-1); // invert the axes
	},

	// draw the spirograph
	draw: function(wid, ht) {
		var l = spiro.penPoint / spiro.innerRadius;
		var k = spiro.innerRadius / spiro.outerRadius;

		// clear the draw area
		spiro.ctx.fillStyle = "#ffffff";
		spiro.ctx.fillRect(wid/-2, ht/-2, wid, ht);

		spiro.ctx.beginPath();
		spiro.ctx.strokeStyle = "rgba(100, 100, 100, 1)";


		for (var theta=1; theta<=20000; theta += 1) {
			var t = (Math.PI / 180) * theta;
			var ang = ((l-k)/k) * t;
			var x = spiro.outerRadius * ((1-k) * Math.cos(t) + ((l*k) * Math.cos(ang)));
			var y = spiro.outerRadius * ((1-k) * Math.sin(t) - ((l*k) * Math.sin(ang)));
			spiro.ctx.lineTo(x, y);
		}
		spiro.ctx.stroke();
		spiro.ctx.closePath();
	},

	// generate random number within range
	getRandomNumber: function(start, end) {
		return (Math.floor((Math.random() * (end-start))) + start);
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
