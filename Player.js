(function () {
	//
	// Variables
	// 
	var canvas = document.getElementById("canvas");
	var width = canvas.width;
	var height = canvas.height;
	var context = canvas.getContext("2d");
	var maxSpeed = 1;
	var canvas;
    var times = 0;
    var limit = 100;
    var draw;
	var particles = [];
	var colours = ['#F0FD36', '#F49FF1', '#F53EAC', '#76FBFA'];

	//
	// State
	//
	var state = {
		position: {
			x: (width / 2),
			y: (height / 2),
		},
		movement: {
			x: 0,
			y: 0
		},
		rotation: 0,
		pressedKeys: {
			left: false,
			right: false,
			up: false,
			down: false
		}
	}

	var keyMap = {
		65: 'left',
		68: 'right',
		87: 'up',
		83: 'down'
	}

	//
	// Methods
	//
	function keyup(event) {
		var key = keyMap[event.keyCode];
		state.pressedKeys[key] = false;
	}

	function keydown(event) {
		var key = keyMap[event.keyCode];
		state.pressedKeys[key] = true;
	}

	function update(progress) {
		var p = progress / 16;
		updateRotation(p);
		updateMovement(p);
		updatePosition(p);
	}

	function updateRotation(p) {
		if (state.pressedKeys.left) {
			state.rotation -= p * 5;
		} else if (state.pressedKeys.right) {
			state.rotation += p * 5;
		}
	}

	function updateMovement(p) {
		var accelerationVector = {
			x: p * 0.3 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
			y: p * 0.3 * Math.sin((state.rotation - 90) * (Math.PI / 180))
		}

		if (state.pressedKeys.up) {
			state.movement.x += accelerationVector.x;
			state.movement.y += accelerationVector.y;
		} else if (state.pressedKeys.down) {
			if (state.movement.x != 0) {
				state.movement.x -= accelerationVector.x;
			}
			if (state.movement.y != 0) {
				state.movement.y -= accelerationVector.y;
			}
		}

		// Limit movement speed
		if (state.movement.x > maxSpeed) {
			state.movement.x = maxSpeed;
		} else if (state.movement.x < -maxSpeed) {
			state.movement.x = -maxSpeed;
		}
		if (state.movement.y > maxSpeed) {
			state.movement.y = maxSpeed;
		} else if (state.movement.y < -maxSpeed) {
			state.movement.y = -maxSpeed;
		}
	}

	function updatePosition(p) {
		state.position.x += state.movement.x;
		state.position.y += state.movement.y;

		// Detect boundaries
		if (state.position.x > width) {
			state.position.x -= width;
		} else if (state.position.x < 0) {
			state.position.x += width;
		}
		if (state.position.y > height) {
			state.position.y -=height;
		} else if (state.position.y < 0) {
			state.position.y += height;
		}
	}

	function drawParticle(x, y, size, colour, opacity) {
		context.beginPath();
		context.globalAlpha = opacity;
		context.arc(x, y, size, 0, 2 * Math.PI);
		context.fillStyle = colour;
		context.fill()
		context.strokeStyle = colour;
		context.stroke();
	}

	function draw() {
		context.clearRect(0, 0, width, height);

		context.save();
		context.translate(state.position.x, state.position.y)
		context.rotate((Math.PI / 180) * state.rotation);

		context.strokeStyle = 'white';
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(5, 5);
		context.lineTo(0, -5);
		context.lineTo(-5, 5);
		context.lineTo(0, 0);
		context.closePath();
		context.stroke();
		context.restore();
	}

	function loop(timestamp) {
		var progress = timestamp - lastRender;

		update(progress);
		draw();

		var position = random('position');
		var size = random('size');
		var colour = colours[random('colour')];
		var opacity = 1;
		drawParticle();
		particles.push([position[0], position[1], opacity, size]);

		lastRender = timestamp;
		window.requestAnimationFrame(loop);
	}

	function random(type) {
		if (type === 'size') {
			return (Math.floor(Math.random() * 8) * 10);
		} else if (type === 'colour') {
			return Math.floor(Math.random() * colours.length);
		} if (type === 'position') {
			return [
				(Math.floor(Math.random() * 200) * 10),
				(Math.floor(Math.random() * 80) * 10)
			]
		} else {
			return false;
		}
	}

	//
	// Inits & Event Listeners
	//
	window.addEventListener("keydown", keydown, false);
	window.addEventListener("keyup", keyup, false);

	// 
	// Loop!
	//
	var lastRender = 0;
	window.requestAnimationFrame(loop);
})();