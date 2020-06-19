// TODO: Move particle class to other file
// TODO: init, start, stop, number of particles via app

class Particle // TODO: import this from another place..
{
	constructor()
	{
		this.colour = getRandomColour();
		this.radius = 20;
		this.dx = 4 * Math.random() - 2; // this is controlling the actual speed
		this.dy = 4 * Math.random() - 2; // this is controlling speed for some reason?
		// TODO: create get random velocity

		// Vertices
		this.VertexA = new Vertex(
			canvas.width * Math.random(),
			canvas.height * Math.random())
		this.VertexB = new Vertex(
			this.VertexA.x + this.radius,
			this.VertexA.y
		);
		this.VertexC = new Vertex(
			this.VertexA.x + this.radius,
			this.VertexA.y + this.radius
		)
		this.VertexD = new Vertex(
			this.VertexA.x,
			this.VertexA.y + this.radius
		)
	}

	Draw()
	{
		context.fillStyle = this.colour;
		context.fillRect(this.VertexA.x, this.VertexA.y, this.radius, this.radius)
	}

	Update()
	{
		this.VertexA.Update(this.dx, this.dy);
	}

	IsVertexWithinBoundingBox(vertex)
	{
		return this.VertexA.x <= vertex.x && vertex.x <= this.VertexB.x &&
			this.VertexD.x <= vertex.x && vertex.x<= this.VertexC.x &&
			this.VertexA.y <= vertex.y && vertex.y <= this.VertexD.y &&
			this.VertexB.y <= vertex.y && vertex.y <= this.VertexC.y
	}
}

class Vertex
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	Update(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}

	Equals(vertex)
	{
		// TODO: if vertex != type of vertex
		return this.x === vertex.x && this.y === vertex.y;
	}
}

let canvas = document.getElementById('dotCanvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleList = [];
let numberOfParticles = 100; // TODO: get from page

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
	if (particle.VertexA.y + particle.dy < 0 || particle.VertexA.y + particle.dy > canvas.height - particle.radius)
	{
		particle.dy = -particle.dy;
	}
	else if (particle.VertexA.x + particle.dx < 0 || particle.VertexA.x + particle.dx > canvas.width - particle.radius)
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
			if (particleList[i].IsVertexWithinBoundingBox(particle.VertexA) ||
				particleList[i].IsVertexWithinBoundingBox(particle.VertexB) ||
				particleList[i].IsVertexWithinBoundingBox(particle.VertexC) ||
				particleList[i].IsVertexWithinBoundingBox(particle.VertexD))
			{
				particle.dx = -particle.dx;
				particle.dy = -particle.dy;
				particleList[i].dx = -particleList[i].dx;
				particleList[i].dy = -particleList[i].dy;
				particle.Update();
				particleList[i].Update();
			}
		}
	}
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