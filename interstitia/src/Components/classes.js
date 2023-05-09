export class Star {
  constructor(sketch) {
    this.p5 = sketch;
    this.loc = this.p5.createVector(this.p5.random(1), this.p5.random(1));
    this.points = this.p5.random(4, 6);
    this.rotation = this.p5.random(this.p5.TWO_PI);
    this.starType = this.p5.random(1);
    this.growth = 0;
    if (this.starType <= 0.7645) {
      this.startCol = this.p5.color(255, 204, 111);
      this.endCol = this.p5.color(255, 210, 161);
    } else if (this.starType <= 0.8855) {
      this.startCol = this.p5.color(255, 210, 161);
      this.endCol = this.p5.color(255, 244, 234);
    } else if (this.starType <= 0.9615) {
      this.startCol = this.p5.color(255, 244, 234);
      this.endCol = this.p5.color(248, 247, 255);
    } else if (this.starType <= 0.9915) {
      this.startCol = this.p5.color(248, 247, 255);
      this.endCol = this.p5.color(202, 215, 255);
    } else if (this.starType <= 0.9975) {
      this.startCol = this.p5.color(202, 215, 255);
      this.endCol = this.p5.color(170, 191, 255);
    } else {
      this.startCol = this.p5.color(170, 191, 255);
      this.endCol = this.p5.color(155, 176, 255);
    }
    this.intensity = this.p5.random(1);
    this.twinkling = false;
    this.timing = 0;
    this.rotationIncrement = this.p5.random(0.01, 0.1);
  }

  twinkle() {
    this.rotation += this.rotationIncrement;
    if (this.timing >= 200) {
      this.twinkling = false;
      this.timing = 0;
      this.rotationIncrement = this.p5.random(0.01, 0.1);
      this.growth = 0;
    }
    this.p5.strokeWeight(this.intensity);
    this.p5.stroke(
      this.p5.lerpColor(this.startCol, this.endCol, this.intensity)
    );
    this.p5.point(this.loc.x * this.p5.width, this.loc.y * this.p5.height);
    this.p5.strokeWeight(1);
    if (!this.twinkling) {
      let choice = this.p5.random(1);
      if (choice >= 0.999) {
        this.twinkling = true;
      }
    } else {
      this.p5.beginShape();
      for (let i = 0; i < this.points * 3; i++) {
        if (this.timing < 100) {
          this.growth = this.p5.map(this.timing, 0, 100, 0, 10);
        } else {
          this.growth = this.p5.map(this.timing, 100, 200, 10, 0);
        }
        let position = this.p5.map(i, 0, this.points * 3, 0, this.p5.TWO_PI);
        position += this.rotation;
        if (i % 3 === 0) {
          this.p5.vertex(
            this.p5.cos(position - 0.01) * this.intensity +
              this.loc.x * this.p5.width,
            this.p5.sin(position - 0.01) * this.intensity +
              this.loc.y * this.p5.height
          );
        } else if (i % 3 === 1) {
          this.p5.vertex(
            this.p5.cos(position) * this.growth * this.intensity +
              this.loc.x * this.p5.width,
            this.p5.sin(position) * this.growth * this.intensity +
              this.loc.y * this.p5.height
          );
        } else {
          this.p5.vertex(
            this.p5.cos(position + 0.01) * this.intensity +
              this.loc.x * this.p5.width,
            this.p5.sin(position + 0.01) * this.intensity +
              this.loc.y * this.p5.height
          );
        }
      }
      this.p5.endShape();
      this.timing += 1;
    }
  }
}

