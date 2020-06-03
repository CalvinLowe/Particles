class Particle {
	constructor(x, y, radius, speed) {
		this.x = x ?? getRandomInt(0, canvas.width, radius);
		this.y = y ?? getRandomInt(0, canvas.height, radius);;
		this.radius = radius;
		this.speed = speed;
		this.dx = getRandomDirection(speed);
		this.dy = getRandomDirection(speed);
	}
}

window.onload = init();
setInterval(drawParticles, 100); // TODO: should be refresh canvas which call drawParticles()?

function init() {
	initCanvas();
	initContext();
	initParticles(10);
}

function initParticles(numberOfParticles) {
	window.particles = [];

	for (i = 0; i < numberOfParticles; i++) {
		window.particles[i] = new Particle(null, null, 10, 10);
		drawParticleImageData(i);
	}
}

function drawParticles() {
	refreshCanvas();

	for (i = 0; i < window.particles.length; i++) {
		drawParticleImageData(i);

		// detect collisions with sides
		if (particles[i].y + particles[i].dy < 0 || particles[i].y + particles[i].dy > canvas.height - particles[i].radius) {
			particles[i].dy = -particles[i].dy;
		} else if (particles[i].x + particles[i].dx < 0 || particles[i].x + particles[i].dx > canvas.width - particles[i].radius) {
			particles[i].dx = -particles[i].dx;
		}

		particles[i].x += particles[i].dx;
		particles[i].y += particles[i].dy;
	}
}

function drawParticleImageData(id) {
	context.putImageData(context.createImageData(particles[id].radius, particles[id].radius), particles[id].x, particles[id].y);
}

function initCanvas() {
	window.canvas = document.getElementById('dotCanvas');
	canvas.width = 300;
	canvas.height = 300;
}

function refreshCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function initContext() {
	window.context = canvas.getContext('2d');
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//#region Utility functions
function getRandomInt(min, max, roundedTo) {
	min = Math.ceil(min);
	max = Math.floor(max);

	var randomInt = Math.floor((Math.random() * (max - min)) + min);
	var remainder = randomInt % roundedTo;

	return randomInt - remainder;
}

function getRandomDirection(speed) {
	if (Math.random() >= 0.5) {
		return (-1 * speed);
	} else {
		return speed;
	}
}
//#endregion