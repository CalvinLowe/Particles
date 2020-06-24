'use strict';
// TODO: Move particle class to other file
// TODO: init, start, stop, number of particles via app

class Particle // TODO: import this from another place..
{
	constructor()
	{
		this.colour = getRandomColour();
		this.width = 20;
		this.height = 20;
		this.x = canvas.width * Math.random();
		this.y = canvas.height * Math.random();
		this.dx = 4 * Math.random() - 2; // this is controlling the actual speed
		this.dy = 4 * Math.random() - 2; // this is controlling speed for some reason?
	}

	Draw()
	{
		context.fillStyle = this.colour;
		context.fillRect(this.x, this.y, this.width, this.height)
	}

	Update()
	{
		this.x += this.dx;
		this.y += this.dy;
	}
}

let canvas = document.getElementById('dotCanvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleList = [];
let numberOfParticles = 500; // TODO: get from page

for (let i = 0; i < numberOfParticles; i++)
{
	particleList.push(new Particle())
}

function loop()
{
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < numberOfParticles; i++)
	{
		detectWallCollision(particleList[i]);
		detectedCollision(i, particleList[i]);

		particleList[i].Update();
		particleList[i].Draw(context);
	}
	requestAnimationFrame(loop)
}

function detectWallCollision(particle)
{
	if (particle.y + particle.dy < 0 || particle.y + particle.dy > canvas.height - particle.height)
	{
		particle.dy = -particle.dy;
	}
	else if (particle.x + particle.dx < 0 || particle.x + particle.dx > canvas.width - particle.height)
	{
		particle.dx = -particle.dx;
	}
}

function detectedCollision(index, particle)
{
	for (let i = 0; i < numberOfParticles; i++)
	{
		if (i !== index)
		{
			if 
			(particle.x < particleList[i].x + particleList[i].width &&
				particle.x + particle.width > particleList[i].x &&
				particle.y < particleList[i].y + particleList[i].height &&
				particle.y + particle.height > particleList[i].y)
			{
				particle.dx = -particle.dx;
				particle.dy = -particle.dy;
				particleList[i].dx = -particleList[i].dx;
				particleList[i].dy = -particleList[i].dy;
			}
		}
	}
}

function getRandomColour()
{
	var r = 0, g = 0, b = 0;

	while (r < 100 && g < 100 && b < 100)
	{
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
	}

	return "rgb(" + r + "," + g + "," + b + ")";
}

loop();