export class Storm {
  constructor(s) {
    this.sketch = s;
    this.strikeChance = 0.005;
    class Drop {
      constructor(s) {
        this.sketch = s;
        this.mass = this.sketch.random(0.1, 2.0);
        this.gravity = this.sketch.createVector(0, 9.8 * this.mass * 4);
        this.splashes = this.sketch.int(this.sketch.random(1, 20));
        this.l = this.sketch.map(this.mass, 0.1, 2.0, 25, 75);
        this.loc = this.sketch.createVector(
          this.sketch.random(this.sketch.width),
          this.sketch.random(this.sketch.height)
        );
        this.col = this.sketch.color(255, 50);
      }

      update() {
        if (this.loc.y >= this.sketch.height) {
          this.loc = this.sketch.createVector(
            this.sketch.random(this.sketch.width),
            0
          );
          this.mass = this.sketch.random(0.1, 2.0);
          this.mass = this.sketch.random(0.1, 2.0);
          this.gravity = this.sketch.createVector(0, 9.8 * this.mass * 4);
          this.splashes = this.sketch.int(this.sketch.random(1, 20));
        } else {
          this.loc.add(this.gravity);
        }
        this.sketch.stroke(this.col);
        this.sketch.strokeWeight(1);
        this.sketch.line(
          this.loc.x,
          this.loc.y,
          this.loc.x,
          this.loc.y - this.l
        );
      }
    }
    this.droplets = [];
    for (let i = 0; i < 200; i++) {
      this.droplets[i] = new Drop(this.sketch);
    }
    this.lightnings = [];
  }

  update() {
    this.sketch.background(0, 0, 66);
    class Point {
      constructor(s, x, y) {
        this.sketch = s;
        this.pos = this.sketch.createVector(x, y);
      }

      show() {
        this.sketch.point(this.pos.x, this.pos.y);
      }
    }
    class Lightning {
      constructor(s) {
        this.sketch = s;
        this.stayCounter = 0;
        this.points = [];
        this.splitChance = 0;
        class Header {
          constructor(s) {
            this.sketch = s;
            this.loc = this.sketch.createVector(
              this.sketch.random(10, this.sketch.width - 10),
              0
            );
            this.end = this.sketch.createVector(
              this.sketch.random(this.sketch.width),
              this.sketch.height
            );
          }

          insertPoints() {
            this.split = this.sketch.random(1);
            let behaviorChoice = this.sketch.int(this.sketch.random(3));
            if (behaviorChoice === 0) {
              if (this.loc.x > this.end.x) {
                this.loc.x -= 1;
              } else if (this.loc.x < this.end.x) {
                this.loc.x += 1;
              }
              this.loc.y += 1;
            } else {
              let direct = this.sketch.createVector(
                this.sketch.random(-5, 5),
                this.sketch.random(-2, 5)
              );
              this.loc.add(direct);
            }
            return this.loc;
          }
        }
        var h1 = new Header(this.sketch);
        this.headers = [h1];
        this.points = [];
      }

      update() {
        for (var head of this.headers) {
          var res = head.insertPoints();
          if (
            res.x > this.sketch.width ||
            res.x < 0 ||
            res.y > this.sketch.height
          ) {
            this.stayCounter += 1;
            let a = this.sketch.map(this.stayCounter, 0, 25, 255, 0);
            let w = this.sketch.map(this.stayCounter, 0, 25, 10, 0);
            for (var p of this.points) {
              this.sketch.stroke(255, a);
              this.sketch.strokeWeight(w);
              p.show();
            }
          } else {
            if (head.split <= this.splitChance) {
              this.headers.push(head);
            }
            this.points.push(new Point(this.sketch, res.x, res.y));
          }
        }
      }
    }
    var strike = this.sketch.random(1);
    if (strike <= this.strikeChance) {
      this.lightnings.push(new Lightning(this.sketch));
    }
    for (var d of this.droplets) {
      d.update();
    }
    for (var lightning of this.lightnings) {
      if (lightning.stayCounter > 25) {
        this.lightnings.splice(
          this.lightnings.indexOf(lightning),
          this.lightnings.indexOf(lightning) + 1
        );
      }
      lightning.update();
    }
  }
}

