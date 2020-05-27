class Particle {
	constructor(x, y, radius, speed) {
		this.x = x ?? getRandomInt(0, canvas.width, radius);
		this.y = y ?? getRandomInt(0, canvas.height, radius);;
		this.radius = radius;
		this.speed = speed;
		this.dx = speed;
		this.dy = speed;
	}
}

window.onload = init();
setInterval(drawParticle, 100);

function init() {
	initCanvas();
	initContext();
	initParticle();
}

function initParticle() {
	window.particle = new Particle(null, null, 10, 10);
	context.putImageData(context.createImageData(particle.radius, particle.radius), particle.x, particle.y);
}

function drawParticle() {
	refreshCanvas();
	context.putImageData(context.createImageData(particle.radius, particle.radius), particle.x, particle.y);

	// detect collisions with sides
	if (particle.y + particle.dy < 0 || particle.y + particle.dy > canvas.height - particle.radius) {
		particle.dy = -particle.dy;
	} else if (particle.x + particle.dx < 0 || particle.x + particle.dx > canvas.width - particle.radius) {
		particle.dx = -particle.dx;
	}

	particle.x += particle.dx;
	particle.y += particle.dy;
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

	return randomInt - remainder
}
//#endregion