class Node {
    constructor(x, y, nP) {
        this.nP = nP;
        this.driftDir = createVector(random(-2, 2), random(-2, 2));
        this.col = color(random(0, 128.5), random(0, 255), 255);
        this.range = random(40, 200);
        if (x == undefined || y == undefined || typeof x != "number") {
            this.loc = createVector(random(width), random(height));
        } else {
            this.loc = createVector(x, y);
        }
    }
    drift() {
        this.loc.add(this.driftDir);
        if (this.loc.x > width || this.loc.x < 0) {
            this.driftDir.x = -this.driftDir.x;
        }

        if (this.loc.y > height || this.loc.y < 0) {
            this.driftDir.y = -this.driftDir.y;
        }
    }
    show() {
        this.nP.fill(this.col, 255);
        this.nP.stroke(this.col);
        this.nP.ellipse(this.loc.x, this.loc.y, 5, 5);
        this.nP.strokeWeight(1);
    }
}

class Graph {
    constructor(graphP) {
        this.gP = graphP;
        this.nodeStore = [];
        this.locStore = [];
        this.driftStore = [];
        for (let i = 0; i < 125; i++) {
            let n = new Node(random(width), random(height), this.gP);
            this.nodeStore[i] = n;
            this.locStore[i] = n.loc;
            this.driftStore[i] = n.driftDir;
        }
    }
    update() {
        this.gP.background(0, 0, 66);
        for (let i = 0; i < this.nodeStore.length; i++) {
            this.locStore[i] = this.nodeStore[i].loc;
            this.driftStore[i] = this.nodeStore[i].driftDir;
            this.nodeStore[i].drift();
            this.nodeStore[i].show();
            for (let i2 = 0; i2 < this.locStore.length; i2++) {
                this.locStore[i2] = this.nodeStore[i2].loc;
                this.driftStore[i2] = this.nodeStore[i2].driftDir;
                let distance = dist(
                    this.locStore[i].x,
                    this.locStore[i].y,
                    this.locStore[i2].x,
                    this.locStore[i2].y
                );
                let a = map(distance, 0, this.nodeStore[i].range, 0.0, 255.0);
                if (distance == 0) {
                    this.gP.noStroke();
                } else if (distance <= this.nodeStore[i].range) {
                    if (distance <= this.nodeStore[i2].range) {
                        this.gP.stroke(
                            red(this.nodeStore[i].col),
                            green(this.nodeStore[i].col),
                            blue(this.nodeStore[i].col),
                            255 - a
                        );
                        this.gP.line(
                            this.locStore[i].x,
                            this.locStore[i].y,
                            (this.locStore[i2].x + this.locStore[i]) / 2,
                            (this.locStore[i2].y + this.locStore[i]) / 2
                        );
                        this.gP.stroke(
                            red(this.nodeStore[i2].col),
                            green(this.nodeStore[i2].col),
                            blue(this.nodeStore[i2].col),
                            255 - a
                        );
                        this.gP.line(
                            this.locStore[i2].x,
                            this.locStore[i2].y,
                            (this.locStore[i].x + this.locStore[i2].x) / 2,
                            (this.locStore[i].y + this.locStore[i2].y) / 2
                        );
                    } else {
                        this.gP.stroke(
                            red(this.nodeStore[i].col),
                            green(this.nodeStore[i].col),
                            blue(this.nodeStore[i].col),
                            255 - a
                        );
                        this.gP.line(
                            this.locStore[i].x,
                            this.locStore[i].y,
                            this.locStore[i2].x,
                            this.locStore[i2].y
                        );
                    }
                }
            }
        }
    }
}

class Flow {
    constructor(fP) {
        this.fP = fP;
        this.loc = createVector(random(width), random(height));
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.xInc = 0.01;
        this.yInc = 10;
        this.resolution = 1;
    }

    update() {
        var theta = map(noise(floor(this.loc.x / this.resolution) * this.xInc, floor(this.loc.y / this.resolution) * this.yInc, (millis() / 10000)), 0, 1, -TWO_PI, TWO_PI)
        var flowForce = createVector(cos(theta), sin(theta));
        flowForce.mult(100);
        this.acc.add(flowForce);
        this.vel.add(this.acc);
        this.vel.limit(5);
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
        this.fP.strokeWeight(1);
        this.fP.stroke(0, 119, 255);
        this.fP.point(this.loc.x, this.loc.y);
    }
}

class FlowSet {
    constructor(flowsGraphic) {
        this.fG = flowsGraphic;
        this.flows = new Array(5000);
        for (let i = 0; i < this.flows.length; i++) {
            this.flows[i] = new Flow(this.fG);
        }
    }

    update() {
        this.fG.background(0, 0, 66, 40);
        for (let i = 0; i < this.flows.length; i++) {
            this.flows[i].update();
        }
    }
}