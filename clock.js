var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var currentDegree = 360;
var currentX = 100;
var currentY = 100;
var direction = 0; //Clockwise.
var clockSpeed = 2;

function draw() 
{

	if (direction === 0)
	{
		currentDegree += clockSpeed;
		if (currentDegree > 360) 
		{
			currentDegree = 1;
		}
	} 
	else 
	{
		currentDegree -= clockSpeed;
		if (currentDegree < 1) 
		{
			currentDegree = 360;
		}
	}

	//Clear canvas, move start point, rotate 90deg so we start at 12 o'clock.
	ctx.save();
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawGridLines();

	//Draw a grid.
	for (var i = 95; i < canvas.width - 95; i += 50) 
	{
		for (var j = 95; j < canvas.height - 95; j += 50) 
		{
			ctx.fillRect(i,j,10,10); //x,y,w,h
		}
	}

	//Move the canvas.
	ctx.translate(currentX,currentY);
	ctx.rotate(-Math.PI/2);

	//Draw user's clock hand.
	ctx.save();
	ctx.rotate(currentDegree * Math.PI/180);
	ctx.strokeStyle = "rgba(255,0,0,0.8)";
	ctx.lineCap = "round";
	ctx.lineWidth = 5; 
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(50,0);
	ctx.stroke();
	ctx.restore();

	//Draw outside arc.
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "rgba(255,0,0,0.2)";
	ctx.arc(0,0,50,0,Math.PI*2,true);
	ctx.stroke();

	ctx.restore();

	ctx.fillText("cDeg: " + currentDegree, 970, 9);
	ctx.fillText("cX: " + currentX, 970, 19);
	ctx.fillText("cY: " + currentY, 970, 29);

	/*
	var debugText = document.getElementById('debug');

	debugText.innerHTML = "currentDegree: " + currentDegree + "<br />";
	debugText.innerHTML += "currentX: " + currentX + "<br />";
	debugText.innerHTML += "currentY: " + currentY + "<br />";
	*/

	requestAnimationFrame(draw);

}

//####################
//USER INPUT
//####################

window.addEventListener('keydown', function(e) 
{
	//Spacebar.
	if(e.keyCode === 32) {
		move();
	}
});

window.addEventListener('mousedown', function(e) 
{
	move();
});

function move() {

	var leniency = 8;

	//Switch direction.
	if (direction === 0) 
	{
		direction = 1;
	} 
	else 
	{
		direction = 0;
	}

	//Move to a new dot.
	if (currentDegree >= 90 - leniency && currentDegree <= 90 + leniency) 
	{
		currentX += 50;
		currentDegree = (currentDegree + 180) % 360;
	} 
	else if (currentDegree >= 180 - leniency && currentDegree <= 180 + leniency) 
	{
		currentY += 50;
		currentDegree = (currentDegree + 180) % 360;
	}
	else if (currentDegree >= 270 - leniency && currentDegree <= 270 + leniency) 
	{
		currentX -= 50;
		currentDegree = (currentDegree + 180) % 360;
	}
	else if ((currentDegree >= 360 - leniency && currentDegree <= 360) || (currentDegree >= 1 && currentDegree <= 1 + leniency)) 
	{
		currentY -= 50;
		currentDegree = (currentDegree + 180) % 360;
	}

}









function drawGridLines() 
{

	var gap = 50;
	var gridPixelSize = 10;
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "#999999";

	//Horizontal grid lines.
	for(var i = 100; i <= canvas.height - 100; i = i + gridPixelSize)
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
	for(var j = 100; j <= canvas.width -100; j = j + gridPixelSize)
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