var bitOption = 0;
class Node {
    constructor(x, y, nP) {
        this.nP = nP;
        this.driftDir = createVector(random(-2, 2), random(-2, 2));
        this.col = color(random(255), random(255), random(255), 255);
        this.range = random(10, 150);
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
        this.nP.fill(100, 40);
        this.nP.stroke(this.col, 50);
        this.nP.ellipse(this.loc.x, this.loc.y, this.range * 2, this.range * 2);
        this.nP.fill(this.col, 255);
        this.nP.ellipse(this.loc.x, this.loc.y, 10, 10);
    }
}
class Graph {
    constructor(graphP) {
        this.gP = graphP;
        this.nodeStore = [];
        this.locStore = [];
        this.driftStore = [];
        for (let i = 0; i < 20; i++) {
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
                let a = map(distance, 1.0, this.nodeStore[i].range, 0.0, 255.0);
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
        this.mouse = 0;
    }

    update() {
        var theta = map(noise(floor(this.loc.x / 2) * 0.01, floor(this.loc.y / 2) * 10, this.mouse), 0, 1, 0, TWO_PI)
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
        this.fP.stroke(255);
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
var g, f;

function setup() {
    let c = createCanvas(windowWidth, 400);
    nodesGraphic = createGraphics(windowWidth, 400);
    flowsGraphic = createGraphics(windowWidth, 400);
    c.parent("centralDisplay");
    g = new Graph(nodesGraphic);
    f = new FlowSet(flowsGraphic);
}

function draw() {
    if (bitOption == 0) {
        image(nodesGraphic, 0, 0);
        g.update();
    } else {
        image(flowsGraphic, 0, 0);
        f.update();
    }
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text("Welcome", width / 2, height / 2);
    textSize(10)
    textAlign(RIGHT, BOTTOM);
    textSize(10);
    if (bitOption == 0) {
        text("Isaiah Desrosiers, Nodes", width, height);
    } else {
        text("Isaiah Desrosiers, Flows", width, height);

    }
}

function mousePressed() {
    print(g.nodeStore.length);
    print(bitOption);
    if (bitOption == 0) {
        if (mouseButton == LEFT) {
            let mouseAdded = new Node(mouseX, mouseY, g.gP);
            g.nodeStore.push(mouseAdded);
            g.locStore.push(mouseAdded.loc);
            g.driftStore.push(mouseAdded.dirft);
        } else {
            g = new Graph(nodesGraphic);
        }
    } else {
        for (var i = 0; i < f.flows.length; i++) {
            f.flows[i].mouse += 1;
        }
    }
}