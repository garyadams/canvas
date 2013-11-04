var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gravity = 0.1;
var dampening = 0.99;
var pullStrength = 0.01;
var repulsion = 1;
var circles = [];

for (var i = 0; i < 50; i++) {
	circles.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: (Math.random() * 20) + 5,
		vx: 0.01,
		vy: 0.01
	});
}

function init() {
	setInterval(draw, 1000 / 60);
}

function draw() {

	var circle = circles[i];

	//Clear the canvas.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < circles.length; i++) {		

		circle = circles[i];

		//Increment position by velocity.
		circle.y += circle.vy;
		circle.x += circle.vx;

		//Increment velocity.
		circle.vy += gravity;

		//Add dampening.
		circle.vy *= dampening;
		circle.vx *= dampening;

		//Bounce of the walls.
		if ((circle.y + circle.radius) > canvas.height) {
			circle.vy = -Math.abs(circle.vy);
		}

		if ((circle.y + circle.radius) < circle.radius*2) {
			circle.vy = +Math.abs(circle.vy);
		}

		if ((circle.x + circle.radius) > canvas.width) {
			circle.vx = -Math.abs(circle.vx);
		}

		if ((circle.x + circle.radius) < circle.radius*2) {
			circle.vx = +Math.abs(circle.vx);
		}

		//Collision detection.
		for (var j = i + 1; j < circles.length; j++) {
			detectCollision(circle, circles[j]);
		}

		//Draw the ball in it's new position.
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
		ctx.closePath();
		ctx.fill();

	}

	pullBalls();

}

function detectCollision(a, b) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	var ux = dx / distance;
	var uy = dy / distance;

	if (distance < a.radius + b.radius) {
		a.vx -= ux * repulsion;
		a.vy -= uy * repulsion;
		b.vx += ux * repulsion;
		b.vy += uy * repulsion;
	}
}

var mouseDown = false;
var mouseX;
var mouseY;

canvas.addEventListener('mousedown', function(e) {
	mouseDown = true;
	mouseX = e.pageX;
	mouseY = e.pageY;
});

canvas.addEventListener('mouseup', function(e) {
	mouseDown = false;
});

canvas.addEventListener('mousemove', function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

function pullBalls() {
	
	if (mouseDown) {

		var circle;
		var dx;
		var dy;

		for (var i = 0; i < circles.length; i++) { 

			circle = circles[i];

			dx = mouseX - circle.x;
			dy = mouseY - circle.y;
			circle.vx += dx * pullStrength;
			circle.vy += dy * pullStrength;

		}
	}

}