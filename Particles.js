(function () {
	'use strict';
	//
	// Variables & State
	//
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	let particleList = [];
	let numberOfParticles = 2;

	class Particle {
		constructor(x, y, size, startAngle, colour, velocity) {
			this.x = this.ValidateX(x, size);
			this.y = this.ValidateY(y, size);
			this.size = size;
			this.startAngle = startAngle;
			this.colour = colour;
			this.velocity = velocity;
		}

		ValidateX(x, size) {
			if (x == 0) {
				return x + size;
			} else if(x == canvas.width) {
				return x - size;
			} else {
				return x;
			}
		}

		ValidateY(y, size) {
			if (y == 0) {
				return y + size;
			} else if(y == canvas.height) {
				return y - size;
			} else {
				return y;
			}
		}
	}

	class Velocity {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	//
	// Methods
	//
	function Draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < numberOfParticles; i++) {
			context.beginPath();
			context.globalAlpha = particleList[i].opacity;
			context.arc(particleList[i].x, particleList[i].y, particleList[i].size, particleList[i].startAngle, 2 * Math.PI);
			context.fillStyle = particleList[i].colour;
			context.strokeStyle = particleList[i].colour;
			context.fill();
			context.stroke();
		}
	}

	function Update() {
		for (let i = 0; i < numberOfParticles; i++) {
			particleList[i].x += particleList[i].velocity.x;
			particleList[i].y += particleList[i].velocity.y;
		}
	}

	function GetRandomColour() {
		let r = 0, g = 0, b = 0;

		while (r < 100 && g < 100 && b < 100)
		{
			r = Math.floor(Math.random() * 256);
			g = Math.floor(Math.random() * 256);
			b = Math.floor(Math.random() * 256);
		}
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	function GetRandomVelocity() {
		let x = Math.floor(Math.random() * 3);
		let y = Math.floor(Math.random() * 3);
		return new Velocity(x - 1, y - 1);
	}

	function DetectWallCollision() {
		for (let i = 0; i < numberOfParticles; i++) {
			if (particleList[i].y + particleList[i].velocity.y < 0 || particleList[i].y + particleList[i].velocity.y > canvas.height - particleList[i].size) {
				particleList[i].velocity.y = -particleList[i].velocity.y;
			}
			else if (particleList[i].x + particleList[i].velocity.x < 0 || particleList[i].x + particleList[i].velocity.x > canvas.width - particleList[i].size) {
				particleList[i].velocity.x = -particleList[i].velocity.x;
			}
		}
	}

	function DetectParticleCollision() {
		if (particleList[0].x >= particleList[1].x + particleList[1].size)
		{
			console.log("Collision detected");
		} else {
			console.log("No collision detected");
		}

		// for (let i = 0; i < numberOfParticles; i++) {

		// }
	}

	//
	// Inits & Event Listeners
	//
	function Init() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		// InitParticles();
		// TestParticlesXCollision();
		Draw();
	}

	function InitParticles() {
		for (let i = 0; i < numberOfParticles; i++) {
			particleList.push(new Particle(canvas.width * Math.random(), canvas.height * Math.random(), 10, 0, GetRandomColour(), GetRandomVelocity()));
		}
	}

	// Testing a basic collsiion
	function TestParticlesXCollision() {
		let velocity1 = new Velocity(1, 0);
		let particle1 = new Particle(0, canvas.height / 2, 10, 0, GetRandomColour(), velocity1);

		let velocity2 = new Velocity(1, 0);
		let particle2 = new Particle(canvas.width, canvas.height / 2, 10, 0, GetRandomColour(), velocity2);

		particleList.push(particle1);
		particleList.push(particle2);
	}

	// TODO: set P1 to Red, set P2 to Blue
	// Test Case 1: No collision P1 on left, P2 on right
	// Test Case 2: Collision P1 on left, P2 on right
	// Test Case 3: Collision P1 and P2 equal
	// Test Case 4: Collision P1 on right, P2 on left
	// Test Case 5: No collision P2 on left, P2 on right

	//
	// Loop!
	//
	function Loop() {
		Draw();
		DetectParticleCollision();
		DetectWallCollision();
		Update();
		requestAnimationFrame(Loop)
	}

	Init();
	window.requestAnimationFrame(Loop);
})();