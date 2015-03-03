var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var currentDegree = 360;
var currentX = 100;
var currentY = 100;
var direction = 0; //Clockwise.
var clockSpeed = 2;

//create an array of enemy clocks.
var enemyClocks = [];

window.onload = function() {
	enemyClocks[0] = new Clock(500, 500, 0);
	enemyClocks[1] = new Clock(300, 400, 0);
	enemyClocks[2] = new Clock(800, 100, 0);
	enemyClocks[3] = new Clock(700, 500, 0);
	enemyClocks[4] = new Clock(900, 600, 0);
	enemyClocks[5] = new Clock(500, 150, 0);
	enemyClocks[6] = new Clock(400, 100, 0);

	requestAnimationFrame(Draw);
}

function Draw() 
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

	DrawGridLines();

	//Draw a grid.
	for (var i = 45; i < canvas.width - 45; i += 50) 
	{
		for (var j = 45; j < canvas.height - 45; j += 50) 
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
	/*
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(255,0,0,0.2)";
	ctx.arc(0,0,50,0,Math.PI*2,true);
	ctx.stroke();
	ctx.restore();
	*/

	ctx.restore();

	for (var i = 0; i < enemyClocks.length; i++) {

		enemyClocks[i].currentDegree += clockSpeed;
		if (enemyClocks[i].currentDegree > 360) 
		{
			enemyClocks[i].currentDegree = 1;
		}

		//Draw enemy clock hand.
		ctx.save();
		ctx.translate(enemyClocks[i].currentX,enemyClocks[i].currentY);
		ctx.rotate(enemyClocks[i].currentDegree * Math.PI/180);
		ctx.strokeStyle = "rgba(34,139,34,0.8)";
		ctx.lineCap = "round";
		ctx.lineWidth = 5; 
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(50,0);
		ctx.stroke();
		ctx.restore();

	}

	ctx.save();
	ctx.fillStyle = "#ffd700";
	ctx.fillRect(120,120,10,10); //x,y,w,h
	ctx.restore();

	//ctx.fillText("cDeg: " + currentDegree, 970, 9);
	//ctx.fillText("cX: " + currentX, 970, 19);
	//ctx.fillText("cY: " + currentY, 970, 29);
	
	var debugText = document.getElementById('debug');

	debugText.innerHTML =  "<strong>Debug Window</strong> <br /><br />";

	debugText.innerHTML += "<strong>Player</strong><br />";
	debugText.innerHTML += "currentDegree: " + currentDegree + "<br />";
	debugText.innerHTML += "currentX: " + currentX + "<br />";
	debugText.innerHTML += "currentY: " + currentY + "<br />";

	for (var i = 0; i < enemyClocks.length; i++) {
		debugText.innerHTML += "<br /><strong>Enemy Clock " + i + "</strong><br />";
		debugText.innerHTML += "currentDegree: " + enemyClocks[i].currentDegree + "<br />";
    	debugText.innerHTML += "currentX: " + enemyClocks[i].currentX + "<br />";
    	debugText.innerHTML += "currentY: " + enemyClocks[i].currentY + "<br />";
	}

	requestAnimationFrame(Draw);
}

//####################
//USER INPUT
//####################

window.addEventListener('keydown', function(e) 
{
	//Spacebar.
	if(e.keyCode === 32) {
		Move();
	}
});

window.addEventListener('mousedown', function(e) 
{
	Move();
});

function Move() {
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
	if (currentDegree >= 90 - leniency && currentDegree <= 90 + leniency && (currentX + 50) < canvas.width) 
	{
		currentX += 50;
		currentDegree = (currentDegree + 180) % 360;
	} 
	else if (currentDegree >= 180 - leniency && currentDegree <= 180 + leniency && (currentY + 50) < canvas.height) 
	{
		currentY += 50;
		currentDegree = (currentDegree + 180) % 360;
	}
	else if (currentDegree >= 270 - leniency && currentDegree <= 270 + leniency && (currentX - 50) > 0) 
	{
		currentX -= 50;
		currentDegree = (currentDegree + 180) % 360;
	}
	else if (((currentDegree >= 360 - leniency && currentDegree <= 360) || (currentDegree >= 1 && currentDegree <= 1 + leniency)) && (currentY - 50) > 0) 
	{
		currentY -= 50;
		currentDegree = (currentDegree + 180) % 360;
	}
}

//####################
//CONSTRUCTORS
//####################

function Clock(currentX, currentY, currentDegree) {
	this.currentX = currentX;
	this.currentY = currentY;
	this.currentDegree = currentDegree;
}




//####################
//OTHER FUNCTIONS
//####################

function DrawGridLines() 
{
	var gap = 50;
	var gridPixelSize = 10;
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "#999999";

	//Horizontal grid lines.
	for(var i = 50; i <= canvas.height - 50; i = i + gridPixelSize)
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
	for(var j = 50; j <= canvas.width -50; j = j + gridPixelSize)
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