export class Node {
  constructor(s, parent) {
    this.cont = parent;
    this.sketch = s;
    this.col1 = this.sketch.random(0, 1);
    this.col2 = this.sketch.random(0, 1);
    this.col3 = this.sketch.random(0, 1);
    this.preRange = this.sketch.random(0, 1);
    this.drift = this.sketch.createVector(
      this.sketch.random(-2, 2),
      this.sketch.random(-2, 2)
    );

    this.loc = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height)
    );
  }
  update() {
    if (this.cont.colorMode === 0) {
      this.col = this.sketch.color(
        this.sketch.map(this.col1, 0, 1, this.cont.col1[0], this.cont.col2[0]),
        this.sketch.map(this.col2, 0, 1, this.cont.col1[1], this.cont.col2[1]),
        this.sketch.map(this.col3, 0, 1, this.cont.col1[2], this.cont.col2[2])
      );
    } else if (this.cont.colorMode === 1) {
      this.col = this.sketch.color(
        this.cont.col1[0],
        this.cont.col1[1],
        this.cont.col1[2]
      );
    } else {
      this.col = this.cont.interpColor;
    }
    if (this.cont.rangeMode === 0) {
      this.range = this.sketch.map(
        this.preRange,
        0,
        1,
        this.cont.rangeMin,
        this.cont.rangeMax
      );
    } else if (this.cont.rangeMode === 1) {
      this.range = this.cont.rangeMin;
    } else {
      this.range = this.cont.interpRange;
    }
    this.loc.add(this.drift);
    if (this.loc.x > this.sketch.width || this.loc.x < 0) {
      this.drift.x *= -1;
    }
    if (this.loc.y > this.sketch.height || this.loc.y < 0) {
      this.drift.y *= -1;
    }
    if (this.cont.coreVisibility) {
      this.sketch.fill(this.col);
      this.sketch.noStroke();
      this.sketch.ellipse(this.loc.x, this.loc.y, 1, 1);
    }
    if (this.cont.rangeVisibility) {
      this.sketch.noFill();
      this.sketch.stroke(this.col);
      this.sketch.ellipse(this.loc.x, this.loc.y, this.range, this.range);
    }
  }
}

