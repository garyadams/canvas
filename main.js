var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gravity = 0.1;
var dampening = 0.99;

var circle = {
	x: 30,
	y: 30,
	radius: 20,
	vx: 0.01,
	vy: 0.01
};

function init() {
	setInterval(draw, 1000 / 60);
}

function draw() {
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
		console.log("bounce" + circle.vy);
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

	//Clear the canvas.
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	//Draw the ball in it's new position.
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
	ctx.closePath();
	ctx.fill();
}

canvas.addEventListener('mousedown', function(e) {
	var dx = e.pageX - circle.x;
	var dy = e.pageY - circle.y;

	circle.vx += dx * 0.05;
	circle.vy += dy * 0.05;
});