var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw() 
{

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawGridLines();

	//requestAnimationFrame(draw);

}

//####################
//USER INPUT
//####################

var mouseDown = false;
var mouseX;
var mouseY;

canvas.addEventListener('mousedown', function(e) {
	mouseDown = true;
	mouseX = e.pageX;
	mouseY = e.pageY;

	build(mouseX, mouseY);
});

canvas.addEventListener('mouseup', function(e) {
	mouseDown = false;
});

canvas.addEventListener('mousemove', function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;

	build(mouseX, mouseY);
});

function build(mouseX, MouseY) {

	if (mouseDown) {
		ctx.fillRect(Math.floor(mouseX/10) * 10, Math.floor(mouseY/10) * 10, 10, 10);
	}

}









function drawGridLines() 
{

	var gap = 50;
	var gridPixelSize = 10;
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "#999999";

	//Horizontal grid lines.
	for(var i = 0; i <= canvas.height - 0; i = i + gridPixelSize)
	{
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
		if(i % parseInt(gap) == 0) 
		{
			ctx.lineWidth = 2;
		} 
		else 
		{
			ctx.lineWidth = 0.5;
		}
		ctx.closePath();
		ctx.stroke();
	}
	
	//Vertical grid lines.
	for(var j = 0; j <= canvas.width -0; j = j + gridPixelSize)
	{
		ctx.beginPath();
		ctx.moveTo(j, 0);
		ctx.lineTo(j, canvas.height);
		if(j % parseInt(gap) == 0) 
		{
			ctx.lineWidth = 2;
		} 
		else 
		{
			ctx.lineWidth = 0.5;
		}
		ctx.closePath();
		ctx.stroke();
	}

}