export class Graph {
  constructor(s) {
    this.sketch = s;
    this.nodeCount = 75;
    this.nodeSpeed = 5;
    this.coreVisibility = true;
    this.connectionVisibility = true;
    this.rangeVisibility = false;
    this.colorMode = 0;
    this.colorInterval = 5;
    this.col1 = [0, 360, 360];
    this.col2 = [360, 0, 0];
    this.rangeMode = 0;
    this.rangeInterval = 5;
    this.rangeMin = 100;
    this.rangeMax = 300;
    this.sparkles = true;
    this.sparkleWeightMode = 0;
    this.sparkleWeightInterval = 5;
    this.sparkleWeightMin = 2;
    this.sparkleWeightMax = 10;
    this.sparkleDisplacementMode = 0;
    this.sparkleDisplacementInterval = 5;
    this.sparkleDisplacementMin = 0;
    this.sparkleDisplacementMax = 50;
    this.sparkleColSystem = 1;
    this.sparkleColInterval = 5;
    this.sparkleCol1 = [0, 360, 360];
    this.sparkleCol2 = [0, 0, 0];
    this.bg = [0, 0, 0, 50];
    this.nodeStore = [];
    for (let i = 0; i < this.nodeCount; i++) {
      let n = new Node(this.sketch, this);
      this.nodeStore[i] = n;
    }
  }
  update() {
    this.sketch.background(this.bg);
    if (this.colorMode === 2) {
      this.interpColor = this.sketch.lerpColor(
        this.sketch.color(this.col1[0], this.col1[1], this.col1[2]),
        this.sketch.color(this.col2[0], this.col2[1], this.col2[2]),
        this.sketch.map(
          this.sketch.sin(
            this.sketch.map(
              this.sketch.millis() % (this.colorInterval * 1000),
              0,
              this.colorInterval * 1000,
              0,
              this.sketch.TWO_PI
            )
          ),
          -1,
          1,
          0,
          1
        )
      );
    }
    if (this.rangeMode === 2) {
      this.interpRange = this.sketch.map(
        this.sketch.sin(
          this.sketch.map(
            this.sketch.millis() % (this.rangeInterval * 1000),
            0,
            this.rangeInterval * 1000,
            0,
            this.sketch.TWO_PI
          )
        ),
        -1,
        1,
        this.rangeMin,
        this.rangeMax
      );
    }
    if (this.connectionVisibility) {
      for (var node of this.nodeStore) {
        node.update();
        this.sketch.strokeWeight(1);
        for (var node2 of this.nodeStore) {
          let distance = this.sketch.dist(
            node.loc.x,
            node.loc.y,
            node2.loc.x,
            node2.loc.y
          );
          let a = this.sketch.map(distance, 0, node.range, 360, 0);
          if (distance === 0) {
            this.sketch.noStroke();
          } else if (distance <= node.range) {
            this.sketch.stroke(
              this.sketch.red(node.col),
              this.sketch.green(node.col),
              this.sketch.blue(node.col),
              a
            );
            if (distance <= node2.range) {
              this.sketch.line(
                node.loc.x,
                node.loc.y,
                (node.loc.x + node2.loc.x) / 2,
                (node.loc.y + node2.loc.y) / 2
              );
            } else {
              this.sketch.line(
                node.loc.x,
                node.loc.y,
                node2.loc.x,
                node2.loc.y
              );
            }
          }
        }
      }
    }
    if (this.sparkleWeightMode === 0) {
      this.sketch.strokeWeight(this.sparkleWeightMin);
    } else if (this.sparkleWeightMode === 1) {
      this.sketch.strokeWeight(
        this.sketch.random(this.sparkleWeightMin, this.sparkleWeightMax)
      );
    } else {
      this.sketch.strokeWeight(
        this.sketch.map(
          this.sketch.sin(
            this.sketch.map(
              this.sketch.millis() % (this.sparkleWeightInterval * 1000),
              0,
              this.sparkleWeightInterval * 1000,
              0,
              this.sketch.TWO_PI
            )
          ),
          -1,
          1,
          this.sparkleWeightMin,
          this.sparkleWeightMax
        )
      );
    }
    if (this.sparkles) {
      for (var n of this.nodeStore) {
        for (var n2 of this.nodeStore) {
          let distance = this.sketch.dist(n.loc.x, n.loc.y, n2.loc.x, n2.loc.y);
          if (distance <= n2.range && distance <= n.range && distance !== 0) {
            if (this.sparkleDisplacementMode === 0) {
              this.sparkleDisp = this.sparkleDisplacementMin;
            } else if (this.sparkleDisplacementMode === 1) {
              this.sparkleDisp = this.sketch.random(
                this.sparkleDisplacementMin,
                this.sparkleDisplacementMax
              );
            } else {
              this.sparkleDisp = this.sketch.map(
                this.sketch.sin(
                  this.sketch.map(
                    this.sketch.millis() %
                      (this.sparkleDisplacementInterval * 1000),
                    0,
                    this.sparkleDisplacementInterval * 1000,
                    0,
                    this.sketch.TWO_PI
                  )
                ),
                -1,
                1,
                this.sparkleDisplacementMin,
                this.sparkleDisplacementMax
              );
            }
            if (this.sparkleColSystem === 0) {
              this.sketch.stroke(this.sparkleCol1);
            } else if (this.sparkleColSystem === 1) {
              this.sketch.stroke(this.sketch.lerpColor(n.col, n2.col, 0.5));
            } else if (this.sparkleColSystem === 2) {
              this.sketch.stroke(
                this.sketch.random(this.sparkleCol1[0], this.sparkleCol2[0]),
                this.sketch.random(this.sparkleCol1[1], this.sparkleCol2[1]),
                this.sketch.random(this.sparkleCol1[2], this.sparkleCol2[2])
              );
            } else {
              this.sketch.stroke(
                this.sketch.lerpColor(
                  this.sketch.color(
                    this.sparkleCol1[0],
                    this.sparkleCol1[1],
                    this.sparkleCol1[2]
                  ),
                  this.sketch.color(
                    this.sparkleCol2[0],
                    this.sparkleCol2[1],
                    this.sparkleCol2[2]
                  ),
                  this.sketch.map(
                    this.sketch.sin(
                      this.sketch.map(
                        this.sketch.millis() % (this.sparkleColInterval * 1000),
                        0,
                        this.sparkleColInterval * 1000,
                        0,
                        this.sketch.TWO_PI
                      )
                    ),
                    -1,
                    1,
                    0,
                    1
                  )
                )
              );
            }
            this.sketch.point(
              (n.loc.x + n2.loc.x) / 2 +
                this.sketch.random(-this.sparkleDisp, this.sparkleDisp),
              (n.loc.y + n2.loc.y) / 2 +
                this.sketch.random(-this.sparkleDisp, this.sparkleDisp)
            );
          }
        }
      }
    }
  }
}

