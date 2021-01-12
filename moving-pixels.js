class Pixel {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
	}

	move(dir) {
		switch (dir) {
			case "left":
				this.x -= this.speed;
				break;
			case "right":
				this.x += this.speed;
				break;
			case "up":
				this.y -= this.speed;
				break;
			case "down":
				this.y += this.speed;
				break;
			default:
				break;
		}
		this.wrap();
	}

	wrap() {
		if (this.x < 0)
			this.x = width - size;
		if (this.x > width - size)
			this.x = 0;
		if (this.y < 0)
			this.y = height - size;
		if (this.y > height - size)
			this.y = 0;
	}

	draw() {
		this.move(direction);
		circle(this.x, this.y, size);
	}
}

let numTentacles = 10,
	tentacles = [],
	ratio = 0.6; // > 0.5 => Less tentacles on vertical sides than horizontal

let numPixels = 500,
	pixels = [],
	maxSpeed = 8,
	size = 15,
	direction; // Randomize direction

r = Math.round(Math.random() * 3);

switch (r) {
	case 0:
		direction = "down";
		break;
	case 1:
		direction = "left";
		break;
	case 2:
		direction = "up";
		break;
	case 3:
		direction = "right";
		break;
	default:
		direction = "down";
		break;
}

function setup() {
	createCanvas(document.body.clientWidth, 750);
	domRect = canvas.getBoundingClientRect();

	// Create Pixels
	for (let index = 0; index < numPixels; index++) {
		createPixel();
	}
}

function createPixel() {
	var y = Math.round(Math.random() * (0 - height) + height);
	var x = Math.round(Math.random() * (width - 0) + 0);
	var speed = Math.round(Math.random() * maxSpeed + 3);

	p = new Pixel(x, y, speed);
	pixels.push(p);
}

function draw() {
	background(5, 100);

	noStroke();
	fill(255, 100);
	for (let index = 0; index < pixels.length; index++) {
		pixels[index].draw();
	}
}

window.addEventListener('keydown', this.keyEvents);

function keyEvents(key) {
	switch (key.keyCode) {
		case 37:
			direction = "left";
			break;
		case 38:
			direction = "up";
			break;
		case 39:
			direction = "right";
			break;
		case 40:
			direction = "down";
			break;
		default:
			break;
	}
}