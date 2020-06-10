class Particle
{
	constructor(x, y, radius, speed)
	{
		this.x = x ?? getRandomInt(0, canvas.width, radius);
		this.y = y ?? getRandomInt(0, canvas.height, radius);;
		this.radius = radius;
		this.speed = speed;
		this.dx = getRandomDirection(speed);
		this.dy = getRandomDirection(speed);
	}

	// TODO: a constructor with a random

	VertexA() { return [this.x, this.y]; }

	VertexB() { return [this.x + this.radius, this.y]; }

	VertexC(){ return [this.x + this.radius, this.y + this.radius]; }

	VertexD() {	return [this.x, this.y + this.radius]; }
}


window.onload = init();
setInterval(refreshCanvas, 100);

function init()
{
	initCanvas(100, 100);
	initContext();
	initParticles(5);
}

function initParticles(numberOfParticles)
{
	window.particleList = [];

	for (let i = 0; i < numberOfParticles; i++)
	{
		window.particleList[i] = new Particle(null, null, 10, 10);
		drawParticleImageData(i);
	}
}

function drawParticles()
{
	detectParticleCollisions(particleList);

	for (let i = 0; i < window.particleList.length; i++)
	{
		drawParticleImageData(i);
		detectWallCollision(particleList[i]);
		updateParticlePosition(particleList[i]);
	}
}

function drawParticleImageData(id)
{
	context.putImageData(context.createImageData(particleList[id].radius, particleList[id].radius), particleList[id].x, particleList[id].y);
}

function detectParticleCollisions(particleList)
{
	for (let i = 0; i < particleList.length - 1; i++)
	{
		detectVertexCollision(particleList[i], particleList[i + 1]);
	}
}

function detectVertexCollision(particleA, particleB)
{
	if
	(
		(particleA.VertexA()[0] === particleB.VertexC()[0] && particleA.VertexA()[1] === particleB.VertexC()[1]) ||
		(particleA.VertexB()[0] === particleB.VertexD()[0] && particleA.VertexB()[1] === particleB.VertexD()[1]) ||
		(particleA.VertexC()[0] === particleB.VertexA()[0] && particleA.VertexC()[1] === particleB.VertexA()[1]) ||
		(particleA.VertexD()[0] === particleB.VertexB()[0] && particleA.VertexD()[1] === particleB.VertexB()[1])
	)
	{
		reverseXCoord(particleA);
		reverseYCoord(particleA);
		reverseXCoord(particleB);
		reverseYCoord(particleB);
	}
}

function detectWallCollision(particle)
{
	if (particle.y + particle.dy < 0 || particle.y + particle.dy > canvas.height - particle.radius)
	{
		reverseYCoord(particle);
	}
	else if (particle.x + particle.dx < 0 || particle.x + particle.dx > canvas.width - particle.radius)
	{
		reverseXCoord(particle);
	}
}

function updateParticlePosition(particle)
{
	particle.x += particle.dx;
	particle.y += particle.dy;
}

function reverseYCoord(particle)
{
	particle.dy = -particle.dy;
}

function reverseXCoord(particle)
{
	particle.dx = -particle.dx;
}

function randomCollision(particle)
{
	if (Math.random() >= 0.5) {
		particle.dx = -particle.dx;
	}
	if (Math.random() >= 0.5) {
		particle.dy = -particle.dy;
	}
}

function initCanvas(width, height)
{
	window.canvas = document.getElementById('dotCanvas');
	canvas.width = width;
	canvas.height = height;
}

function refreshCanvas()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	drawParticles();
}

function initContext()
{
	window.context = canvas.getContext('2d');
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//#region Utility functions
function getRandomInt(min, max, roundedTo)
{
	min = Math.ceil(min);
	max = Math.floor(max);

	var randomInt = Math.floor((Math.random() * (max - min)) + min);
	var remainder = randomInt % roundedTo;

	return randomInt - remainder;
}

function getRandomDirection(speed)
{
	if (Math.random() >= 0.5)
	{
		return (-1 * speed);
	}
	else
	{
		return speed;
	}
}
//#endregion