export class Flow {
  constructor(s) {
    this.sketch = s;
    this.loc = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height)
    );
    this.acc = this.sketch.createVector(0, 0);
    this.vel = this.sketch.createVector(0, 0);
    this.xInc = 0.01;
    this.yInc = 10;
    this.resolution = 1;
  }
  update() {
    var theta = this.sketch.map(
      this.sketch.noise(
        this.sketch.floor(this.loc.x / this.resolution) * this.xInc,
        this.sketch.floor(this.loc.y / this.resolution) * this.yInc,
        this.sketch.millis() / 1000
      ),
      0,
      1,
      -this.sketch.TWO_PI,
      this.sketch.TWO_PI
    );
    var flowForce = this.sketch.createVector(
      this.sketch.cos(theta),
      this.sketch.sin(theta)
    );
    flowForce.mult(100);
    this.acc.add(flowForce);
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.loc.add(this.vel);
    if (this.loc.x > this.sketch.width) {
      this.loc.x = 0;
    }
    if (this.loc.x < 0) {
      this.loc.x = this.sketch.width;
    }
    if (this.loc.y > this.sketch.height) {
      this.loc.y = 0;
    }
    if (this.loc.y < 0) {
      this.loc.y = this.sketch.height;
    }
    this.acc.mult(0);
    this.sketch.strokeWeight(1);
    this.sketch.stroke(255);
    this.sketch.point(this.loc.x, this.loc.y);
  }
}

export class FlowSet {
  constructor(s) {
    this.sketch = s;
    this.xInc = this.sketch.random(0.5);
    this.yInc = this.sketch.random(0.5);
    this.resolution = this.sketch.random(5);
    this.flows = new Array(2500);
    for (let i = 0; i < this.flows.length; i++) {
      this.flows[i] = new Flow(this.sketch);
      this.flows[i].xInc = this.xInc;
      this.flows[i].yInc = this.yInc;
      this.flows[i].resolution = this.resolution;
    }
  }
  update() {
    this.sketch.background(0, 40);
    for (var flow of this.flows) {
      flow.update();
    }
  }

  randomize() {
    this.xInc = this.sketch.random(0.5);
    this.yInc = this.sketch.random(0.5);
    this.resolution = this.sketch.random(5);
    for (let i = 0; i < this.flows.length; i++) {
      this.flows[i].xInc = this.xInc;
      this.flows[i].yInc = this.yInc;
      this.flows[i].resolution = this.resolution;
    }
  }
}

export class RandGraphs {
  constructor(s) {
    this.sketch = s;
    this.randomCounts = [];
    this.gaussianCounts = [];
    this.monteCarloCounts = [];
    this.invMonteCarloCounts = [];

    for (let i = 0; i < this.sketch.width; i++) {
      this.randomCounts[i] = 0;
      this.gaussianCounts[i] = 0;
      this.monteCarloCounts[i] = 0;
      this.invMonteCarloCounts[i] = 0;
    }
  }

