class NoiseFlower {

    constructor() {
        this.loc = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.resolution = 5;
        this.xIncrement = 0.01;
        this.yIncrement = 1;
    }

    update() {
        var theta = map(noise(floor(loc.x / this.resolution) * this.xIncrement, floor(loc.y / this.resolution) * this.yIncrement), 0, 1, 0, TWO_PI);
        flowForce = createVector(cos(theta), sin(theta));
        this.acc.add(flowForce);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        if (this.loc.x > width) {
            this.loc.x = 0;
        }
        if (this.loc.x < 0) {
            this.loc.x = width;
        }
        if (this.loc.y > height) {
            this.loc.y = 0;
        }
        if (this.loc.y < 0) {
            this.loc.y = height;
        }
        this.acc.mult(0);
        strokeWeight(1);
        stroke()
    }
}

class PointsFlower {
    //Use points or equation as basis for flow field
}

class Graph {}

//
class Node {}

//Audio visualization
class AMPS {}