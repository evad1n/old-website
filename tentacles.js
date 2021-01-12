// https://p5js.org/examples/interaction-reach-2.html
// Based on code from Keith Peters.

class Tentacle {
    constructor(baseX, baseY) {
        var a = width / 2 - baseX;
        var b = height / 2 - baseY;
        var length = Math.sqrt(a * a + b * b);

        this.numSegments = Math.sqrt(length) / 1.1;
        this.x = [];
        this.y = [];
        this.angle = [];
        this.segLength = Math.sqrt(length) * 1.2;

        for (let i = 0; i < this.numSegments; i++) {
            this.x[i] = 0;
            this.y[i] = 0;
            this.angle[i] = 0;
        }

        this.x[this.x.length - 1] = baseX; // Set base x-coordinate
        this.y[this.x.length - 1] = baseY; // Set base y-coordinate
    }

    draw() {
        this.reachSegment(0, mouseX, mouseY);
        for (let i = 1; i < this.numSegments; i++) {
            this.reachSegment(i, this.targetX, this.targetY);
        }
        for (let j = this.x.length - 1; j >= 1; j--) {
            this.positionSegment(j, j - 1);
        }
        for (let k = 0; k < this.x.length; k++) {
            this.segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 5);
        }
    }

    positionSegment(a, b) {
        this.x[b] = this.x[a] + cos(this.angle[a]) * this.segLength;
        this.y[b] = this.y[a] + sin(this.angle[a]) * this.segLength;
    }

    reachSegment(i, xin, yin) {
        const dx = xin - this.x[i];
        const dy = yin - this.y[i];
        this.angle[i] = atan2(dy, dx);
        this.targetX = xin - cos(this.angle[i]) * this.segLength;
        this.targetY = yin - sin(this.angle[i]) * this.segLength;
    }

    segment(x, y, a, sw) {
        strokeWeight(sw);
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, this.segLength, 0);
        pop();
    }
}

let numTentacles = 20,
    tentacles = [],
    ratio = 0.7; // > 0.5 => Less tentacles on vertical sides than horizontal

function setup() {
    createCanvas(document.body.clientWidth, 750);
    domRect = canvas.getBoundingClientRect();

    //Create Tentacles
    // Top
    for (let index = 0; index < (numTentacles * ratio / 2); index++) {
        x = width - (width / (numTentacles * ratio / 2) * index); // Set base x-coordinate
        y = height; // Set base y-coordinate

        t = new Tentacle(x, y);
        tentacles.push(t);
    }

    // Bottom
    for (let index = 0; index < (numTentacles * ratio / 2); index++) {
        x = width / (numTentacles * ratio / 2) * index; // Set base x-coordinate
        y = 0; // Set base y-coordinate

        t = new Tentacle(x, y);
        tentacles.push(t);
    }

    // Left
    for (let index = 0; index < (numTentacles * (1 - ratio) / 2); index++) {
        x = 0; // Set base x-coordinate
        y = height - (height / (numTentacles * (1 - ratio) / 2) * index); // Set base y-coordinate

        t = new Tentacle(x, y);
        tentacles.push(t);
    }

    // Right
    for (let index = 0; index < (numTentacles * (1 - ratio) / 2); index++) {
        x = width; // Set base x-coordinate
        y = height / (numTentacles * (1 - ratio) / 2) * index; // Set base y-coordinate

        t = new Tentacle(x, y);
        tentacles.push(t);
    }

}

function draw() {
    background(5, 100);

    strokeWeight(20);
    stroke(255, 255, 255, 50);
    for (let index = 0; index < tentacles.length; index++) {
        tentacles[index].draw();
    }
}