  monteCarlo() {
    while (true) {
      let r1 = this.sketch.random(1);
      let r2 = this.sketch.random(1);
      if (r2 >= r1) {
        return r1;
      }
    }
  }

  invMonteCarlo() {
    while (true) {
      let r1 = this.sketch.random(1);
      let r2 = this.sketch.random(1);
      if (r2 <= r1) {
        return r1;
      }
    }
  }

  update() {
    this.sketch.background(0);
    let rand = this.sketch.int(this.sketch.random(this.randomCounts.length));
    let gauss = this.sketch.int(
      this.sketch.constrain(
        (this.sketch.randomGaussian() * this.sketch.width) / 8 +
          this.sketch.width / 2,
        0,
        this.sketch.width
      )
    );
    let monte = this.sketch.int(
      this.monteCarlo() * this.monteCarloCounts.length
    );
    let iMonte = this.sketch.int(
      this.invMonteCarlo() * this.invMonteCarloCounts.length
    );

    this.randomCounts[rand] += 1;
    this.gaussianCounts[gauss] += 1;
    this.monteCarloCounts[monte] += 1;
    this.invMonteCarloCounts[iMonte] += 1;

    for (let x = 0; x < this.randomCounts.length; x++) {
      this.sketch.stroke(0, 255, 0, 64);
      this.sketch.line(
        x,
        this.sketch.height,
        x,
        this.sketch.height - this.gaussianCounts[x] * 10
      );
      this.sketch.stroke(255, 0, 0, 64);
      this.sketch.line(
        x,
        this.sketch.height,
        x,
        this.sketch.height - this.monteCarloCounts[x] * 10
      );
      this.sketch.stroke(0, 0, 255, 64);
      this.sketch.line(
        x,
        this.sketch.height,
        x,
        this.sketch.height - this.invMonteCarloCounts[x] * 10
      );
      this.sketch.stroke(0, 0, 0, 64);
      this.sketch.line(
        x,
        this.sketch.height,
        x,
        this.sketch.height - this.randomCounts[x] * 10
      );

      if (this.gaussianCounts[x] * 10 > this.sketch.height) {
        this.gaussianCounts[x] = 0;
      }
      if (this.monteCarloCounts[x] * 10 > this.sketch.height) {
        this.monteCarloCounts[x] = 0;
      }
      if (this.invMonteCarloCounts[x] * 10 > this.sketch.height) {
        this.invMonteCarloCounts[x] = 0;
      }
      if (this.randomCounts[x] * 10 > this.sketch.height) {
        this.randomCounts[x] = 0;
      }
    }
  }
}

export class NoiseWave {
  constructor(s) {
    this.sketch = s;
    this.size = 25;
    this.noiseInc = 0.0;
    this.colors = [];
    this.cols = this.sketch.width / this.size;
    for (let i = 0; i < this.cols; i++) {
      this.colors[i] = this.sketch.color(
        this.sketch.random(64),
        this.sketch.random(128),
        this.sketch.random(128, 255)
      );
    }
  }

  update() {
    this.sketch.background(0, 60);
    this.noiseInc += 0.001;
    for (let i = 0; i < this.cols; i++) {
      this.sketch.strokeWeight(23);
      this.sketch.stroke(this.colors[i]);
      this.sketch.line(
        i * this.size,
        0,
        i * this.size,
        (this.sketch.noise(i * 0.05, this.noiseInc) * this.sketch.height) / 2
      );
      this.sketch.line(
        i * this.size,
        (this.sketch.noise(i * 0.05, this.noiseInc) * this.sketch.height) / 2 +
          50,
        i * this.size,
        this.sketch.height
      );
    }
  }

  resize() {
    if (this.sketch.width / this.size > this.cols) {
      for (let i = 0; i < this.cols - this.sketch.width / this.size; i++) {
        this.colors.push(
          this.sketch.color(
            this.sketch.random(64),
            this.sketch.random(128),
            this.sketch.random(128, 255)
          )
        );
      }
    }
    this.cols = this.sketch.width / this.size;
  }
}
